
import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { Menu, Search, X, TrendingUp, Bell, Shield, Mail, Facebook, Twitter, Instagram, ChevronRight, User } from 'lucide-react';
import { storageService } from './services/storageService';
import { Post, Category, AdConfig, SiteSettings } from './types';
import Home from './pages/Home';
import ArticlePage from './pages/ArticlePage';
import Dashboard from './pages/Dashboard';

/**
 * AdSlot component ensures that scripts inside ad code strings
 * are properly executed by using createContextualFragment.
 */
export const AdSlot = ({ code, active }: { code: string; active?: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (active && containerRef.current) {
      containerRef.current.innerHTML = '';
      const range = document.createRange();
      const documentFragment = range.createContextualFragment(code);
      containerRef.current.appendChild(documentFragment);
    }
  }, [code, active]);

  if (!active) return null;
  return <div ref={containerRef} className="w-full h-full" />;
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const categories = Object.values(Category);
  const ads = storageService.getAds();
  const topAd = ads.find(a => a.id === 'leaderboard-top');
  const mobileTopAd = ads.find(a => a.id === 'mobile-leaderboard');

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      {/* Top Bar */}
      <div className="bg-rose-600 text-white text-[10px] md:text-xs py-1.5 px-4 flex justify-between items-center font-bold tracking-wider uppercase">
        <div className="flex space-x-4">
          <span>{new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <span className="hidden md:inline">Contact: info@deeprestjournal.com</span>
        </div>
        <div className="flex space-x-4">
          <Link to="/dashboard" className="hover:underline flex items-center gap-1"><User size={12}/> Editor Dashboard</Link>
          <span className="hidden md:inline cursor-pointer">Archive</span>
        </div>
      </div>

      {/* Main Brand Area */}
      <div className="container mx-auto px-4 py-4 md:py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <Link to="/" className="flex flex-col items-center md:items-start group">
          <h1 className="text-3xl md:text-5xl font-black text-rose-700 leading-none tracking-tighter serif italic">
            DEEPREST <span className="text-black not-italic">JOURNAL</span>
          </h1>
          <p className="text-[10px] md:text-xs font-bold text-gray-500 mt-1 uppercase tracking-[0.2em]">The Authority on Sleep Health & Recovery ⭐</p>
        </Link>
        
        {/* Ad Space */}
        <div className="w-full lg:w-[728px] flex justify-center">
          <div className="hidden lg:block w-full">
            {topAd && <AdSlot code={topAd.code} active={topAd.active} />}
          </div>
          <div className="block lg:hidden w-full">
            {mobileTopAd && <AdSlot code={mobileTopAd.code} active={mobileTopAd.active} />}
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="border-y border-gray-200 bg-white">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-6 overflow-x-auto whitespace-nowrap scrollbar-hide py-3">
             <Link to="/" className="text-sm font-black uppercase text-rose-600 hover:text-rose-700">Home</Link>
             {categories.map(cat => (
               <Link key={cat} to={`/category/${cat.toLowerCase().replace(/ /g, '-')}`} className="text-sm font-bold uppercase text-gray-800 hover:text-rose-600 transition-colors">
                 {cat}
               </Link>
             ))}
          </div>
          <div className="flex items-center space-x-4 ml-4">
             <button className="text-gray-600 hover:text-rose-600"><Search size={20} /></button>
             <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-gray-600"><Menu size={20} /></button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-white p-6 md:hidden">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black text-rose-600 serif italic">DEEPREST</h2>
            <button onClick={() => setIsMenuOpen(false)}><X size={32}/></button>
          </div>
          <ul className="space-y-4">
            {categories.map(cat => (
              <li key={cat}>
                <Link onClick={() => setIsMenuOpen(false)} to={`/category/${cat.toLowerCase().replace(/ /g, '-')}`} className="text-xl font-bold uppercase block border-b border-gray-100 pb-2">
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

const Footer = () => (
  <footer className="bg-zinc-900 text-gray-400 py-12 px-4 border-t-4 border-rose-600">
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-2">
        <h2 className="text-3xl font-black text-white serif italic mb-4">DEEPREST <span className="text-rose-600 not-italic">JOURNAL</span></h2>
        <p className="text-sm leading-relaxed mb-6 max-w-md">
          DeepRest Journal is a premium health media organization dedicated to providing professionals and families with evidence-based sleep strategies. We believe in the restorative power of rest as the foundation of peak performance and mental clarity.
        </p>
        <div className="flex space-x-4">
          <Facebook size={20} className="hover:text-white cursor-pointer" />
          <Twitter size={20} className="hover:text-white cursor-pointer" />
          <Instagram size={20} className="hover:text-white cursor-pointer" />
        </div>
      </div>
      <div>
        <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6 pb-2 border-b border-zinc-800">Categories</h3>
        <ul className="space-y-3 text-sm">
          {Object.values(Category).map(cat => (
            <li key={cat} className="hover:text-rose-500 cursor-pointer">{cat}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6 pb-2 border-b border-zinc-800">Company</h3>
        <ul className="space-y-3 text-sm">
          <li className="hover:text-rose-500 cursor-pointer">About Us</li>
          <li className="hover:text-rose-500 cursor-pointer">Contact</li>
          <li className="hover:text-rose-500 cursor-pointer">Privacy Policy</li>
          <li className="hover:text-rose-500 cursor-pointer">Terms of Service</li>
          <Link to="/dashboard" className="hover:text-rose-500 cursor-pointer block pt-4 text-rose-600 font-bold">Editor Dashboard</Link>
        </ul>
      </div>
    </div>
    <div className="container mx-auto mt-12 pt-8 border-t border-zinc-800 text-center text-xs">
      <p>&copy; 2024 DeepRest Journal Media Group. All rights reserved. Content is for educational purposes only.</p>
    </div>
  </footer>
);

const InterstitialAd = () => {
  const [visible, setVisible] = useState(false);
  const ads = storageService.getAds();
  const ad = ads.find(a => a.id === 'interstitial');

  useEffect(() => {
    if (ad?.active) {
      const shown = sessionStorage.getItem('drj_interstitial_shown');
      if (!shown) {
        // Delay interstitial by 8 seconds to allow user to engage with content first
        const timer = setTimeout(() => setVisible(true), 8000);
        return () => clearTimeout(timer);
      }
    }
  }, [ad]);

  const close = () => {
    setVisible(false);
    sessionStorage.setItem('drj_interstitial_shown', 'true');
  };

  if (!visible || !ad) return null;

  return (
    <div className="fixed inset-0 z-[1000] bg-black/80 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-white rounded-sm shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500">
        <button onClick={close} className="absolute top-4 right-4 bg-zinc-900 text-white p-2 rounded-full transition hover:bg-black z-10">
          <X size={24} />
        </button>
        <div className="max-h-[90vh] overflow-y-auto">
          <AdSlot code={ad.code} active={true} />
        </div>
      </div>
    </div>
  );
};

const AnchorAd = () => {
  const [visible, setVisible] = useState(true);
  const ads = storageService.getAds();
  const desktopAnchor = ads.find(a => a.id === 'anchor-bottom');
  const mobileAnchor = ads.find(a => a.id === 'mobile-anchor');

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[90] bg-zinc-900 border-t border-rose-600 shadow-[0_-4px_10px_rgba(0,0,0,0.3)] h-10 md:h-12">
      <div className="container mx-auto h-full px-4 relative flex items-center justify-center">
        <button onClick={() => setVisible(false)} className="absolute -top-6 right-4 bg-rose-600 text-white p-1 rounded-full hover:bg-rose-700 transition"><X size={12}/></button>
        <div className="hidden md:block w-full h-full">
          {desktopAnchor && <AdSlot code={desktopAnchor.code} active={desktopAnchor.active} />}
        </div>
        <div className="block md:hidden w-full h-full">
          {mobileAnchor && <AdSlot code={mobileAnchor.code} active={mobileAnchor.active} />}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [ads, setAds] = useState<AdConfig[]>([]);

  useEffect(() => {
    setPosts(storageService.getPosts());
    setAds(storageService.getAds());
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home posts={posts} ads={ads} />} />
            <Route path="/article/:slug" element={<ArticlePage posts={posts} ads={ads} />} />
            <Route path="/category/:cat" element={<Home posts={posts} ads={ads} />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
        <InterstitialAd />
        <AnchorAd />
      </div>
    </Router>
  );
}
