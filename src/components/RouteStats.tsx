import React from 'react';
import { Route, Clock, TrendingUp, Download, CheckCircle, Activity } from 'lucide-react';

interface RoutePoint {
  lat: number;
  lng: number;
  timestamp: number;
}

interface RouteStatsProps {
  points: RoutePoint[];
  activity: 'run' | 'bike';
  pace: number;
  onExport: () => void;
  showDownloadSuccess?: boolean;
}

export default function RouteStats({ points, activity, pace, onExport, showDownloadSuccess }: RouteStatsProps) {
  const calculateDistance = () => {
    if (points.length < 2) return 0;

    let totalDistance = 0;
    for (let i = 1; i < points.length; i++) {
      const R = 6371; // Radius bumi dalam km
      const dLat = (points[i].lat - points[i - 1].lat) * Math.PI / 180;
      const dLng = (points[i].lng - points[i - 1].lng) * Math.PI / 180;
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(points[i - 1].lat * Math.PI / 180) * Math.cos(points[i].lat * Math.PI / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      totalDistance += R * c;
    }

    return totalDistance;
  };

  const formattedDistance = calculateDistance().toFixed(2);

  const calculateEstimatedTime = () => {
    const distance = calculateDistance();
    if (distance === 0 || pace === 0) return '0:00';

    const totalSeconds = distance * pace;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Menghitung total tanjakan agar konsisten dengan ekspor GPX
  const calculateElevationGain = () => {
    if (points.length < 2) return 0;

    const totalDistance = calculateDistance();
    if (totalDistance === 0) return 0;

    const baseElevation = 100.0;
    const numberOfHills = Math.max(1, Math.floor(totalDistance / 2));
    const hillAmplitude = 30.0;

    let elevationGain = 0;
    let lastElevation = -1;
    let cumulativeDistance = 0;

    const haversineDistance = (p1: RoutePoint, p2: RoutePoint): number => {
      const R = 6371;
      const dLat = (p2.lat - p1.lat) * Math.PI / 180;
      const dLng = (p2.lng - p1.lng) * Math.PI / 180;
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(p1.lat * Math.PI / 180) * Math.cos(p2.lat * Math.PI / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    };

    points.forEach((point, index) => {
      if (index > 0) {
        cumulativeDistance += haversineDistance(points[index - 1], point);
      }

      const progress = cumulativeDistance / totalDistance;
      const hillEffect = hillAmplitude * Math.sin(progress * numberOfHills * 2 * Math.PI);
      const variationEffect = (hillAmplitude / 4) * Math.sin(progress * numberOfHills * 8 * Math.PI);

      let currentElevation = baseElevation + hillEffect + variationEffect;
      currentElevation = Math.max(20, currentElevation);

      if (lastElevation !== -1 && currentElevation > lastElevation) {
        elevationGain += currentElevation - lastElevation;
      }
      lastElevation = currentElevation;
    });

    return Math.round(elevationGain);
  };


  const estimatedTime = calculateEstimatedTime();
  const elevation = calculateElevationGain();

  return (
    <div className="space-y-4">
      {/* Export Button - Prominent */}
      <div className="relative">
        <button
          onClick={onExport}
          disabled={points.length === 0}
          className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-brand-secondary to-brand-primary text-white rounded-xl font-semibold shadow-lg shadow-brand-secondary/25 hover:shadow-xl hover:shadow-brand-secondary/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-300 transform hover:scale-[1.02] disabled:hover:scale-100"
        >
          <Download className="w-5 h-5" />
          <span>Export GPX File</span>
        </button>

        {showDownloadSuccess && (
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium flex items-center gap-2 animate-bounce z-10 whitespace-nowrap">
            <CheckCircle className="w-4 h-4" />
            GPX Downloaded Successfully!
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Distance */}
        <div className="group p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10 border border-blue-100 dark:border-blue-800/30 hover:shadow-md transition-all">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-blue-500/10 rounded-lg">
              <Route className="w-4 h-4 text-blue-500" />
            </div>
            <span className="text-xs font-medium text-blue-600 dark:text-blue-400">Distance</span>
          </div>
          <div className="text-xl font-bold text-blue-700 dark:text-blue-300">{formattedDistance} <span className="text-sm font-normal">km</span></div>
        </div>

        {/* Time */}
        <div className="group p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/10 border border-purple-100 dark:border-purple-800/30 hover:shadow-md transition-all">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-purple-500/10 rounded-lg">
              <Clock className="w-4 h-4 text-purple-500" />
            </div>
            <span className="text-xs font-medium text-purple-600 dark:text-purple-400">Est. Time</span>
          </div>
          <div className="text-xl font-bold text-purple-700 dark:text-purple-300">{estimatedTime}</div>
        </div>

        {/* Elevation */}
        <div className="group p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-900/20 dark:to-green-800/10 border border-green-100 dark:border-green-800/30 hover:shadow-md transition-all">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-green-500/10 rounded-lg">
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <span className="text-xs font-medium text-green-600 dark:text-green-400">Elevation</span>
          </div>
          <div className="text-xl font-bold text-green-700 dark:text-green-300">{elevation} <span className="text-sm font-normal">m</span></div>
        </div>

        {/* Activity */}
        <div className="group p-4 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-900/20 dark:to-orange-800/10 border border-orange-100 dark:border-orange-800/30 hover:shadow-md transition-all">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-orange-500/10 rounded-lg">
              <Activity className="w-4 h-4 text-orange-500" />
            </div>
            <span className="text-xs font-medium text-orange-600 dark:text-orange-400">Activity</span>
          </div>
          <div className="text-xl font-bold text-orange-700 dark:text-orange-300 capitalize">{activity}</div>
        </div>
      </div>
    </div>
  );
}