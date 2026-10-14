/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Trash2, ArrowRight, Loader2, Sparkles, X, Minimize2, Maximize2 } from 'lucide-react';
import { ChatMessage, CampusItem } from '../types';
import { CAMPUS_ITEMS } from '../data/campusData';

interface ChatbotAssistantProps {
  initialPrompt?: string;
  onClearInitialPrompt?: () => void;
  onOpenItemModal: (item: CampusItem) => void;
  isDrawer?: boolean;
  onCloseDrawer?: () => void;
}

export const ChatbotAssistant: React.FC<ChatbotAssistantProps> = ({
  initialPrompt,
  onClearInitialPrompt,
  onOpenItemModal,
  isDrawer = false,
  onCloseDrawer,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      content:
        "Hello! I'm your **CampusPulse AI Advisor**. I have real-time access to the latest campus news, examination schedules, workshop signups, hackathons, and placement drives. What would you like to know today?",
      timestamp: 'Just now',
      relatedItemIds: ['news-robotics-hub', 'ann-midterm-schedule', 'place-google-swe'],
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const samplePrompts = [
    'When is the Google placement drive and what is the CGPA cutoff?',
    'What are the dates and rules for Midterm Exams?',
    'Tell me about InnovateHacks 2026 and its prize pool',
    'Are there any scholarships available this semester?',
    'What AI or ML workshops are happening soon?',
  ];

  // Auto-fill prompt if sent from outside (e.g. from a card's "Ask AI" button)
  useEffect(() => {
    if (initialPrompt) {
      handleSendPrompt(initialPrompt);
      if (onClearInitialPrompt) onClearInitialPrompt();
    }
  }, [initialPrompt]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendPrompt = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend.trim(),
          history: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) {
        throw new Error('Server returned an error');
      }

      const data = await response.json();
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'Here is the campus information you requested.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        relatedItemIds: data.relatedItemIds || [],
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Chat error:', err);
      // Friendly fallback
      const errorReply: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content:
          "I ran into a minor connection timeout with the server. However, you can review today's verified notices in the categories above, or ask me again shortly!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorReply]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendPrompt(input);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content:
          'Chat reset. What other questions do you have about campus events, deadlines, or placements?',
        timestamp: 'Just now',
      },
    ]);
  };

  // Render markdown-like bold text & bullet points cleanly
  const renderMessageContent = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // Bold syntax replacer: **bold**
      const parts = line.split(/(\*\*[^*]+\*\*)/g);

      const formattedLine = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={pIdx} className="font-semibold text-slate-900">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
        return (
          <div key={idx} className="flex items-start gap-1.5 my-1 pl-1">
            <span className="text-indigo-600 font-bold shrink-0 mt-0.5">•</span>
            <span>{formattedLine}</span>
          </div>
        );
      }

      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }

      return (
        <p key={idx} className="my-1 leading-relaxed">
          {formattedLine}
        </p>
      );
    });
  };

  return (
    <div
      className={`flex flex-col bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden ${
        isDrawer ? 'h-full' : 'h-[620px]'
      }`}
    >
      {/* Chatbot Header */}
      <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-sm leading-tight flex items-center gap-1.5">
              <span>CampusPulse Assistant</span>
              <span className="text-[10px] font-mono uppercase bg-indigo-500/30 text-indigo-200 px-1.5 py-0.5 rounded">
                Gemini 3.8
              </span>
            </div>
            <div className="text-[11px] text-slate-400">
              Instant answers on bulletins, exams, hackathons & jobs
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={clearChat}
            className="p-1.5 text-slate-400 hover:text-white rounded-md transition-colors"
            title="Clear Chat History"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          {isDrawer && onCloseDrawer && (
            <button
              onClick={onCloseDrawer}
              className="p-1.5 text-slate-400 hover:text-white rounded-md transition-colors"
              title="Close Assistant"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50/50">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-2xl px-4 py-3 text-xs sm:text-sm ${
                  isUser
                    ? 'bg-indigo-600 text-white rounded-br-xs'
                    : 'bg-white text-slate-800 border border-slate-200 shadow-xs rounded-bl-xs'
                }`}
              >
                <div className="break-words">
                  {isUser ? msg.content : renderMessageContent(msg.content)}
                </div>

                {/* Related Campus Notice Cards */}
                {!isUser && msg.relatedItemIds && msg.relatedItemIds.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1.5">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Related Campus Notices:
                    </div>
                    <div className="space-y-1">
                      {msg.relatedItemIds.map((itemId) => {
                        const item = CAMPUS_ITEMS.find((ci) => ci.id === itemId);
                        if (!item) return null;
                        return (
                          <button
                            key={itemId}
                            onClick={() => onOpenItemModal(item)}
                            className="w-full text-left p-2 rounded-lg bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 transition-colors flex items-center justify-between gap-2 group"
                          >
                            <div className="truncate">
                              <div className="text-[11px] font-bold text-slate-900 group-hover:text-indigo-700 truncate">
                                {item.title}
                              </div>
                              <div className="text-[10px] text-slate-500 font-mono tabular-nums">
                                {item.deadline || item.date} · {item.department}
                              </div>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 shrink-0" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div
                  className={`text-[10px] mt-1 font-mono tabular-nums ${
                    isUser ? 'text-indigo-200 text-right' : 'text-slate-400 text-right'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {isUser && (
                <div className="w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div className="flex gap-3 justify-start items-center text-slate-500 text-xs py-2">
            <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl px-4 py-2.5 shadow-xs flex items-center gap-2">
              <Loader2 className="w-4 h-4 text-indigo-600 animate-spin" />
              <span>Checking campus database...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompt Chips */}
      <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 overflow-x-auto no-scrollbar flex items-center gap-1.5 shrink-0">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-indigo-600" />
          <span>Ask:</span>
        </span>
        {samplePrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendPrompt(prompt)}
            disabled={loading}
            className="px-2.5 py-1 text-xs bg-white hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 border border-slate-200 rounded-lg text-slate-600 whitespace-nowrap shrink-0 transition-colors disabled:opacity-50"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Box Footer */}
      <div className="p-3 bg-white border-t border-slate-200 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendPrompt(input);
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about announcements, hackathons, companies, dates..."
            disabled={loading}
            className="flex-1 px-4 py-2.5 bg-slate-50 hover:bg-slate-100/60 focus:bg-white border border-slate-300 focus:border-indigo-600 focus:ring-3 focus:ring-indigo-100 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="p-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl transition-all shadow-xs shrink-0"
            title="Send Message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
