/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Mail, Phone, Clock, Send, CheckCircle, HelpCircle, Package, Film, Camera, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ContactFormProps {
  preFilledService: string;
  preFilledProjectType: string;
  preFilledMessage: string;
  onInquirySubmitted: () => void;
}

export default function ContactForm({
  preFilledService,
  preFilledProjectType,
  preFilledMessage,
  onInquirySubmitted
}: ContactFormProps) {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [service, setService] = useState<string>('video_editing');
  const [projectType, setProjectType] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Hook sync for pre-filled data applied by AI Planner
  useEffect(() => {
    if (preFilledService) setService(preFilledService);
    if (preFilledProjectType) setProjectType(preFilledProjectType);
    if (preFilledMessage) setMessage(preFilledMessage);
  }, [preFilledService, preFilledProjectType, preFilledMessage]);

  // Packages Array for Visual Reference Click
  const packages = [
    {
      id: 'video_editing',
      name: 'Cinematic Video Cut',
      price: 'From $10',
      description: 'Perfect for YouTube, documentaries, vlogs, and cinematic films.',
      icon: Film,
      features: ['Full color grading', 'Audio sound design SFX', 'Rough cut to final rendering', 'DaVinci Resolve / Premiere Pro']
    },
    {
      id: 'photo_editing',
      name: 'Editorial Retouching',
      price: 'From $20',
      description: 'Portraits, streetwear sessions, weddings, and commercial sets.',
      icon: Camera,
      features: ['Frequency separation skin care', 'Targeted dodge & burn', 'Colors & light relighting', 'Photoshop RAW / Lightroom']
    },
    {
      id: 'full_package',
      name: 'Creative Direct Package',
      price: 'From $40',
      description: 'All-inclusive photo retouching and matching cinematic high-energy reel.',
      icon: Zap,
      features: ['Up to 5 video social cuts', '30 fully graded still Retenches', 'Priority 48hr delivery draft', 'Storyboarding consulting draft']
    }
  ];

  const handlePackageSelect = (pkgId: string) => {
    setService(pkgId);
    let autoProject = '';
    if (pkgId === 'video_editing') autoProject = 'Vlog Edit / YT cut';
    if (pkgId === 'photo_editing') autoProject = 'Portrait retouch session';
    if (pkgId === 'full_package') autoProject = 'Hype Reel + Photo Retouches';
    setProjectType(autoProject);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const newInquiry = {
      id: 'iq_' + Date.now().toString(),
      name,
      email,
      phone,
      service,
      projectType,
      message,
      status: 'Unread',
      createdAt: new Date().toISOString()
    };

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newInquiry)
      });

      if (!response.ok) {
        throw new Error('Server issues arose. Please try again.');
      }

      setSubmitSuccess(true);
      onInquirySubmitted();
      
      // Clear Form state
      setName('');
      setEmail('');
      setPhone('');
      setProjectType('');
      setMessage('');
    } catch (err: any) {
      console.error('Submission error, carrying out LocalStorage fallback persistence:', err);
      try {
        const stored = localStorage.getItem('asif_creative_inquiries');
        const currentList = stored ? JSON.parse(stored) : [];
        currentList.unshift(newInquiry);
        localStorage.setItem('asif_creative_inquiries', JSON.stringify(currentList));
      } catch (innerErr) {
        console.error('Failed storing inquiry locally:', innerErr);
      }

      setSubmitSuccess(true);
      onInquirySubmitted();
      
      // Clear Form  state
      setName('');
      setEmail('');
      setPhone('');
      setProjectType('');
      setMessage('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-booking-form-container" className="py-24 bg-[#0c0d12] border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono tracking-widest text-teal-400 uppercase font-bold">Secure Your Booking</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Book Services & Pricing
          </h2>
          <p className="text-zinc-400 text-sm">
            Select a package below to load it directly into the contact blueprint, then send Asif Rafiq your creative specs. Let's make something amazing.
          </p>
        </div>

        {/* Dynamic Package Click cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {packages.map((pkg) => {
            const IconComponent = pkg.icon;
            const isSelected = service === pkg.id;
            return (
              <div
                key={pkg.id}
                id={`package-ref-${pkg.id}`}
                onClick={() => handlePackageSelect(pkg.id)}
                className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-br from-[#1b1c24] to-[#121319] border-teal-500 shadow-xl shadow-teal-500/5 translate-y-[-2px]'
                    : 'bg-[#121319]/40 border-zinc-800/80 hover:border-zinc-700/60 hover:bg-[#121319]/60'
                }`}
              >
                {isSelected && (
                  <span className="absolute top-4 right-4 bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Selected
                  </span>
                )}
                
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isSelected ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20' : 'bg-zinc-800 text-zinc-400'}`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono font-medium text-zinc-400 uppercase tracking-wide">Asif's Tier</span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-white mb-1">{pkg.name}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">{pkg.description}</p>
                  
                  <div className="text-teal-400 font-display font-extrabold text-lg mb-4">{pkg.price}</div>

                  <ul className="space-y-2 border-t border-zinc-800/60 pt-4 text-xs text-zinc-400">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-5">
                  <button
                    type="button"
                    className={`w-full py-2 rounded-xl text-xs font-semibold tracking-wide uppercase transition-all ${
                      isSelected
                        ? 'bg-teal-500 text-black'
                        : 'bg-zinc-900 text-zinc-300 border border-zinc-800 hover:bg-zinc-800 hover:text-white'
                    }`}
                  >
                    {isSelected ? 'Loaded in Form' : 'Select Package'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Form Details */}
        <div className="max-w-4xl mx-auto bg-[#121319] border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left info column */}
          <div className="lg:col-span-5 bg-[#090a0f] p-8 flex flex-col justify-between border-r border-zinc-800/80">
            <div className="space-y-6">
              <h3 className="font-display font-bold text-xl text-white">Direct Creative Desk</h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                Looking for speed, elite coloring accuracy, and clear communication? Fill the details or pre-apply from the AI consultant, and I’ll provide a bespoke quote and timeline estimate within 24 hours.
              </p>

              <div className="space-y-4 pt-4 font-mono text-xs text-zinc-300">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-teal-400">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="block text-[9px] text-zinc-500 uppercase">Direct Email</span>
                    <span>muhammadasifrafique446@gmail.com</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-teal-400">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="block text-[9px] text-zinc-500 uppercase">WhatsApp Inquiry</span>
                    <span className="text-teal-400 font-semibold">03016486875</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-teal-400">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="block text-[9px] text-zinc-500 uppercase">Average First Draft</span>
                    <span>48 Hours Guaranteed</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-zinc-900/60 text-center lg:text-left text-[11px] text-zinc-500 font-mono">
              <span>Asif Rafiq © 2026. Worldwide Digital Editing operations.</span>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7 p-8">
            <AnimatePresence mode="wait">
              {submitSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-lg">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <div className="space-y-1.5 max-w-md">
                    <h4 className="font-display font-bold text-white text-xl">Booking Ticket Received!</h4>
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                      Thank you for submitting your creative brief. Asif has received your request and will review the specifications (including any AI consulting drafts you preloaded). Keep an eye on your inbox/WhatsApp!
                    </p>
                  </div>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="mt-6 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 hover:text-white transition-all font-mono"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="booking-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleFormSubmit}
                  className="space-y-4 text-xs font-medium"
                >
                  <h4 className="font-display font-semibold text-white text-base mb-4">Project Brief submission</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">FullName</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Samantha Miller"
                        className="w-full bg-zinc-950/80 border border-zinc-800 rounded-lg px-3 py-2.5 text-zinc-200 outline-none focus:border-teal-400"
                        required
                      />
                    </div>
                    {/* Email */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">EmailAddress</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="samantha@luminafilm.com"
                        className="w-full bg-zinc-950/80 border border-zinc-800 rounded-lg px-3 py-2.5 text-zinc-200 outline-none focus:border-teal-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 234-5678"
                        className="w-full bg-zinc-950/80 border border-zinc-800 rounded-lg px-3 py-2.5 text-zinc-200 outline-none focus:border-teal-400"
                      />
                    </div>
                    {/* Service mapping type */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">Requested Service</label>
                      <select
                        value={service}
                        onChange={(e) => handlePackageSelect(e.target.value)}
                        className="w-full bg-zinc-950/80 border border-zinc-800 rounded-lg px-3 py-2.5 text-zinc-200 outline-none focus:border-teal-400"
                      >
                        <option value="video_editing">Cinematic Video Cut</option>
                        <option value="photo_editing">Editorial Retouching</option>
                        <option value="full_package">Creative Direct Package</option>
                        <option value="other">Other Collaboration</option>
                      </select>
                    </div>
                  </div>

                  {/* Project Specific format */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">Project Type details</label>
                    <input
                      type="text"
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      placeholder="e.g. Cinematic travel reel, streetwear shoot"
                      className="w-full bg-zinc-950/80 border border-zinc-800 rounded-lg px-3 py-2.5 text-zinc-200 outline-none focus:border-teal-400"
                      required
                    />
                  </div>

                  {/* Message brief */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">Creative specs message</label>
                      {preFilledMessage && (
                        <span className="text-[9px] font-mono text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded uppercase">
                          AI Plan Applied
                        </span>
                      )}
                    </div>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell Asif about the footage you have, references edits you like, timeline goals..."
                      className="w-full h-32 bg-zinc-950/80 border border-zinc-800 rounded-lg px-3 py-2.5 text-zinc-200 outline-none focus:border-teal-400 resize-none font-sans"
                      required
                    />
                  </div>

                  {/* Submit state */}
                  <button
                    type="submit"
                    id="booking-brief-submit-button"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-black font-semibold uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Submitting Brief Ticket...' : 'Send Booking Brief Ticket'}</span>
                  </button>

                  <div className="pt-2 flex items-center gap-1.5 justify-center text-[10px] text-zinc-500 font-mono">
                    <Zap className="w-3.5 h-3.5 text-teal-400" />
                    <span>Your data is archived instantly for Asif Rafiq's CRM preview</span>
                  </div>

                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
