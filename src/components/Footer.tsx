/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Film, Mail, ArrowUp, ShieldAlert } from 'lucide-react';

interface FooterProps {
  onScrollToTop: () => void;
  onAdminToggle: () => void;
  isAdminMode: boolean;
}

export default function Footer({ onScrollToTop, onAdminToggle, isAdminMode }: FooterProps) {
  return (
    <footer id="app-footer-bar" className="bg-[#08090d] border-t border-zinc-900/60 py-12 text-zinc-500 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-teal-400">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <span className="font-display font-semibold text-white tracking-wide text-sm">
                Asif Creative <span className="text-teal-400">Edits</span>
              </span>
              <p className="text-[10px] text-zinc-600 font-mono tracking-wider">PORTFOLIO & CRM PLATFORM</p>
            </div>
          </div>

          {/* Social connections */}
          <div className="flex items-center gap-4 animate-fade-in">
            <span className="text-[10px] uppercase text-zinc-600 font-mono tracking-wider">Direct Desk:</span>
            <a href="mailto:muhammadasifrafique446@gmail.com" className="p-2 px-3 rounded-full bg-[#121319]/50 border border-zinc-800 text-zinc-400 hover:text-white transition-all flex items-center gap-1.5 font-mono text-[10px]" title="Send Email">
              <Mail className="w-3.5 h-3.5 text-teal-400" />
              <span>muhammadasifrafique446@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Tech stack disclaimer & Admin access points */}
        <div className="border-t border-zinc-900 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 font-mono text-[10px]">
          <div className="text-zinc-600 text-center sm:text-left">
            <span>Powered securely via Node.js container with </span>
            <span className="text-teal-400/80">Gemini 3.5-Flash Studio APIs</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Secret key-toggle to quickly test CRM */}
            <button
              onClick={onAdminToggle}
              className={`flex items-center gap-1 hover:underline ${isAdminMode ? 'text-amber-400 font-semibold' : 'text-zinc-600 hover:text-zinc-400'}`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{isAdminMode ? 'Exit Admin CRM' : 'Tester: Open Inquiries CRM'}</span>
            </button>

            <button
              onClick={onScrollToTop}
              className="p-2 border border-zinc-850 rounded hover:bg-zinc-900 text-zinc-400 hover:text-white flex items-center gap-1 transition-all"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
