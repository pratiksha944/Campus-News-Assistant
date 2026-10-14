/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CategoryFilterBar } from './components/CategoryFilterBar';
import { NewsCard } from './components/NewsCard';
import { ItemDetailModal } from './components/ItemDetailModal';
import { ChatbotAssistant } from './components/ChatbotAssistant';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { CAMPUS_ITEMS } from './data/campusData';
import { CampusCategory, CampusItem } from './types';
import { Bot, Sparkles, FilterX, CheckCircle, ArrowRight } from 'lucide-react';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<CampusCategory>('all');
  const [activeSubFilter, setActiveSubFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<CampusItem | null>(null);
  const [isChatDrawerOpen, setIsChatDrawerOpen] = useState(false);
  const [chatInitialPrompt, setChatInitialPrompt] = useState<string>('');
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Bookmarks persistence
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('campuspulse_bookmarks');
      return saved ? JSON.parse(saved) : ['place-google-swe', 'ann-midterm-schedule'];
    } catch {
      return ['place-google-swe', 'ann-midterm-schedule'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('campuspulse_bookmarks', JSON.stringify(bookmarkedIds));
    } catch {
      // ignore
    }
  }, [bookmarkedIds]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('Removed from saved bookmarks');
        return prev.filter((item) => item !== id);
      } else {
        showToast('Saved to bookmarks!');
        return [...prev, id];
      }
    });
  };

  const handleClearAllBookmarks = () => {
    setBookmarkedIds([]);
    showToast('All bookmarks cleared');
  };

  const bookmarkedItems = useMemo(() => {
    return CAMPUS_ITEMS.filter((item) => bookmarkedIds.includes(item.id));
  }, [bookmarkedIds]);

  // Statistics
  const stats = useMemo(() => {
    return {
      totalNews: CAMPUS_ITEMS.filter((i) => i.category === 'news').length,
      totalAnnouncements: CAMPUS_ITEMS.filter((i) => i.category === 'announcement').length,
      totalEvents: CAMPUS_ITEMS.filter((i) => i.category === 'event').length,
      totalHackathons: CAMPUS_ITEMS.filter((i) => i.category === 'hackathon').length,
      totalPlacements: CAMPUS_ITEMS.filter((i) => i.category === 'placement').length,
    };
  }, []);

  const counts: Record<CampusCategory, number> = useMemo(() => {
    return {
      all: CAMPUS_ITEMS.length,
      news: stats.totalNews,
      announcement: stats.totalAnnouncements,
      event: stats.totalEvents,
      hackathon: stats.totalHackathons,
      placement: stats.totalPlacements,
    };
  }, [stats]);

  // Filtered Items logic
  const filteredItems = useMemo(() => {
    return CAMPUS_ITEMS.filter((item) => {
      // Category match
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }

      // Sub-filter match
      if (activeSubFilter === 'featured' && !item.featured) {
        return false;
      }
      if (activeSubFilter === 'deadline' && !item.deadline) {
        return false;
      }
      if (activeSubFilter === 'tech') {
        const isTech =
          item.tags.some((t) =>
            ['AI', 'Robotics', 'Coding', 'SWE', 'Tech Placement', 'Google', 'Microsoft', 'Figma', 'CTF'].includes(t)
          ) || item.department.toLowerCase().includes('computing') || item.department.toLowerCase().includes('engineering');
        if (!isTech) return false;
      }

      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const inTitle = item.title.toLowerCase().includes(query);
        const inSummary = item.summary.toLowerCase().includes(query);
        const inDept = item.department.toLowerCase().includes(query);
        const inVenue = item.venue ? item.venue.toLowerCase().includes(query) : false;
        const inTags = item.tags.some((t) => t.toLowerCase().includes(query));
        const inCategory = item.category.toLowerCase().includes(query);

        if (!inTitle && !inSummary && !inDept && !inVenue && !inTags && !inCategory) {
          return false;
        }
      }

      return true;
    });
  }, [activeCategory, activeSubFilter, searchQuery]);

  const handleAskAIAboutItem = (item: CampusItem) => {
    const prompt = `Can you explain the key details, eligibility, deadlines, and requirements for "${item.title}"?`;
    setChatInitialPrompt(prompt);
    setIsChatDrawerOpen(true);
  };

  const handleOpenChatWithQuery = (query: string) => {
    setChatInitialPrompt(`Can you find campus updates or notices related to: "${query}"?`);
    setIsChatDrawerOpen(true);
  };

  const resetFilters = () => {
    setActiveCategory('all');
    setActiveSubFilter('all');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Toast alert */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        bookmarkCount={bookmarkedIds.length}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenChat={() => setIsChatDrawerOpen(true)}
      />

      {/* Hero Section with Search & Stats */}
      <HeroSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenChatWithQuery={handleOpenChatWithQuery}
        stats={stats}
      />

      {/* Main Content Area */}
      <main id="updates-section" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        {/* Section Heading & Category Segmented Filters */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {activeCategory === 'all'
                  ? 'All Campus Bulletins'
                  : activeCategory === 'news'
                  ? 'Latest Campus News'
                  : activeCategory === 'announcement'
                  ? 'Official College Announcements'
                  : activeCategory === 'event'
                  ? 'Events & Technical Workshops'
                  : activeCategory === 'hackathon'
                  ? 'Hackathons & Competitions'
                  : 'Placement & Internship Drives'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Showing{' '}
                <span className="font-semibold text-slate-800 font-mono tabular-nums">
                  {filteredItems.length}
                </span>{' '}
                verified items {searchQuery ? `matching "${searchQuery}"` : ''}
              </p>
            </div>

            {(searchQuery || activeCategory !== 'all' || activeSubFilter !== 'all') && (
              <button
                onClick={resetFilters}
                className="self-start sm:self-center flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <FilterX className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* Category Filter Controls */}
          <CategoryFilterBar
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            counts={counts}
            activeSubFilter={activeSubFilter}
            onSelectSubFilter={setActiveSubFilter}
          />
        </div>

        {/* News Cards Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <NewsCard
                key={item.id}
                item={item}
                isBookmarked={bookmarkedIds.includes(item.id)}
                onToggleBookmark={handleToggleBookmark}
                onOpenDetails={setSelectedItem}
                onAskAI={handleAskAIAboutItem}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 mx-auto flex items-center justify-center text-slate-400">
              <FilterX className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900">No matching campus bulletins found</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                No items match your active filters or query "{searchQuery}". Try broadening your search or resetting categories.
              </p>
            </div>
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              Show All Updates
            </button>
          </div>
        )}

        {/* Dedicated Embedded Campus AI Assistant Section */}
        <section id="ai-assistant-section" className="pt-8 border-t border-slate-200">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                Interactive Assistant
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Campus Q&A Assistant
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Ask questions about examination schedules, company cutoffs, workshop venues, or scholarship guidelines.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8">
              <ChatbotAssistant
                initialPrompt={chatInitialPrompt}
                onClearInitialPrompt={() => setChatInitialPrompt('')}
                onOpenItemModal={setSelectedItem}
              />
            </div>

            {/* Side guidance card */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-indigo-900 text-white rounded-2xl p-6 shadow-sm space-y-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-700/60 flex items-center justify-center text-white">
                  <Sparkles className="w-5 h-5 text-indigo-200" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-base text-white">Grounded in Campus Records</h3>
                  <p className="text-xs text-indigo-200 leading-relaxed">
                    CampusPulse AI scans verified university circulars, T&P placement criteria, and academic notices in real-time.
                  </p>
                </div>

                <div className="space-y-2 text-xs text-indigo-100 pt-2 border-t border-indigo-800">
                  <div className="font-semibold text-white">Try asking:</div>
                  <ul className="space-y-2">
                    <li
                      onClick={() => handleOpenChatWithQuery('Google placement drive eligibility criteria')}
                      className="cursor-pointer hover:text-white hover:underline flex items-start gap-1.5"
                    >
                      <ArrowRight className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                      <span>"What is Google's minimum CGPA and assessment date?"</span>
                    </li>
                    <li
                      onClick={() => handleOpenChatWithQuery('Midterm exam hall ticket rules')}
                      className="cursor-pointer hover:text-white hover:underline flex items-start gap-1.5"
                    >
                      <ArrowRight className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                      <span>"When do midterm hall tickets need to be downloaded?"</span>
                    </li>
                    <li
                      onClick={() => handleOpenChatWithQuery('InnovateHacks prizes and teams')}
                      className="cursor-pointer hover:text-white hover:underline flex items-start gap-1.5"
                    >
                      <ArrowRight className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                      <span>"What are the hackathon team limits and prize tracks?"</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Quick Academic Contacts */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 text-xs">
                <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                  Emergency & Helpdesk
                </div>
                <div className="space-y-2 text-slate-600">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="font-medium text-slate-700">Examination Cell</span>
                    <span className="font-mono tabular-nums">Ext: 4402</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="font-medium text-slate-700">Training & Placement</span>
                    <span className="font-mono tabular-nums">Ext: 3180</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="font-medium text-slate-700">Financial Aid</span>
                    <span className="font-mono tabular-nums">Ext: 2195</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="font-medium text-slate-700">Night SafeWalk</span>
                    <span className="font-mono tabular-nums text-indigo-600 font-bold">555-0199</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Action Button for Quick AI Assistant */}
      <button
        onClick={() => setIsChatDrawerOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2.5 font-semibold text-sm group focus:outline-none focus:ring-4 focus:ring-indigo-300"
        aria-label="Open Campus AI Assistant"
      >
        <Bot className="w-5 h-5 transition-transform group-hover:scale-110" />
        <span className="hidden sm:inline">Ask Campus AI</span>
      </button>

      {/* Item Detail Modal */}
      <ItemDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        isBookmarked={selectedItem ? bookmarkedIds.includes(selectedItem.id) : false}
        onToggleBookmark={handleToggleBookmark}
        onAskAI={handleAskAIAboutItem}
        onShowToast={showToast}
      />

      {/* Bookmarks Drawer */}
      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarkedItems={bookmarkedItems}
        onRemoveBookmark={handleToggleBookmark}
        onOpenDetails={setSelectedItem}
        onClearAll={handleClearAllBookmarks}
      />

      {/* Slide-out Quick Chat Assistant Drawer */}
      {isChatDrawerOpen && (
        <div
          className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
          onClick={() => setIsChatDrawerOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <ChatbotAssistant
              initialPrompt={chatInitialPrompt}
              onClearInitialPrompt={() => setChatInitialPrompt('')}
              onOpenItemModal={(item) => {
                setIsChatDrawerOpen(false);
                setSelectedItem(item);
              }}
              isDrawer={true}
              onCloseDrawer={() => setIsChatDrawerOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 px-4 sm:px-6 lg:px-8 mt-16 text-center text-xs text-slate-500 space-y-2">
        <div className="font-semibold text-slate-700">
          CampusPulse · Central University Student Affairs & Placement Directorate
        </div>
        <p>
          Official news bulletin, announcements, and AI assistance verified for Academic Year 2026-2027.
        </p>
      </footer>
    </div>
  );
}
