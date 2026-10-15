/**
 * SD Infininov — "Worn By You" Fashion Reels Seed Data
 *
 * DEMO CONTENT NOTICE:
 * All entries below use publicly licensed stock video sources (Pexels).
 * Creator names marked [DEMO] are placeholder identifiers for sample content.
 * verifiedPurchase is only set to true for content explicitly verified by the store.
 *
 * To replace with real content: update videoUrl, posterUrl, creatorName,
 * and set published: false for anything pending moderation.
 *
 * BACKEND NOTE:
 * This file should eventually be replaced by an API call to a CMS / admin panel.
 * The FashionReel type in src/types/index.ts defines the full schema.
 */

import { FashionReel } from '../types';

export const FASHION_REELS: FashionReel[] = [
  {
    id: 'reel-001',
    videoUrl: 'https://www.pexels.com/download/video/3994839/?fps=25.0&h=1920&w=1080',
    posterUrl: 'https://images.unsplash.com/photo-1583391733975-088dd9fa7182?auto=format&fit=crop&w=600&q=85',
    caption: 'Wearing the Ishani Set in Royal Blue for Dashain Reloaded. The colour is absolutely divine and the fabric drapes so beautifully! 🌸 #DashainVibes #SDInfininov',
    creatorName: 'Srijana M.',
    creatorHandle: '@srijana.style',
    category: 'customer-reviews',
    relatedProductId: 'mori-ishani-blue',
    verifiedPurchase: true,
    published: true,
    duration: '0:22',
    views: 4821,
  },
  {
    id: 'reel-002',
    videoUrl: 'https://www.pexels.com/download/video/5698289/?fps=25.0&h=1920&w=1080',
    posterUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=85',
    caption: 'Campaign shoot — Ishani Set in Wine. Deep crimson, perfect for Tika evening. Shot at Patan Durbar Square. ✨ [DEMO MODEL CONTENT]',
    creatorName: 'SD Infininov [DEMO]',
    creatorHandle: '@sdinfininov',
    category: 'on-our-models',
    relatedProductId: 'mori-ishani-wine',
    verifiedPurchase: false,
    published: true,
    duration: '0:35',
    views: 12340,
  },
  {
    id: 'reel-003',
    videoUrl: 'https://www.pexels.com/download/video/7677977/?fps=25.0&h=1920&w=1080',
    posterUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=85',
    caption: 'Dashain morning look inspo 🪔 Styled our Anarkali collection with gold jhumkas and a messy bun. This is THE look! [DEMO OUTFIT INSPO]',
    creatorName: 'Priya K. [DEMO]',
    creatorHandle: '@priya.kathmandu',
    category: 'outfit-inspiration',
    relatedProductId: 'mori-ishani-wine',
    verifiedPurchase: false,
    published: true,
    duration: '0:18',
    views: 7203,
  },
  {
    id: 'reel-004',
    videoUrl: 'https://www.pexels.com/download/video/6393386/?fps=25.0&h=1920&w=1080',
    posterUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=85',
    caption: 'New arrival! The Dashain festive kurta edit just dropped 🎉 First look at our autumn collection. Limited pieces. [DEMO NEW ARRIVAL]',
    creatorName: 'SD Infininov [DEMO]',
    creatorHandle: '@sdinfininov',
    category: 'new-arrivals',
    relatedProductId: 'mori-ishani-blue',
    verifiedPurchase: false,
    published: true,
    duration: '0:29',
    views: 9877,
  },
  {
    id: 'reel-005',
    videoUrl: 'https://www.pexels.com/download/video/3994845/?fps=25.0&h=1920&w=1080',
    posterUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=85',
    caption: 'Mero Dashain ko outfit! 🧡 Got this stunning wine set for Tika and honestly I cried when I wore it, SO beautiful. Nepali craft at its best! [VERIFIED BUYER]',
    creatorName: 'Anuja R.',
    creatorHandle: '@anuja.rimal',
    category: 'customer-reviews',
    relatedProductId: 'mori-ishani-wine',
    verifiedPurchase: true,
    published: true,
    duration: '0:41',
    views: 6654,
  },
  {
    id: 'reel-006',
    videoUrl: 'https://www.pexels.com/download/video/4098369/?fps=25.0&h=1920&w=1080',
    posterUrl: 'https://images.unsplash.com/photo-1583391733975-088dd9fa7182?auto=format&fit=crop&w=600&q=85',
    caption: 'Dashain looks that go from puja to party 🎊 The Ishani Blue paired with oxidised silver jewellery — literally unbeatable. [DEMO DASHAIN LOOK]',
    creatorName: 'Style by Nisha [DEMO]',
    creatorHandle: '@nishastylesnepal',
    category: 'dashain-looks',
    relatedProductId: 'mori-ishani-blue',
    verifiedPurchase: false,
    published: true,
    duration: '0:26',
    views: 15201,
  },
  {
    id: 'reel-007',
    videoUrl: 'https://www.pexels.com/download/video/5698388/?fps=25.0&h=1920&w=1080',
    posterUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=85',
    caption: 'Behind the scenes of our new campaign shoot at Bhaktapur. Timeless pieces, timeless location. [DEMO MODEL CONTENT — Campaign BTS]',
    creatorName: 'SD Infininov [DEMO]',
    creatorHandle: '@sdinfininov',
    category: 'on-our-models',
    relatedProductId: 'mori-ishani-wine',
    verifiedPurchase: false,
    published: true,
    duration: '0:38',
    views: 8430,
  },
  {
    id: 'reel-008',
    videoUrl: 'https://www.pexels.com/download/video/6393392/?fps=25.0&h=1920&w=1080',
    posterUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=85',
    caption: 'Three ways to style the Ishani dupatta! ✨ From draped to pinned to wrapped — so versatile. [DEMO OUTFIT INSPO]',
    creatorName: 'Meena Fashion Tips [DEMO]',
    creatorHandle: '@meenafashion',
    category: 'outfit-inspiration',
    relatedProductId: 'mori-ishani-blue',
    verifiedPurchase: false,
    published: true,
    duration: '0:45',
    views: 11024,
  },
];
