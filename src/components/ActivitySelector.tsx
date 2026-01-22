import React from 'react';
import { Bike, User } from 'lucide-react';

interface ActivitySelectorProps {
  activity: 'run' | 'bike';
  onActivityChange: (activity: 'run' | 'bike') => void;
}

export default function ActivitySelector({ activity, onActivityChange }: ActivitySelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        onClick={() => onActivityChange('run')}
        className={`relative p-4 rounded-xl border-2 transition-all duration-300 group overflow-hidden ${activity === 'run'
            ? 'border-brand-secondary bg-gradient-to-br from-brand-secondary/10 to-brand-secondary/5 shadow-md'
            : 'border-gray-200 dark:border-white/10 hover:border-brand-secondary/50 bg-white dark:bg-white/5'
          }`}
      >
        {/* Active indicator */}
        {activity === 'run' && (
          <div className="absolute top-2 right-2">
            <span className="flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-secondary"></span>
            </span>
          </div>
        )}

        <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center transition-all ${activity === 'run'
            ? 'bg-brand-secondary/20 text-brand-secondary scale-110'
            : 'bg-gray-100 dark:bg-white/10 text-gray-400 group-hover:text-brand-secondary group-hover:bg-brand-secondary/10'
          }`}>
          <User className="w-6 h-6" />
        </div>
        <span className={`text-sm font-semibold block ${activity === 'run' ? 'text-brand-secondary' : 'text-gray-600 dark:text-gray-300'
          }`}>
          Running
        </span>
        <span className={`text-xs block mt-1 ${activity === 'run' ? 'text-brand-secondary/70' : 'text-gray-400'
          }`}>
          5-15 km/h
        </span>
      </button>

      <button
        onClick={() => onActivityChange('bike')}
        className={`relative p-4 rounded-xl border-2 transition-all duration-300 group overflow-hidden ${activity === 'bike'
            ? 'border-brand-secondary bg-gradient-to-br from-brand-secondary/10 to-brand-secondary/5 shadow-md'
            : 'border-gray-200 dark:border-white/10 hover:border-brand-secondary/50 bg-white dark:bg-white/5'
          }`}
      >
        {/* Active indicator */}
        {activity === 'bike' && (
          <div className="absolute top-2 right-2">
            <span className="flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-secondary"></span>
            </span>
          </div>
        )}

        <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center transition-all ${activity === 'bike'
            ? 'bg-brand-secondary/20 text-brand-secondary scale-110'
            : 'bg-gray-100 dark:bg-white/10 text-gray-400 group-hover:text-brand-secondary group-hover:bg-brand-secondary/10'
          }`}>
          <Bike className="w-6 h-6" />
        </div>
        <span className={`text-sm font-semibold block ${activity === 'bike' ? 'text-brand-secondary' : 'text-gray-600 dark:text-gray-300'
          }`}>
          Cycling
        </span>
        <span className={`text-xs block mt-1 ${activity === 'bike' ? 'text-brand-secondary/70' : 'text-gray-400'
          }`}>
          15-40 km/h
        </span>
      </button>
    </div>
  );
}