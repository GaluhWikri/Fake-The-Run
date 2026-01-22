import { MapPin, Route, Pencil, Eye, Info } from 'lucide-react';

interface DrawingToolsProps {
  isDrawing: boolean;
  onDrawingToggle: () => void;
  showWaypoints: boolean;
  onWaypointsToggle: () => void;
}

export default function DrawingTools({
  isDrawing,
  onDrawingToggle,
  showWaypoints,
  onWaypointsToggle
}: DrawingToolsProps) {

  return (
    <div className="space-y-4">
      {/* Mode Toggle Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onDrawingToggle}
          className={`relative p-4 rounded-xl border-2 transition-all duration-300 group ${isDrawing
              ? 'border-brand-secondary bg-gradient-to-br from-brand-secondary/10 to-brand-secondary/5 shadow-md'
              : 'border-gray-200 dark:border-white/10 hover:border-brand-secondary/50 bg-white dark:bg-white/5'
            }`}
        >
          {isDrawing && (
            <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          )}
          <div className={`w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center transition-colors ${isDrawing
              ? 'bg-brand-secondary/20 text-brand-secondary'
              : 'bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400 group-hover:text-brand-secondary'
            }`}>
            <Pencil className="w-5 h-5" />
          </div>
          <span className={`text-sm font-medium block ${isDrawing ? 'text-brand-secondary' : 'text-gray-600 dark:text-gray-300'
            }`}>
            Draw
          </span>
        </button>

        <button
          onClick={onDrawingToggle}
          className={`relative p-4 rounded-xl border-2 transition-all duration-300 group ${!isDrawing
              ? 'border-brand-secondary bg-gradient-to-br from-brand-secondary/10 to-brand-secondary/5 shadow-md'
              : 'border-gray-200 dark:border-white/10 hover:border-brand-secondary/50 bg-white dark:bg-white/5'
            }`}
        >
          {!isDrawing && (
            <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full"></div>
          )}
          <div className={`w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center transition-colors ${!isDrawing
              ? 'bg-brand-secondary/20 text-brand-secondary'
              : 'bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400 group-hover:text-brand-secondary'
            }`}>
            <Eye className="w-5 h-5" />
          </div>
          <span className={`text-sm font-medium block ${!isDrawing ? 'text-brand-secondary' : 'text-gray-600 dark:text-gray-300'
            }`}>
            View
          </span>
        </button>
      </div>

      {/* Waypoints Toggle */}
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white dark:bg-white/10 rounded-lg shadow-sm">
            <MapPin className="w-4 h-4 text-brand-secondary" />
          </div>
          <div>
            <span className="text-sm font-medium text-brand-dark dark:text-white block">Show Waypoints</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">Display markers on route</span>
          </div>
        </div>
        <button
          onClick={onWaypointsToggle}
          className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors shadow-inner ${showWaypoints ? 'bg-brand-secondary' : 'bg-gray-300 dark:bg-gray-600'
            }`}
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform ${showWaypoints ? 'translate-x-6' : 'translate-x-1'
              }`}
          />
        </button>
      </div>

      {/* Instructions Card */}
      <div className="p-4 bg-gradient-to-br from-brand-secondary/5 to-brand-primary/5 rounded-xl border border-brand-secondary/20">
        <div className="flex items-center gap-2 mb-3">
          <Info className="w-4 h-4 text-brand-secondary" />
          <span className="text-sm font-semibold text-brand-dark dark:text-white">Quick Guide</span>
        </div>
        <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-300">
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 bg-brand-secondary/10 text-brand-secondary rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">1</span>
            <span>Search for a location using the search bar</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 bg-brand-secondary/10 text-brand-secondary rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">2</span>
            <span>Enable Draw mode and click on map to add points</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 bg-brand-secondary/10 text-brand-secondary rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">3</span>
            <span>Use "Snap to Roads" for realistic routing</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 bg-brand-secondary/10 text-brand-secondary rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">4</span>
            <span>Export your route as GPX file</span>
          </li>
        </ul>
      </div>
    </div>
  );
}