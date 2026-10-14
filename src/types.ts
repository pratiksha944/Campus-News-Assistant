/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type CampusCategory = 'all' | 'news' | 'announcement' | 'event' | 'hackathon' | 'placement';

export interface CampusItem {
  id: string;
  title: string;
  category: 'news' | 'announcement' | 'event' | 'hackathon' | 'placement';
  department: string;
  date: string;
  deadline?: string;
  summary: string;
  content: string;
  venue?: string;
  image?: string;
  featured?: boolean;
  tags: string[];
  eligibility?: string;
  contact?: string;
  actionUrl?: string;
  actionText?: string;
  metrics?: { label: string; value: string }[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  relatedItemIds?: string[];
}
