/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Play, Sparkles, Film, ArrowRight, Instagram, Video, Camera } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onPlanClick: () => void;
  onBookClick: () => void;
}

export default function Hero({ onPlanClick, onBookClick }: HeroProps) {
  return (
    <section id="hero-landing-arena" className="relative pt-12 pb-24 md:py-32 overflow-hidden border-b border-zinc-900/60 bg-[#0c0d13]">
      {/* Background visual glows */}
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-violet-600/10 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-xs font-mono text-teal-400 font-medium tracking-wide uppercase"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
              <span>Premium Video & Photo Editing Studio</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08] text-white"
            >
              Transforming Raw Footage Into <span className="bg-gradient-to-r from-violet-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">Cinematic Art</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              I am <strong className="text-white font-semibold">Asif Rafiq</strong>, a professional visual editor. I craft high-performance TikToks, immersive wedding films, dynamic travel vlogs, and professionally retouched portrait photography that capture attention instantly.
            </motion.p>

            {/* Quick CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <button
                id="hero-planner-cta-button"
                onClick={onPlanClick}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-sm tracking-wide transition-all duration-200 shadow-lg shadow-violet-600/20 flex items-center justify-center gap-2 hover:translate-y-[-1px] active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-violet-200" />
                <span>AI Creative Planner</span>
                <ArrowRight className="w-4 h-4 ml-1 text-violet-200" />
              </button>

              <button
                id="hero-book-cta-button"
                onClick={onBookClick}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#121319] hover:bg-zinc-800 border border-zinc-800 text-zinc-200 font-semibold text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2 hover:translate-y-[-1px] active:scale-95 cursor-pointer"
              >
                <Film className="w-4 h-4 text-teal-400" />
                <span>Book Services</span>
              </button>
            </motion.div>

            {/* Credibility Stats Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-8 border-t border-zinc-900 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center lg:text-left"
            >
              <div>
                <span className="block font-display font-bold text-2xl sm:text-3xl text-white">150+</span>
                <span className="text-xs text-zinc-500 font-mono uppercase tracking-wider">Edits Delivered</span>
              </div>
              <div>
                <span className="block font-display font-bold text-2xl sm:text-3xl text-white">100%</span>
                <span className="text-xs text-zinc-500 font-mono uppercase tracking-wider">Review Score</span>
              </div>
              <div>
                <span className="block font-display font-bold text-2xl sm:text-3xl text-white">48hr</span>
                <span className="text-xs text-zinc-500 font-mono uppercase tracking-wider">Avg. Turnaround</span>
              </div>
              <div>
                <span className="block font-display font-bold text-2xl sm:text-3xl text-teal-400">Sony A7SIII</span>
                <span className="text-xs text-zinc-500 font-mono uppercase tracking-wider">Pro-Grade Gear</span>
              </div>
            </motion.div>
          </div>

          {/* Hero Right Visuals (Rich, simulated workstation) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Overlay indicators */}
            <div className="absolute -top-4 -left-4 bg-[#121319]/90 border border-zinc-800 rounded-xl p-3 shadow-xl backdrop-blur-md flex items-center gap-2.5 z-20 animate-bounce" style={{ animationDuration: '4s' }}>
              <div className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
              <div className="text-xs font-mono">
                <span className="text-zinc-500 uppercase block text-[9px] tracking-wider">Live Frame Output</span>
                <span className="text-white font-medium">Asif_Timeline_v4.mp4</span>
              </div>
            </div>

            {/* Simulated editing dashboard container */}
            <div className="relative rounded-2xl border border-zinc-800/80 bg-[#0f1115] overflow-hidden shadow-2xl p-4">
              <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3 mb-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                  <span>Vinci Premiere Workspace</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                </div>
              </div>

              {/* Main Workspace Frame */}
              <div className="aspect-[4/3] rounded-lg bg-zinc-950 overflow-hidden relative border border-zinc-900 group">
                <img
                  src="/src/assets/images/pakistani_streets_portrait_1780142028744.png"
                  alt="Asif Creative Workstation"
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-transparent to-transparent opacity-65" />
                
                {/* Media timeline overlay controls */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-teal-500/10 hover:bg-teal-500/20 border border-teal-400/40 backdrop-blur-md flex items-center justify-center shadow-lg cursor-pointer transition-all duration-300">
                    <Play className="w-5 h-5 text-teal-400 ml-0.5 fill-teal-400" />
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-zinc-400 bg-black/55 backdrop-blur-md px-3 py-1.5 rounded-md border border-zinc-800">
                  <div className="flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5 text-teal-400" />
                    <span>0:14 / 2:30</span>
                  </div>
                  <span className="text bg-zinc-900 px-1 bg-opacity-70 text-[9px] uppercase tracking-wide rounded text-zinc-500">
                    1080P PRORES
                  </span>
                </div>
              </div>

              {/* Audio and layer track simulations */}
              <div className="mt-4 space-y-2 font-mono text-[9px]">
                {/* Video Layer 1 */}
                <div className="flex items-center gap-2">
                  <span className="w-6 text-zinc-500 text-right">V2</span>
                  <div className="flex-1 bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 rounded px-2 py-1 flex items-center justify-between">
                    <span>Cinematic Lut_GoldenRetouch.cube</span>
                    <span>100% Opacity</span>
                  </div>
                </div>
                {/* Video Layer 2 */}
                <div className="flex items-center gap-2">
                  <span className="w-6 text-zinc-500 text-right">V1</span>
                  <div className="flex-1 bg-teal-500/20 border border-teal-500/30 text-teal-300 rounded px-2 py-1 flex items-center justify-between">
                    <span>A7S3_RawFootage_Rec709.mxf</span>
                    <span>SoundSync</span>
                  </div>
                </div>
                {/* Audio Layer 1 */}
                <div className="flex items-center gap-2">
                  <span className="w-6 text-zinc-500 text-right">A1</span>
                  <div className="flex-1 bg-violet-600/20 border border-violet-500/35 text-violet-300 rounded px-2 py-1 flex items-center justify-between relative overflow-hidden">
                    <div className="absolute inset-y-0 left-0 bg-violet-600/10 w-2/3" />
                    <span className="relative z-10">AmbientSFX_ReverbWind_90bpm.wav</span>
                    <span className="relative z-10 font-sans">-6dB</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
