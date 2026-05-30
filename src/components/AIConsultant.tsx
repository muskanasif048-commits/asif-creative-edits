/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check, Sliders, Play, RotateCcw, Copy, Loader2, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AIPlanResponse } from '../types';

interface AIConsultantProps {
  onPlanApplied: (planDetails: { service: string; projectType: string; summary: string }) => void;
}

export default function AIConsultant({ onPlanApplied }: AIConsultantProps) {
  const [projectType, setProjectType] = useState<string>('TikTok/Reel Hype Edit');
  const [tone, setTone] = useState<string>('Cinematic Teal & Orange');
  const [duration, setDuration] = useState<string>('30-Sec Social Reel');
  const [additionalInfo, setAdditionalInfo] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<AIPlanResponse | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [isFormApplied, setIsFormApplied] = useState<boolean>(false);

  // Common preset options
  const projectPresets = [
    'TikTok/Reel Hype Edit',
    'Travel Vlog / Diary',
    'Premium Wedding Highlights',
    'Corporate Branding Promo',
    'YouTube Lifestyle/Vlog Cut',
    'Portrait Photo Edit & Grade'
  ];

  const tonePresets = [
    'Cinematic Teal & Orange',
    'Moody Cyberpunk / Neon',
    'Bright, Warm & Airy',
    'Minimalist & Documentary',
    'Glitchy Hype / Action'
  ];

  const durationPresets = [
    '30-Sec Social Reel',
    '1 to 2 Minute Highlights',
    '5 to 10 Minute Vlog',
    'Custom Asset Package'
  ];

  const handleConsultSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);
    setIsFormApplied(false);
    
    try {
      const response = await fetch('/api/ai-consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectType,
          tone,
          duration,
          additionalInfo
        })
      });

      if (!response.ok) {
        throw new Error('Creative server did not respond successfully.');
      }

      const data: AIPlanResponse = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Error generating AI plan:', err);
      // Fallback fallback is handled internally by Express, but dual security check:
      setResult({
        conceptName: `Dynamic ${tone} Edit`,
        vibeDescription: `A high-concept ${tone} visual production customized for ${projectType}, tuned for professional impact and modern pacing.`,
        storyboardSteps: [
          {
            step: "Hook / Focus Scene",
            description: `Aggressive fast-paced opening establishing a high-energy tone. Matching text-tracking titles.`,
            durationEstimate: "0:00 - 0:05"
          },
          {
            step: "Rhythm Build Up",
            description: "Introduce second-angle views and apply steady speed ramping built around music beat triggers.",
            durationEstimate: "0:05 - 0:15"
          }
        ],
        editingRecommendations: {
          transitions: "Whip pans, speed ramp bursts, and fluid cross-fades.",
          colorGrading: `Warm cinematic shadows and bright contrast representing ${tone}`,
          audioTrack: "Rhythmic background beat synchronized with footage motion.",
          visualEffects: "Stabilized drone tracking, subtle film-grain overlays."
        },
        estimatedPacing: "Dynamic, musical rhythm-driven cuts.",
        estimatedPriceBracket: "$180 - $280",
        customQuoteNote: "Submit your contact booking form right here on Asif Creative Edits to transform this digital strategy into real, professional motion gold!"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyToForm = () => {
    if (!result) return;
    
    // Map service category based on project input
    let serviceMap = 'video_editing';
    if (projectType.includes('Photo') || projectType.includes('retouch')) {
      serviceMap = 'photo_editing';
    } else if (projectType.includes('Premium') || projectType.includes('Corporate')) {
      serviceMap = 'full_package';
    }

    const planSummary = `--- AI CONSULTATION PLAN APPLIED ---
Project Concept: ${result.conceptName}
Desired Pacing: ${result.estimatedPacing}
Core Vibe: ${result.vibeDescription}
Rec Transitions: ${result.editingRecommendations.transitions}
Rec Grading: ${result.editingRecommendations.colorGrading}
Additional Notes: ${additionalInfo || 'None'}`;

    onPlanApplied({
      service: serviceMap,
      projectType,
      summary: planSummary
    });

    setIsFormApplied(true);
    
    // Scroll to the booking form after a subtle delay
    setTimeout(() => {
      const formElement = document.getElementById('contact-booking-form-container');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 400);
  };

  const copyPlanToClipboard = () => {
    if (!result) return;
    const shareableText = `
*Asif Creative Edits - AI Consultation Report*
Concept Name: ${result.conceptName}
Vibe: ${result.vibeDescription}
Pacing: ${result.estimatedPacing}
Color Grading: ${result.editingRecommendations.colorGrading}
Transitions: ${result.editingRecommendations.transitions}
Audio Styling: ${result.editingRecommendations.audioTrack}
VFX: ${result.editingRecommendations.visualEffects}
Estimated Cost: ${result.estimatedPriceBracket}
    `;
    navigator.clipboard.writeText(shareableText.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="ai-planner-workspace" className="py-24 bg-[#0a0a0f] border-t border-zinc-900 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-full text-xs font-mono text-violet-400 uppercase font-semibold">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>AI Production Partner</span>
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            Consult the AI Editing Assistant
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Not sure what style, transitions, or pacing fits your footage? Outline your project goals below, and Asif's AI Creative engine will map out a custom editing strategy, storyboard cuts, and estimate the budget instantly!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Form Planner */}
          <div className="lg:col-span-5 bg-[#121319] border border-zinc-800/85 p-6 rounded-2xl shadow-xl">
            <h3 className="font-display font-bold text-xl text-white mb-6 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-teal-400" />
              <span>Project Blueprint</span>
            </h3>

            <form onSubmit={handleConsultSubmit} className="space-y-5">
              
              {/* Project Category */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase tracking-wide text-zinc-400">Project Format</label>
                <div className="grid grid-cols-2 gap-2">
                  {projectPresets.slice(0, 4).map((preset) => (
                    <button
                      type="button"
                      key={preset}
                      onClick={() => setProjectType(preset)}
                      className={`px-3 py-2 rounded-xl text-[11px] font-medium transition-all text-left truncate ${
                        projectType === preset
                          ? 'bg-violet-600/20 border-2 border-violet-500 text-white'
                          : 'bg-zinc-900 hover:bg-zinc-800/80 border border-zinc-800 text-zinc-400'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
                <div className="pt-1">
                  <select
                    value={projectPresets.includes(projectType) ? projectType : 'custom'}
                    onChange={(e) => {
                      if (e.target.value !== 'custom') {
                        setProjectType(e.target.value);
                      }
                    }}
                    className="w-full bg-zinc-950/70 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 outline-none focus:border-teal-400"
                  >
                    <option value="" disabled>Or choose more options...</option>
                    {projectPresets.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                    <option value="custom">✍️ Type Custom Format Specifics...</option>
                  </select>
                </div>
                {(!projectPresets.includes(projectType) || projectType === 'custom') && (
                  <input
                    type="text"
                    value={projectType === 'custom' ? '' : projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    placeholder="Enter custom project format (e.g. Real Estate Tour)"
                    className="w-full bg-zinc-950/70 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-zinc-200 outline-none focus:border-teal-400 mt-1.5"
                    required
                  />
                )}
              </div>

              {/* Vibe Profile */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase tracking-wide text-zinc-400">Editing Vibe / Color Mood</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full bg-zinc-950/70 border border-zinc-800 rounded-xl px-3.5 py-3 text-xs text-zinc-200 outline-none focus:border-teal-400"
                >
                  {tonePresets.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Estimated Duration */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase tracking-wide text-zinc-400 font-medium">Target Deliverable Length</label>
                <div className="grid grid-cols-2 gap-2">
                  {durationPresets.map((d) => (
                    <button
                      type="button"
                      key={d}
                      onClick={() => setDuration(d)}
                      className={`px-3 py-2.5 rounded-xl text-[11px] font-medium transition-all text-center ${
                        duration === d
                          ? 'bg-teal-500/10 border-2 border-teal-500/80 text-teal-400 font-semibold'
                          : 'bg-zinc-950/50 hover:bg-zinc-900 border border-zinc-800 text-zinc-400'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Briefing notes */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase tracking-wide text-zinc-400">Describe Raw Footage or Goals (Optional)</label>
                <textarea
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  placeholder="e.g., 'We shot GoPro 4K 60fps files in the snow, need a hype electronic beat, focus on intense action clips'"
                  className="w-full h-24 bg-zinc-950/70 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-zinc-200 outline-none focus:border-teal-400 resize-none font-sans"
                />
              </div>

              {/* Action Planner trigger */}
              <button
                type="submit"
                id="ai-consult-submit-button"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-teal-500 hover:opacity-95 text-white font-semibold text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:translate-y-[-1px] disabled:opacity-50 active:scale-95 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Mapping Production Grid...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-violet-200" />
                    <span>Generate Creative Blueprint</span>
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Right Column: Intelligent Result Display */}
          <div className="lg:col-span-7 bg-[#121319]/40 border border-zinc-800/60 rounded-2xl p-6 min-h-[450px] flex flex-col justify-between relative overflow-hidden">
            
            <AnimatePresence mode="wait">
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-[#121319]/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center space-y-4"
                >
                  <div className="relative">
                    <Loader2 className="w-10 h-10 text-teal-400 animate-spin" />
                    <Sparkles className="w-4 h-4 text-violet-400 absolute top-0 right-0 animate-ping" />
                  </div>
                  <div className="text-center">
                    <p className="font-display font-semibold text-white">Analyzing footage spec matrix...</p>
                    <p className="text-xs text-zinc-500 font-mono mt-1">Calling server-side Creative Director (Gemini)...</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {result ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="space-y-6 flex-1 flex flex-col justify-between"
              >
                {/* Result Header */}
                <div className="flex items-start justify-between border-b border-zinc-800/60 pb-4">
                  <div>
                    <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest block mb-0.5">Custom Concept Strategy</span>
                    <h4 className="font-display font-bold text-2xl text-white leading-tight">
                      {result.conceptName}
                    </h4>
                    <p className="text-xs text-zinc-400 font-mono mt-1 flex items-center gap-1.5">
                      <span>Pacing:</span>
                      <strong className="text-zinc-200 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                        {result.estimatedPacing}
                      </strong>
                    </p>
                  </div>
                  
                  {/* Share/Actions */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={copyPlanToClipboard}
                      className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-all hover:border-zinc-700"
                      title="Copy plan data"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => setResult(null)}
                      className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-all hover:border-zinc-700"
                      title="Reset assistant"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Vibe block */}
                <div className="p-4 rounded-xl bg-violet-600/5 border border-violet-500/10 text-zinc-300 text-xs sm:text-sm leading-relaxed">
                  <h5 className="text-[10px] font-mono uppercase tracking-wider text-violet-400 font-semibold mb-1">Visual Directive</h5>
                  {result.vibeDescription}
                </div>

                {/* Section tabs columns: Storyboard steps & Recommendations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Timeline story outline */}
                  <div className="space-y-3">
                    <h5 className="text-[10px] font-mono uppercase tracking-wider text-teal-400 font-semibold">Rough Timeline Blocks</h5>
                    <div className="space-y-3 font-sans">
                      {result.storyboardSteps.slice(0, 4).map((step, idx) => (
                        <div key={idx} className="relative pl-5 border-l border-zinc-800 pb-1">
                          <div className="absolute left-[-4.5px] top-1.5 w-2 h-2 rounded-full bg-teal-500" />
                          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-200">
                            <strong>{step.step}</strong>
                            <span className="text-zinc-500">{step.durationEstimate}</span>
                          </div>
                          <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">{step.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SPEC recommendations */}
                  <div className="space-y-3">
                    <h5 className="text-[10px] font-mono uppercase tracking-wider text-teal-400 font-semibold">Editing Spec Sheets</h5>
                    <div className="space-y-2 text-[11px] font-mono text-zinc-300">
                      <div className="p-2.5 rounded-lg bg-zinc-900/50 border border-zinc-800/80">
                        <span className="text-zinc-500 block text-[9px] uppercase">Luts & Palette Color:</span>
                        <span className="text-zinc-200">{result.editingRecommendations.colorGrading}</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-zinc-900/50 border border-zinc-800/80 font-mono">
                        <span className="text-zinc-500 block text-[9px] uppercase">Cut style & Transitions:</span>
                        <span className="text-zinc-200">{result.editingRecommendations.transitions}</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-zinc-900/50 border border-zinc-800/80">
                        <span className="text-zinc-500 block text-[9px] uppercase">Sound & SFX Beats:</span>
                        <span className="text-zinc-200">{result.editingRecommendations.audioTrack}</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Bottom cost/estimate and CTA apply */}
                <div className="border-t border-zinc-800/80 pt-4 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-[9px] font-mono text-zinc-500 uppercase block">Estimated Price Tier Bracket</span>
                    <strong className="text-lg text-teal-400 font-display">{result.estimatedPriceBracket}</strong>
                  </div>

                  <button
                    id="ai-apply-specs-button"
                    onClick={handleApplyToForm}
                    disabled={isFormApplied}
                    className={`w-full sm:w-auto px-5 py-3 rounded-xl font-semibold text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                      isFormApplied
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-teal-500 text-black hover:bg-teal-400 shadow-md shadow-teal-500/10'
                    }`}
                  >
                    {isFormApplied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Plan Applied to Form</span>
                      </>
                    ) : (
                      <>
                        <span>Apply Blueprint to Inquire</span>
                        <ArrowRight className="w-4 h-4 text-zinc-800" />
                      </>
                    )}
                  </button>
                </div>

              </motion.div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-5">
                <div className="w-16 h-16 rounded-full bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400 shadow-lg animate-pulse">
                  <Sparkles className="w-8 h-8" />
                </div>
                <div className="space-y-2 max-w-md">
                  <h4 className="font-display font-bold text-white text-lg">Your Spec Sheet is Ready to be Generated</h4>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                    Select your formats, desired color-grade vibe, and length in the blueprint planner, then click "Generate Creative Blueprint" to get real-time recommendations.
                  </p>
                </div>
                
                {/* Guided tooltips */}
                <div className="pt-4 flex items-center gap-2 text-zinc-500 text-xs font-mono">
                  <HelpCircle className="w-4 h-4 text-zinc-500" />
                  <span>Powered securely by the server-side Gemini 3.5 engine</span>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
