import React, { useState } from 'react';
import { FileText, Type, Sparkles } from 'lucide-react';

interface RouteFormProps {
  onFormChange: (data: { name: string; description: string }) => void;
}

export default function RouteForm({ onFormChange }: RouteFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const handleInputChange = (field: 'name' | 'description', value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onFormChange(newData);
  };

  return (
    <div className="space-y-4">
      {/* Route Name */}
      <div>
        <label className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
          <Type className="w-3.5 h-3.5" />
          Route Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          placeholder="e.g., Morning Run in the Park"
          className="w-full px-4 py-3 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm text-brand-dark dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent transition-all"
        />
      </div>

      {/* Description */}
      <div>
        <label className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
          <FileText className="w-3.5 h-3.5" />
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Describe your route, terrain, or any notes..."
          rows={3}
          className="w-full px-4 py-3 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm text-brand-dark dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent transition-all resize-none"
        />
      </div>

      {/* Preview Card */}
      {(formData.name || formData.description) && (
        <div className="p-4 bg-gradient-to-br from-brand-secondary/5 to-brand-primary/5 rounded-xl border border-brand-secondary/20 overflow-hidden">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-brand-secondary/10 rounded-lg">
              <Sparkles className="w-3.5 h-3.5 text-brand-secondary" />
            </div>
            <span className="text-xs font-semibold text-brand-secondary uppercase tracking-wide">Preview</span>
          </div>
          {formData.name && (
            <h4 className="text-base font-bold text-brand-dark dark:text-white mb-1">{formData.name}</h4>
          )}
          {formData.description && (
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{formData.description}</p>
          )}
        </div>
      )}

      {/* Hint */}
      <p className="text-xs text-gray-400 dark:text-gray-500 italic">
        💡 This information will be included in your GPX file metadata
      </p>
    </div>
  );
}