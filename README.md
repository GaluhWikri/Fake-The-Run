# 🏃 Fake The Run

**Fake The Run** is a web application for generating realistic GPX activity files from hand-drawn or road-snapped routes. Draw a route on the map, set your target pace or finish time, and export a `.gpx` file whose statistics — distance, pace, moving time, elapsed time, splits, and elevation — are internally consistent and upload cleanly to **Strava** and other fitness platforms.

> ⚠️ **Disclaimer** — This project is intended for development, testing, and educational purposes (e.g. testing analytics pipelines, UI mockups, or personal dev environments). Misrepresenting activities on public platforms may violate their Terms of Service. Use responsibly.

---

## 🌐 Live Demo

➡️ [https://fake-the-run.vercel.app/](https://fake-the-run.vercel.app/)

---

## ✨ Features

### Core
- **Map-based route drawing** — click to add waypoints directly on an interactive Leaflet/OpenStreetMap canvas.
- **Snap to Roads** — routes are snapped to the real road/footpath network via the OSRM routing API, producing natural, driveable/runnable geometries.
- **GPX export** — one-click download of a standards-compliant GPX 1.1 file ready for Strava, Garmin, Komoot, etc.
- **Activity types** — `running` and `cycling`, with sensible defaults per activity.

### Statistics that match Strava
This is the headline improvement in v2.0. Every number shown in the app is reproduced **exactly** in the exported GPX:

| Statistic | How it's kept consistent |
|---|---|
| **Distance** | Haversine on the densified polyline — identical formula in-app and in the GPX. |
| **Pace** | User-set pace (or pace derived from a target finish time) is integrated across the route; the average equals the chosen pace. |
| **Moving Time = Elapsed Time** | Trackpoints are emitted continuously with no artificial gaps, so Strava's moving-time and elapsed-time collapse to the same value (no auto-pause artifacts). |
| **Splits (per km)** | The polyline is densified to ~5 m spacing (8 m for cycling), so there is always a trackpoint near each 1 km boundary → clean, believable splits. |
| **Grade-Adjusted Pace (GAP)** | Because pace varies ±6 % per kilometre (deterministic, seeded) while the average is held to the target, GAP lands in a natural range instead of a flat line. |
| **Elevation Gain** | A single `elevationAt(progress, distance)` model is shared between the UI (`RouteStats.tsx`) and the exporter (`gpxExport.ts`). Both the displayed gain and the GPX `<ele>` values come from the same function — Strava's computed gain matches the app. |

### UX
- **Dark / light theme** toggle.
- **Pace Calculator** with two modes: set average pace (min/km) **or** set a target finish time — the other value is derived automatically.
- **Route form** for naming and describing the activity (written into GPX metadata).
- **Minimalist, responsive** Tailwind CSS interface — no install required.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 18
- **npm** (or pnpm/yarn)

### Install & Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/<your-user>/fake-the-run.git
cd fake-the-run

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build      # outputs to ./dist
npm run preview    # preview the production build locally
```

---

## 🛠 How It Works

### 1. Drawing a route
The user enables **Draw mode** and clicks on the map to drop waypoints. Each click records `{lat, lng, timestamp}`. Waypoints can be undone or cleared.

### 2. Snapping to roads (optional)
Clicking **Snap to roads** sends the raw waypoints to the OSRM foot-routing endpoint, which returns a real path geometry along roads/footpaths. The snapped geometry replaces the straight-line interpolation, giving a realistic track.

### 3. Densification
Before export, the polyline is **densified** so consecutive points are at most ~5 m apart (running) or ~8 m apart (cycling). Even point spacing is what lets Strava compute correct per-km splits and moving time — sparse or unevenly spaced points are the #1 cause of mismatched statistics.

### 4. Timing
Each trackpoint gets a wall-clock timestamp derived from `cumulative_distance × pace`, with a small ±6 % per-km variation so splits look human. The variation is **seeded** (mulberry32 PRNG keyed off the route geometry), so re-exporting the same route yields identical timestamps. Crucially, there are **no gaps** between consecutive points, which makes `elapsed_time == moving_time`.

### 5. Elevation
Elevation at each point is produced by the shared `elevationAt(progress, totalDistanceKm)` function — a deterministic sum of two sine waves (a long hill cycle plus a shorter variation cycle) clamped to ≥ 20 m. Because the UI and the GPX exporter call the same function, the elevation gain shown in the app equals what Strava computes after upload.

### 6. GPX output
A standard GPX 1.1 file is generated:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="FakeTheRun v2.0" xmlns="http://www.topografix.com/GPX/1/1" ...>
  <metadata>...</metadata>
  <trk>
    <name>...</name>
    <type>running</type>
    <trkseg>
      <trkpt lat="..." lon="...">
        <ele>...</ele>
        <time>...</time>
      </trkpt>
      ...
    </trkseg>
  </trk>
</gpx>
```

---

## 📁 Project Structure

```
fake-the-run/
├── src/
│   ├── components/
│   │   ├── pages/
│   │   │   ├── CreateRoutePage.tsx   # main creator screen
│   │   │   └── HomePage.tsx         # landing page
│   │   ├── ActivitySelector.tsx     # run / bike toggle
│   │   ├── DrawingTools.tsx         # draw / view + waypoints toggle
│   │   ├── LocationSearch.tsx        # geocoder search box
│   │   ├── MapCanvas.tsx             # Leaflet map + draw + snap-to-roads
│   │   ├── PaceCalculator.tsx        # pace ↔ target time converter
│   │   ├── RouteForm.tsx             # name / description
│   │   └── RouteStats.tsx           # live stats (distance, time, elevation)
│   ├── utils/
│   │   └── gpxExport.ts              # densify + timing + elevation + GPX writer
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── backend/
│   └── server.js                     # (optional) Midtrans payment gateway — currently disabled
├── public/
│   └── lgooo.png / lgoood.png
├── index.html
├── vite.config.ts
├── tailwind.config.js
└── package.json
```

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| Maps | react-leaflet + Leaflet + OpenStreetMap tiles |
| Routing | OSRM (public demo server) for snap-to-roads |
| Icons | lucide-react |
| (Optional) Backend | Express + Midtrans (payment gateway, currently disabled) |

---

## ⚙️ Configuration

No environment variables are required for the core app. The optional backend (`backend/server.js`) needs:

```env
# backend/.env
MIDTRANS_SERVER_KEY=your_server_key
MIDTRANS_CLIENT_KEY=your_client_key
```

Start the backend separately:

```bash
cd backend && npm install && npm start    # listens on http://localhost:3001
```

---

## 📜 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server (HMR). |
| `npm run build` | Type-check + production build to `./dist`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run ESLint. |

---

## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feat/my-feature`.
3. Commit your changes with clear messages.
4. Push to your fork and open a Pull Request.

Please ensure `npm run build` passes and ESLint is clean before submitting.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

- [OpenStreetMap](https://www.openstreetmap.org/) — map data.
- [Leaflet](https://leafletjs.com/) / [react-leaflet](https://react-leaflet.js.org/) — mapping.
- [OSRM](http://project-osrm.org/) — road/foot routing.
- [lucide-react](https://lucide.dev/) — icons.
- [Tailwind CSS](https://tailwindcss.com/) — styling.
- [Vite](https://vitejs.dev/) — build tooling.
