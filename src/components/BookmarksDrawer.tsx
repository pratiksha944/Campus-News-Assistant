/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Bookmark, ArrowUpRight, Trash2, Calendar, Clock } from 'lucide-react';
import { CampusItem } from '../types';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedItems: CampusItem[];
  onRemoveBookmark: (id: string) => void;
  onOpenDetails: (item: CampusItem) => void;
  onClearAll: () => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  bookmarkedItems,
  onRemoveBookmark,
  onOpenDetails,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-500 fill-current" />
            <h3 className="font-bold text-slate-900 text-base">Saved Notices ({bookmarkedItems.length})</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {bookmarkedItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400 space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-300">
                <Bookmark className="w-6 h-6" />
              </div>
              <div className="text-sm font-semibold text-slate-700">No saved items yet</div>
              <p className="text-xs text-slate-500 max-w-xs">
                Click the bookmark icon on any campus news card, event, or placement drive to save it here for quick access.
              </p>
            </div>
          ) : (
            bookmarkedItems.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-indigo-200 transition-all flex flex-col justify-between gap-2 shadow-xs group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                      {item.category}
                    </span>
                    <button
                      onClick={() => onRemoveBookmark(item.id)}
                      className="text-slate-300 hover:text-rose-600 transition-colors p-1"
                      title="Remove bookmark"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <h4
                    onClick={() => {
                      onOpenDetails(item);
                      onClose();
                    }}
                    className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors cursor-pointer line-clamp-2"
                  >
                    {item.title}
                  </h4>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1 font-mono tabular-nums">
                    {item.deadline ? (
                      <span className="text-amber-700 font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-600" />
                        {item.deadline}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-slate-400">
                        <Calendar className="w-3 h-3" />
                        {item.date}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      onOpenDetails(item);
                      onClose();
                    }}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-0.5"
                  >
                    <span>View</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {bookmarkedItems.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
            <button
              onClick={onClearAll}
              className="text-xs text-slate-500 hover:text-rose-600 transition-colors font-medium"
            >
              Clear All Bookmarks
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
