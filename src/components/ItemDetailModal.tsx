/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { CampusItem } from '../types';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Mail,
  UserCheck,
  Bookmark,
  Sparkles,
  Share2,
  ExternalLink,
  Check,
} from 'lucide-react';

interface ItemDetailModalProps {
  item: CampusItem | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onAskAI: (item: CampusItem) => void;
  onShowToast: (msg: string) => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onAskAI,
  onShowToast,
}) => {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  const handleShare = () => {
    const text = `${item.title}\n${item.summary}\nDate: ${item.date}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      onShowToast('Notice details copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleAddToCalendar = () => {
    // Generate clean .ics format calendar file
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//CampusPulse//University News Hub//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${item.title.replace(/[,;]/g, '')}`,
      `DESCRIPTION:${item.summary.replace(/[,;]/g, '')}`,
      `LOCATION:${(item.venue || 'University Campus').replace(/[,;]/g, '')}`,
      `DTSTART:20261020T100000Z`,
      `DTEND:20261020T120000Z`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${item.id}-reminder.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onShowToast('Calendar event file downloaded (.ics)');
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-xs border-b border-slate-200 px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span className="uppercase font-bold text-indigo-700 tracking-wider">
              {item.category.toUpperCase()}
            </span>
            <span aria-hidden="true">·</span>
            <span className="truncate max-w-[200px] sm:max-w-xs">{item.department}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(item.id)}
              className={`p-2 rounded-lg transition-colors ${
                isBookmarked
                  ? 'text-amber-600 bg-amber-50 hover:bg-amber-100'
                  : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
              }`}
              title={isBookmarked ? 'Saved to Bookmarks' : 'Save for later'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={handleShare}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
              title="Copy Notice Details"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content Scrollable Area */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Optional Banner Image */}
          {item.image && (
            <div className="relative aspect-16/9 w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Title & Metadata */}
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug mb-3">
              {item.title}
            </h2>
            <div className="flex items-center flex-wrap gap-3 text-xs sm:text-sm text-slate-500">
              <span className="flex items-center gap-1 font-mono tabular-nums">
                <Calendar className="w-4 h-4 text-slate-400" />
                {item.date}
              </span>
              {item.deadline && (
                <>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="flex items-center gap-1 font-semibold text-amber-700 font-mono tabular-nums">
                    <Clock className="w-4 h-4 text-amber-600" />
                    Deadline: {item.deadline}
                  </span>
                </>
              )}
              {item.venue && (
                <>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="flex items-center gap-1 text-slate-600">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    {item.venue}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Metrics Highlight Strip */}
          {item.metrics && item.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200/80">
              {item.metrics.map((m, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
                    {m.label}
                  </div>
                  <div className="text-sm sm:text-base font-bold text-slate-900 font-mono tabular-nums">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Detailed Content Prose */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Bulletin Overview & Guidelines
            </h4>
            <div className="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line">
              {item.content}
            </div>
          </div>

          {/* Eligibility & Contact Box */}
          {(item.eligibility || item.contact) && (
            <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 space-y-2 text-xs sm:text-sm">
              {item.eligibility && (
                <div className="flex items-start gap-2 text-indigo-950">
                  <UserCheck className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Eligibility: </span>
                    <span>{item.eligibility}</span>
                  </div>
                </div>
              )}
              {item.contact && (
                <div className="flex items-center gap-2 text-indigo-950">
                  <Mail className="w-4 h-4 text-indigo-600 shrink-0" />
                  <div>
                    <span className="font-bold">Official Contact: </span>
                    <a
                      href={`mailto:${item.contact}`}
                      className="text-indigo-600 underline hover:text-indigo-800"
                    >
                      {item.contact}
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex items-center flex-wrap gap-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
              <span className="font-semibold text-slate-400">Tagged:</span>
              {item.tags.map((tag, idx) => (
                <span key={idx} className="text-slate-600">
                  #{tag}
                  {idx < item.tags.length - 1 ? ' ·' : ''}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="sticky bottom-0 bg-white border-t border-slate-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleAddToCalendar}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>Add to Calendar</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onAskAI(item);
              }}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Ask AI About This</span>
            </button>
          </div>

          <div className="w-full sm:w-auto flex items-center gap-2">
            <button
              onClick={() => {
                onShowToast('Action confirmed! Portal redirect simulation.');
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl transition-all shadow-sm"
            >
              <span>{item.actionText || 'Proceed to Portal'}</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
