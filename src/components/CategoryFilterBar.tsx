/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CampusCategory } from '../types';
import { Newspaper, Bell, Calendar, Trophy, Briefcase, LayoutGrid, Clock, Flame } from 'lucide-react';

interface CategoryFilterBarProps {
  activeCategory: CampusCategory;
  onSelectCategory: (category: CampusCategory) => void;
  counts: Record<CampusCategory, number>;
  activeSubFilter: string;
  onSelectSubFilter: (filter: string) => void;
}

export const CategoryFilterBar: React.FC<CategoryFilterBarProps> = ({
  activeCategory,
  onSelectCategory,
  counts,
  activeSubFilter,
  onSelectSubFilter,
}) => {
  const categories: {
    id: CampusCategory;
    label: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'all',
      label: 'All Updates',
      icon: <LayoutGrid className="w-4 h-4" />,
    },
    {
      id: 'news',
      label: 'Campus News',
      icon: <Newspaper className="w-4 h-4" />,
    },
    {
      id: 'announcement',
      label: 'College Announcements',
      icon: <Bell className="w-4 h-4" />,
    },
    {
      id: 'event',
      label: 'Events & Workshops',
      icon: <Calendar className="w-4 h-4" />,
    },
    {
      id: 'hackathon',
      label: 'Hackathons',
      icon: <Trophy className="w-4 h-4" />,
    },
    {
      id: 'placement',
      label: 'Placement Updates',
      icon: <Briefcase className="w-4 h-4" />,
    },
  ];

  const subFilters = [
    { id: 'all', label: 'All Items' },
    { id: 'featured', label: 'Featured / Major', icon: <Flame className="w-3.5 h-3.5" /> },
    { id: 'deadline', label: 'Urgent Deadlines', icon: <Clock className="w-3.5 h-3.5" /> },
    { id: 'tech', label: 'Tech & Engineering' },
  ];

  return (
    <div className="space-y-4">
      {/* Primary Category Segmented Bar */}
      <div className="flex items-center overflow-x-auto pb-1 no-scrollbar gap-2 p-1.5 bg-slate-200/70 rounded-xl">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          const count = counts[cat.id] ?? 0;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 ${
                isActive
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <span className={isActive ? 'text-indigo-600' : 'text-slate-500'}>
                {cat.icon}
              </span>
              <span>{cat.label}</span>
              <span
                className={`text-xs px-1.5 py-0.2 rounded-md font-mono tabular-nums ${
                  isActive ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-300/60 text-slate-600'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Secondary Quick Sub-filters */}
      <div className="flex items-center justify-between flex-wrap gap-3 pt-1">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <span className="text-xs font-medium text-slate-400 whitespace-nowrap shrink-0">
            Quick Filter:
          </span>
          {subFilters.map((sf) => {
            const isSubActive = activeSubFilter === sf.id;
            return (
              <button
                key={sf.id}
                onClick={() => onSelectSubFilter(sf.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                  isSubActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {sf.icon && <span>{sf.icon}</span>}
                <span>{sf.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
