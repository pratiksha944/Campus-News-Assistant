/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CampusItem } from '../types';
import { Bookmark, Sparkles, ArrowUpRight, Clock, MapPin } from 'lucide-react';

interface NewsCardProps {
  item: CampusItem;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onOpenDetails: (item: CampusItem) => void;
  onAskAI: (item: CampusItem) => void;
}

export const NewsCard: React.FC<NewsCardProps> = ({
  item,
  isBookmarked,
  onToggleBookmark,
  onOpenDetails,
  onAskAI,
}) => {
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'news':
        return 'Campus News';
      case 'announcement':
        return 'Announcement';
      case 'event':
        return 'Event / Workshop';
      case 'hackathon':
        return 'Hackathon';
      case 'placement':
        return 'Placement Drive';
      default:
        return 'Bulletin';
    }
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 transition-all duration-200 flex flex-col justify-between overflow-hidden hover:shadow-md">
      {/* Optional Card Image Banner */}
      {item.image && (
        <div className="relative aspect-16/9 w-full bg-slate-100 overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
          />
          {item.featured && (
            <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-xs text-white text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-md">
              Major Highlight
            </div>
          )}
        </div>
      )}

      {/* Card Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col">
        {/* Unboxed Metadata Line (Anti-Slop Zero-Pill) */}
        <div className="flex items-center flex-wrap gap-2 text-xs text-slate-500 mb-3">
          <span className="font-semibold text-indigo-700 tracking-wide uppercase text-[11px]">
            {getCategoryLabel(item.category)}
          </span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span>{item.department}</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span className="font-mono tabular-nums">{item.date}</span>
        </div>

        {/* Primary Title */}
        <h3
          onClick={() => onOpenDetails(item)}
          className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors cursor-pointer line-clamp-2 mb-2 leading-snug"
        >
          {item.title}
        </h3>

        {/* Summary */}
        <p className="text-sm text-slate-600 line-clamp-3 mb-4 leading-relaxed flex-1">
          {item.summary}
        </p>

        {/* Key Metrics / Context Info */}
        <div className="space-y-2.5 pt-3 border-t border-slate-100 mb-4 text-xs text-slate-600">
          {item.deadline && (
            <div className="flex items-center gap-1.5 text-amber-700 font-medium">
              <Clock className="w-3.5 h-3.5 shrink-0" />
              <span>Deadline: </span>
              <span className="font-mono tabular-nums">{item.deadline}</span>
            </div>
          )}

          {item.venue && (
            <div className="flex items-center gap-1.5 text-slate-500 truncate">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
              <span className="truncate">{item.venue}</span>
            </div>
          )}

          {/* Quick Metrics Strip */}
          {item.metrics && item.metrics.length > 0 && (
            <div className="grid grid-cols-2 gap-2 pt-1">
              {item.metrics.slice(0, 2).map((m, idx) => (
                <div key={idx} className="bg-slate-50 rounded-lg p-2 border border-slate-100">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">{m.label}</div>
                  <div className="font-semibold text-slate-800 font-mono tabular-nums text-xs truncate">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-5 sm:px-6 py-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-3">
        <button
          onClick={() => onOpenDetails(item)}
          className="text-xs font-semibold text-slate-800 hover:text-indigo-600 flex items-center gap-1 transition-colors whitespace-nowrap"
        >
          <span>Read Details</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onAskAI(item)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors focus:outline-none"
            title="Ask Campus AI questions about this notice"
          >
            <Sparkles className="w-3 h-3 text-indigo-600" />
            <span className="hidden sm:inline">Ask AI</span>
          </button>

          <button
            onClick={() => onToggleBookmark(item.id)}
            className={`p-1.5 rounded-lg transition-colors focus:outline-none ${
              isBookmarked
                ? 'text-amber-600 bg-amber-50 hover:bg-amber-100'
                : 'text-slate-400 hover:text-slate-700 hover:bg-slate-200/60'
            }`}
            title={isBookmarked ? 'Remove from Saved' : 'Save for later'}
            aria-label={isBookmarked ? 'Bookmarked' : 'Bookmark'}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};
