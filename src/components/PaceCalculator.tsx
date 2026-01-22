import React, { useState, useEffect } from 'react';
import { Clock, Zap, Target, Timer, Gauge, ChevronUp, ChevronDown } from 'lucide-react';

interface PaceCalculatorProps {
  activity: 'run' | 'bike';
  distance: number;
  onPaceChange: (pace: number) => void;
}

// Custom Number Input Component with styled arrows
const NumberInput = ({
  value,
  onChange,
  min = 0,
  max,
  label
}: {
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
  label: string;
}) => {
  const increment = () => {
    if (max === undefined || value < max) {
      onChange(value + 1);
    }
  };

  const decrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  return (
    <div className="relative flex items-center bg-white dark:bg-brand-dark border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden">
      <button
        onClick={decrement}
        className="flex items-center justify-center w-10 h-full py-3 text-gray-400 hover:text-white hover:bg-brand-secondary active:scale-90 transition-all duration-150 rounded-l-lg"
      >
        <ChevronDown className="w-4 h-4" />
      </button>
      <div className="flex-1 relative">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value) || 0)}
          className="w-full py-3 bg-transparent text-center text-lg font-bold text-brand-dark dark:text-white focus:outline-none"
          min={min}
          max={max}
        />
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-wider text-gray-400 font-medium">{label}</span>
      </div>
      <button
        onClick={increment}
        className="flex items-center justify-center w-10 h-full py-3 text-gray-400 hover:text-white hover:bg-brand-secondary active:scale-90 transition-all duration-150 rounded-r-lg"
      >
        <ChevronUp className="w-4 h-4" />
      </button>
    </div>
  );
};

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
              <NumberInput
                value={averagePace.minutes}
                onChange={(val) => setAveragePace(prev => ({ ...prev, minutes: val }))}
                min={0}
                label="min"
              />
              <NumberInput
                value={averagePace.seconds}
                onChange={(val) => setAveragePace(prev => ({ ...prev, seconds: Math.min(59, val) }))}
                min={0}
                max={59}
                label="sec"
              />
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
              Target Time
            </label>
            <div className="grid grid-cols-3 gap-2">
              <NumberInput
                value={targetTime.hours}
                onChange={(val) => setTargetTime(prev => ({ ...prev, hours: val }))}
                min={0}
                label="h"
              />
              <NumberInput
                value={targetTime.minutes}
                onChange={(val) => setTargetTime(prev => ({ ...prev, minutes: Math.min(59, val) }))}
                min={0}
                max={59}
                label="m"
              />
              <NumberInput
                value={targetTime.seconds}
                onChange={(val) => setTargetTime(prev => ({ ...prev, seconds: Math.min(59, val) }))}
                min={0}
                max={59}
                label="s"
              />
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