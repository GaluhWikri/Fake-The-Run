import React, { useState, useEffect } from 'react';
import { Clock, Zap, Target, Timer, Gauge } from 'lucide-react';

interface PaceCalculatorProps {
  activity: 'run' | 'bike';
  distance: number;
  onPaceChange: (pace: number) => void;
}

export default function PaceCalculator({ activity, distance, onPaceChange }: PaceCalculatorProps) {
  const [paceMode, setPaceMode] = useState<'time' | 'pace'>('pace');
  const [targetTime, setTargetTime] = useState({ hours: 0, minutes: 30, seconds: 0 });
  const [averagePace, setAveragePace] = useState({ minutes: 5, seconds: 30 });
  const [pace, setPace] = useState(0);

  useEffect(() => {
    if (paceMode === 'time' && distance > 0) {
      const totalSeconds = targetTime.hours * 3600 + targetTime.minutes * 60 + targetTime.seconds;
      const pacePerKm = totalSeconds / distance;
      setPace(pacePerKm);
      onPaceChange(pacePerKm);
    } else if (paceMode === 'pace') {
      const paceInSeconds = averagePace.minutes * 60 + averagePace.seconds;
      setPace(paceInSeconds);
      onPaceChange(paceInSeconds);
    }
  }, [paceMode, targetTime, averagePace, distance, onPaceChange]);

  const formatPace = (paceInSeconds: number) => {
    const minutes = Math.floor(paceInSeconds / 60);
    const seconds = Math.floor(paceInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getSpeedFromPace = (paceInSeconds: number) => {
    if (paceInSeconds === 0) return '0.0';
    return (3600 / paceInSeconds).toFixed(1);
  };

  const calculateTotalTime = () => {
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

  return (
    <div className="space-y-4">
      {/* Mode Toggle */}
      <div className="flex p-1 bg-gray-100 dark:bg-white/5 rounded-xl">
        <button
          onClick={() => setPaceMode('pace')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${paceMode === 'pace'
              ? 'bg-white dark:bg-brand-dark text-brand-secondary shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:text-brand-dark dark:hover:text-white'
            }`}
        >
          <Gauge className="w-4 h-4" />
          Set Pace
        </button>
        <button
          onClick={() => setPaceMode('time')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${paceMode === 'time'
              ? 'bg-white dark:bg-brand-dark text-brand-secondary shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:text-brand-dark dark:hover:text-white'
            }`}
        >
          <Timer className="w-4 h-4" />
          Set Time
        </button>
      </div>

      {/* Input Section */}
      <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl">
        {paceMode === 'pace' ? (
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
              Average Pace (min/km)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <input
                  type="number"
                  value={averagePace.minutes}
                  onChange={(e) => setAveragePace(prev => ({ ...prev, minutes: parseInt(e.target.value) || 0 }))}
                  className="w-full px-4 py-3 bg-white dark:bg-brand-dark border border-gray-200 dark:border-white/10 rounded-xl text-center text-lg font-semibold text-brand-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent"
                  min="0"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">min</span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  value={averagePace.seconds}
                  onChange={(e) => setAveragePace(prev => ({ ...prev, seconds: parseInt(e.target.value) || 0 }))}
                  className="w-full px-4 py-3 bg-white dark:bg-brand-dark border border-gray-200 dark:border-white/10 rounded-xl text-center text-lg font-semibold text-brand-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent"
                  min="0"
                  max="59"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">sec</span>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
              Target Time
            </label>
            <div className="grid grid-cols-3 gap-2">
              <div className="relative">
                <input
                  type="number"
                  value={targetTime.hours}
                  onChange={(e) => setTargetTime(prev => ({ ...prev, hours: parseInt(e.target.value) || 0 }))}
                  className="w-full px-3 py-3 bg-white dark:bg-brand-dark border border-gray-200 dark:border-white/10 rounded-xl text-center text-lg font-semibold text-brand-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent"
                  min="0"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">h</span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  value={targetTime.minutes}
                  onChange={(e) => setTargetTime(prev => ({ ...prev, minutes: parseInt(e.target.value) || 0 }))}
                  className="w-full px-3 py-3 bg-white dark:bg-brand-dark border border-gray-200 dark:border-white/10 rounded-xl text-center text-lg font-semibold text-brand-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent"
                  min="0"
                  max="59"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">m</span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  value={targetTime.seconds}
                  onChange={(e) => setTargetTime(prev => ({ ...prev, seconds: parseInt(e.target.value) || 0 }))}
                  className="w-full px-3 py-3 bg-white dark:bg-brand-dark border border-gray-200 dark:border-white/10 rounded-xl text-center text-lg font-semibold text-brand-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent"
                  min="0"
                  max="59"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">s</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="space-y-2">
        <div className="flex items-center justify-between p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Clock className="w-4 h-4 text-blue-500" />
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-300">Current Pace</span>
          </div>
          <span className="text-sm font-bold text-brand-dark dark:text-white">
            {formatPace(pace)}/km
          </span>
        </div>

        <div className="flex items-center justify-between p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Zap className="w-4 h-4 text-purple-500" />
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-300">Speed</span>
          </div>
          <span className="text-sm font-bold text-brand-dark dark:text-white">
            {getSpeedFromPace(pace)} km/h
          </span>
        </div>

        {distance > 0 && (
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-brand-secondary/10 to-brand-primary/10 rounded-xl border border-brand-secondary/30">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-brand-secondary/20 rounded-lg">
                <Target className="w-4 h-4 text-brand-secondary" />
              </div>
              <span className="text-sm font-medium text-brand-secondary">Total Time</span>
            </div>
            <span className="text-lg font-bold text-brand-secondary">
              {calculateTotalTime()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}