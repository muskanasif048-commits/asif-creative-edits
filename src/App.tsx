/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import AIConsultant from './components/AIConsultant';
import ContactForm from './components/ContactForm';
import AdminPortal from './components/AdminPortal';
import Footer from './components/Footer';
import { Film, Sparkles, Send, ShieldAlert, CheckCircle, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  
  // Prefill states shared between AI consult planner and Booking Form
  const [preFilledService, setPreFilledService] = useState<string>('');
  const [preFilledProjectType, setPreFilledProjectType] = useState<string>('');
  const [preFilledMessage, setPreFilledMessage] = useState<string>('');
  
  // Synchronizer count to trigger CRM list reload
  const [inquiriesChangeCount, setInquiriesChangeCount] = useState<number>(0);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  // Sync unread numbers from database server
  const fetchUnreadCount = async () => {
    try {
      const response = await fetch('/api/inquiries');
      if (response.ok) {
        const data = await response.json();
        const unreads = (data.inquiries || []).filter((i: any) => i.status === 'Unread').length;
        setUnreadCount(unreads);
      }
    } catch (err) {
      console.error('Quietly unable to fetch unreads:', err);
    }
  };

  useEffect(() => {
    fetchUnreadCount();
  }, [inquiriesChangeCount]);

  const handleApplyAIPlan = (plan: { service: string; projectType: string; summary: string }) => {
    setPreFilledService(plan.service);
    setPreFilledProjectType(plan.projectType);
    setPreFilledMessage(plan.summary);
    
    // Switch to contact tab to let them review
    setActiveTab('contact');
  };

  const handleInquirySubmitted = () => {
    // Notify updates
    setInquiriesChangeCount(prev => prev + 1);
    
    // Clear prefilled states after successful submission
    setPreFilledService('');
    setPreFilledProjectType('');
    setPreFilledMessage('');
  };

  return (
    <div id="asif-creative-edits-app" className="min-h-screen bg-[#07080c] text-zinc-100 selection:bg-teal-500/20 selection:text-teal-300">
      
      {/* Universal Sticky Glassmorphic Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isAdminMode={isAdminMode}
        setIsAdminMode={setIsAdminMode}
        unreadCount={unreadCount}
      />

      <AnimatePresence mode="wait">
        {isAdminMode ? (
          
          /* ASIF'S WORKSPACE CRM PORTAL */
          <motion.div
            key="admin-desktop"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <AdminPortal
              inquiriesChangeCount={inquiriesChangeCount}
              onRefreshTriggered={() => setInquiriesChangeCount(prev => prev + 1)}
            />
          </motion.div>
          
        ) : (
          
          /* CLIENT-FACING SEO PORTFOLIO */
          <motion.div
            key="client-portal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-0"
          >
            {/* Multi-Section Stack representing a pristine SPA viewport */}
            {activeTab === 'home' && (
              <>
                <Hero
                  onPlanClick={() => setActiveTab('consultation')}
                  onBookClick={() => setActiveTab('contact')}
                />
                <Portfolio />
                <AIConsultant onPlanApplied={handleApplyAIPlan} />
                <ContactForm
                  preFilledService={preFilledService}
                  preFilledProjectType={preFilledProjectType}
                  preFilledMessage={preFilledMessage}
                  onInquirySubmitted={handleInquirySubmitted}
                />
              </>
            )}

            {activeTab === 'portfolio' && (
              <Portfolio />
            )}

            {activeTab === 'pricing' && (
              <ContactForm
                preFilledService={preFilledService}
                preFilledProjectType={preFilledProjectType}
                preFilledMessage={preFilledMessage}
                onInquirySubmitted={handleInquirySubmitted}
              />
            )}

            {activeTab === 'consultation' && (
              <AIConsultant onPlanApplied={handleApplyAIPlan} />
            )}

            {activeTab === 'contact' && (
              <ContactForm
                preFilledService={preFilledService}
                preFilledProjectType={preFilledProjectType}
                preFilledMessage={preFilledMessage}
                onInquirySubmitted={handleInquirySubmitted}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive, SEO-Ready Studio Footer */}
      <Footer
        onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onAdminToggle={() => {
          setIsAdminMode(!isAdminMode);
          setActiveTab(isAdminMode ? 'home' : '');
        }}
        isAdminMode={isAdminMode}
      />

    </div>
  );
}
