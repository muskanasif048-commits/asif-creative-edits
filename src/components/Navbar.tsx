/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Film, User, ShieldCheck, Mail, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAdminMode: boolean;
  setIsAdminMode: (mode: boolean) => void;
  unreadCount: number;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  isAdminMode,
  setIsAdminMode,
  unreadCount
}: NavbarProps) {
  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'portfolio', label: 'Showcase' },
    { id: 'pricing', label: 'Services' },
    { id: 'consultation', label: 'AI Planner', icon: Sparkles },
    { id: 'contact', label: 'Book Now' }
  ];

  return (
    <header id="app-main-navbar" className="sticky top-0 z-50 w-full bg-[#0b0c10]/85 backdrop-blur-md border-b border-zinc-800/60 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => { setActiveTab('home'); setIsAdminMode(false); }}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-teal-400 p-[1.5px] shadow-lg shadow-violet-500/10">
              <div className="w-full h-full bg-[#0d0e12] rounded-[10px] flex items-center justify-center">
                <Film className="w-5 h-5 text-teal-400" />
              </div>
            </div>
            <div>
              <span className="font-display font-bold text-lg tracking-tight text-white bg-clip-text">
                Asif Creative <span className="text-teal-400">Edits</span>
              </span>
              <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest -mt-1">By Asif Rafiq</p>
            </div>
          </div>

          {/* Desktop Nav Actions */}
          <nav className="hidden md:flex items-center gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id && !isAdminMode;
              return (
                <button
                  key={tab.id}
                  id={`nav-link-${tab.id}`}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsAdminMode(false);
                    // Scroll to top or specific section if desired
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium tracking-wide transition-all duration-200 flex items-center gap-1.5 ${
                    isActive 
                      ? 'text-white font-semibold' 
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute inset-0 bg-zinc-800/60 border border-zinc-700/50 rounded-lg -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {Icon && <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-teal-400' : 'text-zinc-500'}`} />}
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Admin / Portal Toggle Controls */}
          <div className="flex items-center gap-3">
            <button
              id="admin-dashboard-toggle-button"
              onClick={() => {
                setIsAdminMode(!isAdminMode);
                if (!isAdminMode) {
                  // Going to admin mode
                  setActiveTab('');
                } else {
                  setActiveTab('home');
                }
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono border tracking-wider transition-all duration-200 ${
                isAdminMode
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  : 'bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:bg-zinc-800/60 hover:text-white'
              }`}
              title="Toggle Client View and Asif's CRM Admin Portal"
            >
              {isAdminMode ? (
                <>
                  <User className="w-3.5 h-3.5" />
                  <span>PREVIEW SITE</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-zinc-500" />
                  <span>ASIF'S CRM</span>
                  {unreadCount > 0 && (
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                    </span>
                  )}
                </>
              )}
            </button>

            {/* Direct Instant Action Call */}
            {!isAdminMode ? (
              <button
                id="quick-cta-button-top"
                onClick={() => {
                  setActiveTab('contact'); 
                  window.scrollTo({ top: 9999, behavior: 'smooth' });
                }}
                className="hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-[#0b0c10] font-semibold text-xs tracking-wide uppercase transition-all duration-200 shadow-md shadow-teal-500/10 active:scale-95"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>BOOK ME</span>
              </button>
            ) : null}
          </div>

        </div>
      </div>
    </header>
  );
}
