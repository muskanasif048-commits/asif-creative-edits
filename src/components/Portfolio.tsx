/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Film, Image, Play, ZoomIn, Sliders, CheckCircle, ExternalLink, Sparkles } from 'lucide-react';
import BeforeAfterSlider from './BeforeAfterSlider';
import { motion, AnimatePresence } from 'motion/react';

// Import images for proper Vite asset bundling
import pakistaniTravelerVlog from '../assets/images/pakistani_traveler_vlog_1780142006887.png';
import pakistaniGroomWedding from '../assets/images/pakistani_groom_wedding_1780141983288.png';
import pakistaniStreetsPortrait from '../assets/images/pakistani_streets_portrait_1780142028744.png';

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'video' | 'photo'>('all');
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  const portfolioItems = [
    {
      id: 'item-1',
      title: 'Cinematic Travel Vlog: Karakoram Range',
      category: 'video',
      serviceType: 'Speed Ramping & Immersive Audio',
      client: 'Northern Pakistan Expeditions',
      role: 'Full Footage Consolidation, Grading & Sound SFX',
      duration: '3m 15s',
      software: 'Adobe Premiere & DaVinci Resolve',
      description: 'A high-octane travel vlog featuring custom sound design (mountain winds, rushing turquoise water, epic cinematic swooshes), micro speed-ramps, and spectacular grading of the Karakoram range.',
      image: pakistaniTravelerVlog,
      tags: ['Travel', 'Speed Ramp', 'DaVinci Resolve', 'Sound Design']
    },
    {
      id: 'item-2',
      title: 'Traditional Groom Wedding Film',
      category: 'video',
      serviceType: 'Warm Golden Color Grading',
      client: 'Zain & Family',
      role: 'Detail Enhancement, Warm Light LUT, Narrative Cuts',
      duration: '4m 45s',
      software: 'DaVinci Resolve Studio',
      description: 'Emotionally-driven professional portrait movie highlight showcasing groom wearing cream and gold embroidered Sherwani, edited with film-grain overlay and golden hour cinematic grading.',
      image: pakistaniGroomWedding,
      tags: ['Wedding', 'LUTS', 'Color Grading', 'Sherwani']
    },
    {
      id: 'item-3',
      title: 'Urban Streetwear Portrait Retouch',
      category: 'photo',
      serviceType: 'Cinematic Portrait Grade & Detail Retouch',
      client: 'Modern Wardrobe Co.',
      role: 'Frequencies separation skin, rain street reflections glow',
      duration: 'High Res Still',
      software: 'Adobe Photoshop CC',
      description: 'Dramatically list photo of a young Pakistani male model in elegant modern jacket, retouched with targeted dodge & burn, neon reflection glare, and modern orange & teal highlight styling.',
      image: pakistaniStreetsPortrait,
      tags: ['Fashion', 'Portrait', 'Photoshop', 'Studio']
    }
  ];

  const filteredItems = activeCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <section id="portfolio-showcase-section" className="py-24 bg-[#0a0b10] border-t border-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono tracking-widest text-teal-400 uppercase font-semibold">Creator Portfolio</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            Selected Works & Retouches
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Take an interactive look at some of my recent editing projects. Move sliders, explore video storyboards, and inspect the level of attention to visual detail I bring to every frame.
          </p>

          {/* Category Tabs */}
          <div className="flex items-center justify-center gap-1.5 pt-6">
            <button
               id="portfolio-filter-all"
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-full text-xs font-mono font-medium tracking-wide transition-all ${
                activeCategory === 'all'
                  ? 'bg-gradient-to-r from-violet-600 to-teal-500 text-white'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              All Edits
            </button>
            <button
              id="portfolio-filter-video"
              onClick={() => setActiveCategory('video')}
              className={`px-4 py-2 rounded-full text-xs font-mono font-medium tracking-wide transition-all flex items-center gap-1.5 ${
                activeCategory === 'video'
                  ? 'bg-gradient-to-r from-violet-600 to-teal-500 text-white'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              Video Portfolio
            </button>
            <button
              id="portfolio-filter-photo"
              onClick={() => setActiveCategory('photo')}
              className={`px-4 py-2 rounded-full text-xs font-mono font-medium tracking-wide transition-all flex items-center gap-1.5 ${
                activeCategory === 'photo'
                  ? 'bg-gradient-to-r from-violet-600 to-teal-500 text-white'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Image className="w-3.5 h-3.5" />
              Photo Retouch
            </button>
          </div>
        </div>

        {/* Featured Interactive Section (Before & After Slider) */}
        {activeCategory !== 'video' && (
          <div className="mb-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-1.5 bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full text-xs font-mono text-teal-400 uppercase font-medium">
                <Sliders className="w-3.5 h-3.5" />
                <span>Before/After Interactive Lab</span>
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
                High-End Beauty & Cinematic Color Retouching
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Raw camera footage (Log/Flat profiles) typically looks gray and lifelike. Through professional color grading techniques, I isolate tones, add contrast, grade shadows with specific LUTS (like cinematic teal and orange), skin smooth frequency separation, and clean up distractions to create spectacular editorial compositions.
              </p>
              <ul className="space-y-3 text-sm text-zinc-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Dual-frequency skin retouches (retains natural pores)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Cinematic teal-and-orange lut styling matches</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Targeted lighting relighting highlights</span>
                </li>
              </ul>
            </div>
            
            <div className="lg:col-span-6">
              <BeforeAfterSlider
                beforeImage={pakistaniStreetsPortrait}
                afterImage={pakistaniStreetsPortrait}
                title="Cinematic Lighting & Tone Grade"
                description="Drag slide-ring horizontally to test flat log contrast versus our completed color graded portrait masters."
              />
            </div>
          </div>
        )}

        {/* Portfolio Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="group relative bg-[#121319] border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-zinc-700/60 transition-all duration-300"
            >
              {/* Image box */}
              <div className="aspect-[4/3] w-full overflow-hidden relative bg-zinc-950">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                {/* Floating Quick Action */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => setSelectedProject(item)}
                    className="flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-700 text-white font-semibold text-xs tracking-wide uppercase shadow-xl hover:bg-white hover:text-black transition-all transform translate-y-2 group-hover:translate-y-0"
                  >
                    {item.category === 'video' ? <Play className="w-3.5 h-3.5 fill-current" /> : <ZoomIn className="w-3.5 h-3.5" />}
                    <span>Explore Edit Specs</span>
                  </button>
                </div>

                <div className="absolute bottom-3 left-3 flex gap-1.5 z-10">
                  <span className="px-2 py-0.5 rounded bg-black/75 backdrop-blur-md text-[9px] font-mono tracking-wider uppercase text-teal-400 border border-teal-500/10">
                    {item.category === 'video' ? 'Video Edit' : 'Photo Grade'}
                  </span>
                </div>
              </div>

              {/* Specs & Metadata */}
              <div className="p-5 space-y-3">
                <h4 className="font-display font-semibold text-white group-hover:text-teal-400 transition-colors text-base">
                  {item.title}
                </h4>
                <p className="text-zinc-400 text-xs line-clamp-2">
                  {item.description}
                </p>
                
                {/* Tag bubbles */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {item.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-full bg-zinc-900 text-[10px] font-mono text-zinc-500 border border-zinc-800/80">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Interactive Project Inspector Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            {/* Modal backdrop auto-close */}
            <div className="absolute inset-0" onClick={() => setSelectedProject(null)} />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative w-full max-w-2xl bg-[#0f1115] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-zinc-800/80 p-5 bg-zinc-950/40">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center border border-teal-500/20">
                    {selectedProject.category === 'video' ? <Film className="w-4 h-4 text-teal-400" /> : <Image className="w-4 h-4 text-teal-400" />}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white text-base">{selectedProject.title}</h3>
                    <p className="text-[10px] text-zinc-500 font-mono tracking-wider uppercase">{selectedProject.serviceType}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center text-sm transition-all"
                >
                  ✕
                </button>
              </div>

              {/* Scrollable Contents */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-zinc-300">
                
                {/* Simulated Media Frame */}
                <div className="relative rounded-xl overflow-hidden border border-zinc-800 aspect-[16/9] bg-zinc-950">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  
                  {selectedProject.category === 'video' && (
                    <div className="absolute inset-0 bg-black/40 flex flex-col justify-between p-4">
                      {/* Live play indicators */}
                      <span className="self-end px-2 py-0.5 rounded bg-red-500 text-[10px] font-mono text-white tracking-widest uppercase font-medium flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        PREVIEW OUT
                      </span>
                      {/* Big player button */}
                      <div className="self-center w-12 h-12 rounded-full bg-teal-500 p-3 flex items-center justify-center text-black shadow-lg">
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      </div>
                      {/* Timeline bar */}
                      <div className="space-y-1">
                        <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                          <div className="h-full bg-teal-400 w-1/3" />
                        </div>
                        <div className="flex justify-between text-[9px] font-mono text-zinc-400">
                          <span>0:54 / {selectedProject.duration}</span>
                          <span>1080p 24fps</span>
                        </div>
                      </div>
                    </div>
                  )}
                  {selectedProject.category === 'photo' && (
                    <div className="absolute inset-0 bg-black/25 flex items-end p-4">
                      <span className="px-2.5 py-1 rounded bg-[#0d0e12]/80 font-mono text-[9px] tracking-widest text-teal-400 border border-teal-500/20">
                        100% PHOTOSHOP RETOUCH COMPLETED
                      </span>
                    </div>
                  )}
                </div>

                {/* Scope Specifications */}
                <div className="space-y-4">
                  <div>
                    <h5 className="text-xs uppercase tracking-wider font-mono text-teal-400 font-semibold mb-1">Project Vibe & Brief</h5>
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">{selectedProject.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-t border-zinc-800 pt-4 font-mono text-[11px] text-zinc-400">
                    <div>
                      <span className="block text-zinc-500">Client / Brand:</span>
                      <strong className="text-zinc-200">{selectedProject.client}</strong>
                    </div>
                    <div>
                      <span className="block text-zinc-500">Asif's Creative Role:</span>
                      <strong className="text-zinc-200">{selectedProject.role}</strong>
                    </div>
                    <div>
                      <span className="block text-zinc-500">Video Duration:</span>
                      <strong className="text-zinc-200">{selectedProject.duration}</strong>
                    </div>
                    <div>
                      <span className="block text-zinc-500">Primary Software:</span>
                      <strong className="text-zinc-200 text-teal-400">{selectedProject.software}</strong>
                    </div>
                  </div>
                </div>

              </div>

              {/* Footer CTA */}
              <div className="border-t border-zinc-800 p-5 flex items-center justify-between bg-zinc-950/40">
                <span className="text-xs font-mono text-zinc-500 uppercase">Need a similar design vibe?</span>
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    // Trigger scroll to contact
                    const formElement = document.getElementById('contact-booking-form-container');
                    if (formElement) {
                      formElement.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-black font-semibold text-xs tracking-wider rounded-lg uppercase flex items-center gap-1"
                >
                  <span>Book Asif For This Style</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
