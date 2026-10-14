/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { Search, X, Sparkles, Calendar, Briefcase, Award, FileText } from 'lucide-react';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenChatWithQuery: (query: string) => void;
  stats: {
    totalNews: number;
    totalAnnouncements: number;
    totalEvents: number;
    totalHackathons: number;
    totalPlacements: number;
  };
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  onSearchChange,
  onOpenChatWithQuery,
  stats,
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const popularSearches = [
    'Google Placement',
    'Midterm Exams',
    'InnovateHacks',
    'Scholarships',
    'PyTorch Workshop',
  ];

  return (
    <section className="relative bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading, Prose & Search Input */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="text-xs font-semibold tracking-wider uppercase text-indigo-600">
                Central University Student Intelligence Portal
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] text-balance">
                Real-Time Campus News, Deadlines & Opportunities
              </h1>
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                Your one-stop verified stream for official senate circulars, upcoming tech workshops,
                nationwide hackathons, tier-1 placement drives, and instant AI guidance.
              </p>
            </div>

            {/* Live Search Bar */}
            <div className="space-y-3">
              <div className="relative max-w-2xl">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search campus bulletins, companies, venues, hackathons, or dates..."
                  className="w-full pl-11 pr-24 py-3 text-sm sm:text-base bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 rounded-xl text-slate-900 placeholder:text-slate-400 transition-all outline-none"
                />
                <div className="absolute inset-y-0 right-0 pr-2 flex items-center gap-1.5">
                  {searchQuery ? (
                    <button
                      onClick={() => onSearchChange('')}
                      className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md transition-colors"
                      title="Clear search"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  ) : null}
                  <button
                    onClick={() => {
                      if (searchQuery.trim()) {
                        onOpenChatWithQuery(searchQuery);
                      } else {
                        searchInputRef.current?.focus();
                      }
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-lg transition-colors"
                    title="Search or Ask AI"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Ask AI</span>
                  </button>
                </div>
              </div>

              {/* Quick Search Suggestions */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="font-medium text-slate-400">Popular:</span>
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => onSearchChange(term)}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Feature Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-sm aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 group">
              <img
                src="/src/assets/images/hero_campus_quad_1791640092682.jpg"
                alt="University Quad and Student Center"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent flex flex-col justify-end p-5 text-white">
                <div className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-1">
                  Campus Highlight
                </div>
                <h3 className="text-base sm:text-lg font-bold leading-snug">
                  University Quad & Student Innovation Center
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-300 mt-1">
                  <span>Fall Term 2026</span>
                  <span aria-hidden="true">·</span>
                  <span>14,500 Enrolled Students</span>
                  <span aria-hidden="true">·</span>
                  <span>Official Bulletin</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Academic KPI Strip */}
        <div className="mt-10 pt-8 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-50/70 border border-slate-200/70">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">Placement Drives</div>
              <div className="text-lg font-bold text-slate-900 font-mono tabular-nums">
                {stats.totalPlacements} Companies
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-50/70 border border-slate-200/70">
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">Hackathons Open</div>
              <div className="text-lg font-bold text-slate-900 font-mono tabular-nums">
                {stats.totalHackathons} Active ($39k)
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-50/70 border border-slate-200/70">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">Official Notices</div>
              <div className="text-lg font-bold text-slate-900 font-mono tabular-nums">
                {stats.totalAnnouncements} Published
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-50/70 border border-slate-200/70">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">Events & Workshops</div>
              <div className="text-lg font-bold text-slate-900 font-mono tabular-nums">
                {stats.totalEvents} Scheduled
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
