/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Newspaper, Bot, Bookmark, Menu, X, Bell } from 'lucide-react';
import { CampusCategory } from '../types';

interface HeaderProps {
  activeCategory: CampusCategory;
  onSelectCategory: (cat: CampusCategory) => void;
  bookmarkCount: number;
  onOpenBookmarks: () => void;
  onOpenChat: () => void;
  hasUnreadAnnouncements?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeCategory,
  onSelectCategory,
  bookmarkCount,
  onOpenBookmarks,
  onOpenChat,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; category: CampusCategory }[] = [
    { label: 'All Updates', category: 'all' },
    { label: 'Campus News', category: 'news' },
    { label: 'Announcements', category: 'announcement' },
    { label: 'Events & Workshops', category: 'event' },
    { label: 'Hackathons', category: 'hackathon' },
    { label: 'Placement Drives', category: 'placement' },
  ];

  const handleNavClick = (cat: CampusCategory) => {
    onSelectCategory(cat);
    setMobileMenuOpen(false);
    const element = document.getElementById('updates-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-8">
          {/* Zone 1: Brand title, one line */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('all');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-sm group-hover:bg-indigo-700 transition-colors">
              <Newspaper className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-slate-900 tracking-tight">CampusPulse</span>
          </a>

          {/* Zone 2: 4-5 nav links, single-line text links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            {navLinks.map((link) => {
              const isActive = activeCategory === link.category;
              return (
                <button
                  key={link.category}
                  onClick={() => handleNavClick(link.category)}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors ${
                    isActive
                      ? 'text-indigo-600 font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action + helper affordances */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Bookmarks toggle */}
            <button
              onClick={onOpenBookmarks}
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              title="Saved Notices & Bookmarks"
              aria-label="Saved Bookmarks"
            >
              <Bookmark className="w-5 h-5" />
              {bookmarkCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-amber-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center font-mono tabular-nums shadow-xs">
                  {bookmarkCount}
                </span>
              )}
            </button>

            {/* Primary Action Button */}
            <button
              onClick={onOpenChat}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg transition-all shadow-sm whitespace-nowrap shrink-0 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
            >
              <Bot className="w-4 h-4" />
              <span>Ask Campus AI</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-1 shadow-lg">
          <div className="text-xs font-semibold uppercase text-slate-400 px-3 py-1.5 tracking-wider">
            Campus Sections
          </div>
          {navLinks.map((link) => {
            const isActive = activeCategory === link.category;
            return (
              <button
                key={link.category}
                onClick={() => handleNavClick(link.category)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between px-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBookmarks();
              }}
              className="flex items-center gap-2 text-sm text-slate-700 font-medium py-1.5"
            >
              <Bookmark className="w-4 h-4 text-slate-500" />
              <span>Saved Items ({bookmarkCount})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
