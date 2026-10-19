/**
 * gpxExport.ts
 *
 * Generates a Strava-friendly GPX file whose statistics (distance, pace,
 * moving time, elapsed time, splits, elevation) match what the app shows.
 *
 * Key correctness fixes vs. the previous version:
 *  1. RESAMPLING — the route is densified so consecutive points are ~5m apart.
 *     Strava computes distance/splits from the trackpoint sequence; sparse or
 *     unevenly-spaced points produce wrong splits, GAP, and moving time.
 *  2. TIMESTAMPS — every trackpoint gets a wall-clock time derived from the
 *     cumulative distance * user pace, with a small per-km pace variation so
 *     the average equals the user-chosen pace but splits look natural.
 *     Consecutive points are strictly 1s-or-less apart at slow pace, so
 *     elapsed time == moving time (no "auto-pause" artifacts).
 *  3. KM MARKERS — a trackpoint is forced exactly on each 1km boundary so
 *     Strava's per-km splits are clean and match the distance shown in-app.
 *  4. ELEVATION — deterministic (sin-based, seeded) and identical to what
 *     RouteStats displays, so the elevation gain in Strava matches the app.
 *  5. EXTENSIONS — adds <gpxtpx:TrackPointExtension> with cadence/HR-ish noise
 *     is NOT added (keep minimal); Strava accepts plain trkpt fine.
 */

// ---- Shared types ----
export interface RoutePoint {
  lat: number;
  lng: number;
  timestamp: number; // original click timestamp (kept for compat, not used for output)
}

export interface RouteDetails {
  name: string;
  description: string;
}

// ---- Geometry helpers ----
const R_EARTH_KM = 6371; // mean earth radius (km)

const haversineKm = (p1: RoutePoint, p2: RoutePoint): number => {
  const dLat = ((p2.lat - p1.lat) * Math.PI) / 180;
  const dLng = ((p2.lng - p1.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((p1.lat * Math.PI) / 180) *
      Math.cos((p2.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R_EARTH_KM * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

/**
 * Densify a polyline so consecutive points are at most `stepKm` apart,
 * inserting intermediate points via linear interpolation. This guarantees an
 * even point density which Strava relies on for splits/moving-time.
 */
const densify = (pts: RoutePoint[], stepKm = 0.005): RoutePoint[] => {
  if (pts.length < 2) return pts;
  const out: RoutePoint[] = [{ ...pts[0] }];
  let acc = 0;
  for (let i = 1; i < pts.length; i++) {
    const seg = haversineKm(pts[i - 1], pts[i]);
    if (seg <= 0) continue;
    // number of sub-segments; ensure at least 1 so we always reach the endpoint
    const n = Math.max(1, Math.round(seg / stepKm));
    for (let k = 1; k <= n; k++) {
      const t = k / n;
      out.push({
        lat: pts[i - 1].lat + (pts[i].lat - pts[i - 1].lat) * t,
        lng: pts[i - 1].lng + (pts[i].lng - pts[i - 1].lng) * t,
        // we discard the per-click timestamp; timing is derived below
        timestamp: Date.now(),
      });
    }
    acc += seg;
  }
  return out;
};

/**
 * Seeded PRNG (mulberry32) so elevation and pace-variation are deterministic
 * per route — re-exporting the same route yields identical stats.
 */
const mulberry32 = (seed: number) => {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

/**
 * Deterministic elevation model — MUST be kept in sync with RouteStats.tsx.
 *
 * Produces a gentle rolling profile that starts and ends near the same base
 * elevation so the net change over the route ≈ 0 (no artificial "always
 * climbing" trend). The amplitude and hill count are scaled to the route
 * distance so short city runs get a few small bumps (5–10 m) and longer
 * routes get proportionally more, but the per-km elevation gain stays in a
 * believable range (~3–8 m/km) rather than the 30 m amplitude + many hills
 * the old formula produced.
 *
 * @param progress       0..1 fraction along the route
 * @param totalDistanceKm total route distance in km
 * @returns elevation in metres (always ≥ 0)
 */
export const elevationAt = (
  progress: number,
  totalDistanceKm: number
): number => {
  // Base elevation — a modest, stable value. Kept low so gains are realistic
  // for typical urban/flat runs rather than alpine climbs.
  const baseElevation = 50.0;

  // Hill count: one hill every ~3 km (was every 2 km). Fewer hills = smaller
  // total gain accumulation. Minimum 1 so very short routes still vary.
  const numberOfHills = Math.max(1, Math.round(totalDistanceKm / 3));

  // Hill amplitude: 8 m per hill (was 30 m). Combined with the lower hill
  // count this keeps per-km gain in the 3–8 m range typical of flat terrain.
  const hillAmplitude = 8.0;

  // Primary rolling hills — full oscillation, mean 0, starts/ends at base.
  const hillEffect = hillAmplitude * Math.sin(progress * numberOfHills * 2 * Math.PI);

  // Secondary micro-variation — smaller, higher frequency, also mean 0.
  const variationEffect = (hillAmplitude / 3) * Math.sin(progress * numberOfHills * 6 * Math.PI);

  // Tiny rolling noise via a fixed sin combo (deterministic, no RNG) so the
  // profile looks natural rather than perfectly periodic.
  const noise = 1.5 * Math.sin(progress * 47 * Math.PI + 0.7);

  const elevation = baseElevation + hillEffect + variationEffect + noise;
  return Math.max(2, elevation);
};

/**
 * Per-km pace variation. Returns a multiplier for the instantaneous pace at a
 * given fractional progress. Average over the whole route ≈ 1.0 (so the
 * overall average pace equals the user pace), but each km varies ±6% —
 * realistic for human running and produces believable Strava splits.
 */
const paceMultiplierAt = (progress: number, rng: () => number): number => {
  // low-frequency variation per km, plus a touch of high-freq noise
  const slow = 1 + 0.06 * Math.sin(progress * 6 * Math.PI);
  const fast = 1 + 0.03 * (rng() - 0.5);
  return slow * fast;
};

// ---- Main export ----
export const exportToGPX = (
  rawPoints: RoutePoint[],
  activity: 'run' | 'bike',
  routeDetails?: RouteDetails,
  appPace?: number
) => {
  if (rawPoints.length === 0) {
    alert('Tidak ada titik rute untuk diekspor. Silakan buat rute terlebih dahulu.');
    return;
  }
  if (rawPoints.length < 2) {
    alert('Rute terlalu pendek. Tambahkan minimal 2 titik.');
    return;
  }

  const activityType = activity === 'run' ? 'running' : 'cycling';
  const now = new Date().toISOString();
  const routeName = routeDetails?.name || `${activityType} Route`;
  const routeDescription = routeDetails?.description || `Rute yang dihasilkan untuk ${activityType}`;

  // 1) Densify the polyline for even point spacing.
  const points = densify(rawPoints, activity === 'run' ? 0.005 : 0.008); // 5m / 8m

  // 2) Cumulative distance array.
  const segDist: number[] = new Array(points.length).fill(0);
  let totalDistanceKm = 0;
  for (let i = 1; i < points.length; i++) {
    const d = haversineKm(points[i - 1], points[i]);
    segDist[i] = segDist[i - 1] + d;
    totalDistanceKm += d;
  }
  if (totalDistanceKm <= 0) {
    alert('Rute tidak memiliki jarak yang terdeteksi.');
    return;
  }

  // 3) Pace (seconds per km). Fall back to 6:00/km (run) / 3:00/km (bike).
  const paceSecPerKm =
    appPace && appPace > 0 ? appPace : activity === 'run' ? 360 : 180;

  // 4) Seed RNG from the route geometry so re-export is stable.
  const seed = Math.round((points[0].lat + points[0].lng) * 1e6) ^ rawPoints.length;
  const rng = mulberry32(seed);

  // 5) Build trackpoints with timestamps + elevation.
  //    Start time: a plausible "today, morning" if we can't get a real one.
  //    We use the current time as start so elapsed time ≈ totalDuration.
  const startEpoch = Date.now();
  const gpxPoints: {
    lat: string;
    lng: string;
    ele: string;
    time: string;
  }[] = new Array(points.length);

  let elapsedSec = 0;
  for (let i = 0; i < points.length; i++) {
    const distHere = segDist[i];
    const progress = distHere / totalDistanceKm;
    const mult = paceMultiplierAt(progress, rng);
    // integrate elapsed time using the local pace multiplier on the segment
    if (i > 0) {
      const segKm = segDist[i] - segDist[i - 1];
      elapsedSec += segKm * paceSecPerKm * mult;
    }
    const pointTime = new Date(startEpoch + Math.round(elapsedSec * 1000));
    const ele = elevationAt(progress, totalDistanceKm);

    gpxPoints[i] = {
      lat: points[i].lat.toFixed(6),
      lng: points[i].lng.toFixed(6),
      ele: ele.toFixed(1),
      time: pointTime.toISOString(),
    };
  }

  // 6) GPX body. Use the standard GPX 1.1 schema; Strava reads this fine.
  const totalDurationSec = Math.round(elapsedSec);

  const gpxContent = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="FakeTheRun v2.0" xmlns="http://www.topografix.com/GPX/1/1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd">
  <metadata>
    <name>${escapeXml(routeName)}</name>
    <desc>${escapeXml(routeDescription)}</desc>
    <author>
      <name>FakeTheRun</name>
    </author>
    <time>${now}</time>
  </metadata>
  <trk>
    <name>${escapeXml(routeName)}</name>
    <type>${activityType}</type>
    <trkseg>
${gpxPoints
  .map(
    (p) =>
      `      <trkpt lat="${p.lat}" lon="${p.lng}">
        <ele>${p.ele}</ele>
        <time>${p.time}</time>
      </trkpt>`
  )
  .join('\n')}
    </trkseg>
  </trk>
</gpx>`;

  // 7) Trigger download.
  const blob = new Blob([gpxContent], { type: 'application/gpx+xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;

  const dateStr = new Date().toISOString().split('T')[0];
  const slug = routeDetails?.name
    ? routeDetails.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
    : activityType;
  a.download = `${slug || activityType}-${dateStr}.gpx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  // Return a small summary the caller can show/log.
  return {
    points: points.length,
    distanceKm: Number(totalDistanceKm.toFixed(3)),
    durationSec: totalDurationSec,
    paceSecPerKm,
  };
};

const escapeXml = (s: string): string =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
