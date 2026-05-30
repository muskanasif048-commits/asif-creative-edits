/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Inquiry, InquiryStatus } from '../types';
import {
  ShieldAlert,
  Loader2,
  Trash2,
  CheckCircle,
  FileText,
  Badge,
  TrendingUp,
  RefreshCw,
  Mail,
  Phone,
  Calendar,
  Layers,
  Search,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AdminPortalProps {
  onRefreshTriggered: () => void;
  inquiriesChangeCount: number;
}

export default function AdminPortal({ onRefreshTriggered, inquiriesChangeCount }: AdminPortalProps) {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Selected inquiry edit state
  const [editingInquiryId, setEditingInquiryId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState<string>('');

  const fetchInquiries = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/inquiries');
      if (!response.ok) {
        throw new Error('Could not synchronize CRM storage from database server.');
      }
      const data = await response.json();
      const list = data.inquiries || [];
      setInquiries(list);
      // Also cache to localStorage for offline visual preservation
      localStorage.setItem('asif_creative_inquiries', JSON.stringify(list));
    } catch (err: any) {
      console.error('CRM fetch failure, loading from localStorage fallback:', err);
      setError('Database synchronization could not be reached. Local offline memory is active.');
      try {
        const localData = localStorage.getItem('asif_creative_inquiries');
        if (localData) {
          setInquiries(JSON.parse(localData));
        } else {
          // Initialize with premium demo items so she always gets a gorgeous presentation
          const defaultInquiries: Inquiry[] = [
            {
              id: 'iq_demo_1',
              name: 'Sarah Khan',
              email: 'sarah@canvasmedia.pk',
              phone: '+92 321 4567890',
              service: 'video_editing',
              projectType: 'YouTube Lifestyle/Vlog Cut',
              message: 'Assalam o alaikum! We need a consistent editor for our weekly travel and lifestyle vlogs. Needs clean cinematic flow, color grading, and mountain speed ramping.',
              status: 'Unread',
              createdAt: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hrs ago
              notes: 'Prefers moody teal & orange cinematic preset.'
            },
            {
              id: 'iq_demo_2',
              name: 'Daniyal Ahmed',
              email: 'daniyal@weddingfilms.com',
              phone: '+92 300 9876543',
              service: 'full_package',
              projectType: 'Hype Reel + Photo Retouches',
              message: 'Hi Asif, looking for high-end wedding portrait retouches and an energetic 1-min teaser for a signature wedding in Lahore. Please review the visual assets!',
              status: 'In Discussion',
              createdAt: new Date(Date.now() - 3600000 * 18).toISOString(), // 18 hrs ago
              notes: 'Sent quote estimate of $180-$280 based on AI consult plan.'
            }
          ];
          localStorage.setItem('asif_creative_inquiries', JSON.stringify(defaultInquiries));
          setInquiries(defaultInquiries);
        }
      } catch (innerErr) {
        console.error('Failed to parse fallback local storage inquiries:', innerErr);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [inquiriesChangeCount]);

  const handleUpdateStatus = async (id: string, newStatus: InquiryStatus) => {
    try {
      const response = await fetch(`/api/inquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) throw new Error('Failed updating status.');
      
      setInquiries(prev => {
        const updated = prev.map(item => item.id === id ? { ...item, status: newStatus } : item);
        localStorage.setItem('asif_creative_inquiries', JSON.stringify(updated));
        return updated;
      });
      onRefreshTriggered();
    } catch (err) {
      console.error('Update status API failed, running localStorage fallback:', err);
      setInquiries(prev => {
        const updated = prev.map(item => item.id === id ? { ...item, status: newStatus } : item);
        localStorage.setItem('asif_creative_inquiries', JSON.stringify(updated));
        return updated;
      });
      onRefreshTriggered();
    }
  };

  const handleSaveNotes = async (id: string) => {
    try {
      const response = await fetch(`/api/inquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: tempNotes })
      });

      if (!response.ok) throw new Error('Failed saving notes.');
      
      setInquiries(prev => {
        const updated = prev.map(item => item.id === id ? { ...item, notes: tempNotes } : item);
        localStorage.setItem('asif_creative_inquiries', JSON.stringify(updated));
        return updated;
      });
      setEditingInquiryId(null);
      setTempNotes('');
    } catch (err) {
      console.error('Save notes API failed, running localStorage fallback:', err);
      setInquiries(prev => {
        const updated = prev.map(item => item.id === id ? { ...item, notes: tempNotes } : item);
        localStorage.setItem('asif_creative_inquiries', JSON.stringify(updated));
        return updated;
      });
      setEditingInquiryId(null);
      setTempNotes('');
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this brief inquiry? This cannot be undone.')) return;
    
    try {
      const response = await fetch(`/api/inquiries/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete.');
      
      setInquiries(prev => {
        const updated = prev.filter(item => item.id !== id);
        localStorage.setItem('asif_creative_inquiries', JSON.stringify(updated));
        return updated;
      });
      onRefreshTriggered();
    } catch (err) {
      console.error('Delete API failed, running localStorage fallback:', err);
      setInquiries(prev => {
        const updated = prev.filter(item => item.id !== id);
        localStorage.setItem('asif_creative_inquiries', JSON.stringify(updated));
        return updated;
      });
      onRefreshTriggered();
    }
  };

  // Stats calculation
  const totalLeads = inquiries.length;
  const unreadCount = inquiries.filter(i => i.status === 'Unread').length;
  const bookedCount = inquiries.filter(i => i.status === 'Booked').length;
  const completedCount = inquiries.filter(i => i.status === 'Completed').length;

  const filteredInquiries = inquiries.filter(item => {
    const term = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(term) ||
      item.email.toLowerCase().includes(term) ||
      item.projectType.toLowerCase().includes(term) ||
      item.message.toLowerCase().includes(term)
    );
  });

  return (
    <div id="asif-crm-panel-section" className="py-12 bg-[#090a0f] min-h-[75vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* CRM Alert/Intro Block */}
        <div className="bg-[#121319] border border-zinc-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-full bg-gradient-to-l from-violet-600/5 to-transparent pointer-events-none" />
          
          <div className="space-y-1.5 z-10 max-w-xl">
            <div className="inline-flex items-center gap-1.5 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-full text-xs font-mono text-violet-400 uppercase font-semibold">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Studio Workspace CRM</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl text-white tracking-tight">
              Asif's Direct Bookings Desk
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Welcome, <strong className="text-white">Asif Rafiq</strong>. This is your client-inquiry dashboard. submissions sent from the contact tab appear here in real time. Use this to update work status, take technical project notes, or manage client interactions.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={fetchInquiries}
              className="px-4 py-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 rounded-xl text-xs font-mono transition-all flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh CRM Sync</span>
            </button>
          </div>
        </div>

        {/* Dashboard Indicator cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#121319] border border-zinc-800 rounded-2xl p-4.5 space-y-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Total Inquiries</span>
            <div className="flex items-baseline gap-2">
              <span className="font-display font-extrabold text-2xl text-white">{totalLeads}</span>
              <span className="text-[10px] font-mono text-emerald-400">Archived</span>
            </div>
          </div>

          <div className="bg-[#121319] border border-zinc-800 rounded-2xl p-4.5 space-y-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Unread Leads</span>
            <div className="flex items-baseline gap-2">
              <span className="font-display font-extrabold text-2xl text-violet-400">{unreadCount}</span>
              {unreadCount > 0 ? (
                <span className="text-[10px] font-mono text-violet-400 animate-pulse">Needs Action</span>
              ) : (
                <span className="text-[10px] font-mono text-zinc-500">All reviewed</span>
              )}
            </div>
          </div>

          <div className="bg-[#121319] border border-zinc-800 rounded-2xl p-4.5 space-y-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Booked Edits</span>
            <div className="flex items-baseline gap-2">
              <span className="font-display font-extrabold text-2xl text-teal-400">{bookedCount}</span>
              <span className="text-[10px] font-mono text-teal-400 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Active Work
              </span>
            </div>
          </div>

          <div className="bg-[#121319] border border-zinc-800 rounded-2xl p-4.5 space-y-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Completed</span>
            <div className="flex items-baseline gap-2">
              <span className="font-display font-extrabold text-2xl text-emerald-400">{completedCount}</span>
              <span className="text-[10px] font-mono text-zinc-400">Delivered</span>
            </div>
          </div>
        </div>

        {/* Search controls */}
        <div className="relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-zinc-500">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search inquiries by client name, email, project keywords..."
            className="w-full bg-[#121319] border border-zinc-800 rounded-xl pl-11 pr-4 py-3 text-xs text-zinc-200 outline-none focus:border-teal-400"
          />
        </div>

        {/* Table & List Directory */}
        <div className="bg-[#121319] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl relative">
          
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center space-y-3 font-mono text-zinc-500">
              <Loader2 className="w-8 h-8 text-teal-400 animate-spin" />
              <span className="text-xs">Synchronizing studio ledger...</span>
            </div>
          ) : filteredInquiries.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center space-y-3 text-center p-6">
              <AlertCircle className="w-10 h-10 text-zinc-600" />
              <div className="space-y-1 max-w-sm">
                <p className="font-display font-semibold text-white">No Lead Entries Found</p>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  No inquiries match the search or there have been no bookings sent yet. Try filling out the contact form yourself to see it stream here!
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto text-[11px] font-mono select-text">
              <table className="w-full text-left border-collapse">
                
                {/* Table Header */}
                <thead className="bg-[#0c0d12] border-b border-zinc-800 text-zinc-500 uppercase tracking-widest text-[9px] font-semibold h-12">
                  <tr>
                    <th className="px-6 py-3">Client details</th>
                    <th className="px-6 py-3">Service format</th>
                    <th className="px-6 py-3">Project brief / message</th>
                    <th className="px-6 py-3 text-center">Status</th>
                    <th className="px-6 py-3 text-center">Administrative Actions</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-zinc-800/80">
                  {filteredInquiries.map((inq) => {
                    const isNotesEditing = editingInquiryId === inq.id;
                    return (
                      <tr key={inq.id} className="hover:bg-zinc-800/20 transition-all">
                        
                        {/* Client column */}
                        <td className="px-6 py-5 whitespace-nowrap align-top space-y-1.5 max-w-[200px]">
                          <div>
                            <strong className="text-zinc-200 text-xs font-sans block">{inq.name}</strong>
                          </div>
                          <div className="space-y-1 text-zinc-400 text-[10px]">
                            <span className="flex items-center gap-1.5">
                              <Mail className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                              <span className="truncate" title={inq.email}>{inq.email}</span>
                            </span>
                            {inq.phone && (
                              <span className="flex items-center gap-1.5">
                                <Phone className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                                <span>{inq.phone}</span>
                              </span>
                            )}
                            <span className="flex items-center gap-1.5 text-zinc-500 text-[9px]">
                              <Calendar className="w-3.5 h-3.5 shrink-0" />
                              <span>{new Date(inq.createdAt).toLocaleString()}</span>
                            </span>
                          </div>
                        </td>

                        {/* Format category */}
                        <td className="px-6 py-5 align-top whitespace-nowrap space-y-1.5 max-w-[150px]">
                          <div>
                            <span className={`px-2 py-0.5 rounded text-[9px] font-semibold tracking-wider uppercase ${
                              inq.service === 'video_editing' ? 'bg-teal-500/10 text-teal-400' :
                              inq.service === 'photo_editing' ? 'bg-sky-500/10 text-sky-400' :
                              inq.service === 'full_package' ? 'bg-violet-500/10 text-violet-400' :
                              'bg-zinc-800 text-zinc-500'
                            }`}>
                              {inq.service.replace('_', ' ')}
                            </span>
                          </div>
                          <span className="block text-zinc-300 font-sans font-medium text-[11px] truncate max-w-xs">{inq.projectType}</span>
                        </td>

                        {/* Brief text & Work notes */}
                        <td className="px-6 py-5 align-top space-y-3 font-sans">
                          
                          {/* Client Message */}
                          <div className="bg-zinc-950/40 p-3 rounded-lg border border-zinc-800/80 max-w-sm sm:max-w-md">
                            <p className="text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap font-sans select-all">{inq.message}</p>
                          </div>

                          {/* Work Notes */}
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[9px] font-mono text-zinc-500 uppercase flex items-center gap-1">
                                <FileText className="w-3 h-3 text-zinc-500" />
                                <span>Asif's Edit Notes</span>
                              </span>
                              {!isNotesEditing && (
                                <button
                                  onClick={() => {
                                    setEditingInquiryId(inq.id);
                                    setTempNotes(inq.notes || '');
                                  }}
                                  className="text-[9px] font-mono text-teal-400 hover:underline"
                                >
                                  {inq.notes ? 'Edit Notes' : 'Add Work Notes'}
                                </button>
                              )}
                            </div>

                            {isNotesEditing ? (
                              <div className="flex gap-1.5 items-center">
                                <input
                                  type="text"
                                  value={tempNotes}
                                  onChange={(e) => setTempNotes(e.target.value)}
                                  placeholder="e.g. Quoted $200. Sent Rec709 lut drafts"
                                  className="flex-1 bg-zinc-950 border border-zinc-800 rounded px-2 py-1.5 text-xs text-zinc-200"
                                />
                                <button
                                  onClick={() => handleSaveNotes(inq.id)}
                                  className="px-2 py-1.5 bg-teal-500 text-black font-semibold rounded hover:bg-teal-400 transition-all font-mono"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditingInquiryId(null)}
                                  className="px-2 py-1.5 bg-zinc-900 border border-zinc-800 text-zinc-400 rounded hover:text-white transition-all font-mono"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              inq.notes ? (
                                <p className="text-[10px] text-zinc-400 font-mono italic bg-[#15161d] p-2 border border-zinc-850 rounded">
                                  {inq.notes}
                                </p>
                              ) : (
                                <span className="text-[9px] text-zinc-600 block pl-1 italic">No work notes yet. Click edit to log custom details.</span>
                              )
                            )}
                          </div>
                        </td>

                        {/* Status badging */}
                        <td className="px-6 py-5 align-top whitespace-nowrap text-center">
                          <select
                            value={inq.status}
                            onChange={(e) => handleUpdateStatus(inq.id, e.target.value as InquiryStatus)}
                            className={`px-3 py-1.5 bg-zinc-900 border rounded-lg text-[10px] font-mono text-center tracking-wider uppercase font-semibold cursor-pointer outline-none ${
                              inq.status === 'Unread' ? 'border-violet-500/30 text-violet-400 bg-violet-600/5' :
                              inq.status === 'In Discussion' ? 'border-amber-500/30 text-amber-400 bg-amber-600/5' :
                              inq.status === 'Booked' ? 'border-teal-500/30 text-teal-400 bg-teal-600/5' :
                              'border-emerald-500/30 text-emerald-400 bg-emerald-600/5'
                            }`}
                          >
                            <option value="Unread">⚠️ Unread</option>
                            <option value="In Discussion">🤝 Discussing</option>
                            <option value="Booked">🎬 Booked</option>
                            <option value="Completed">✅ Completed</option>
                          </select>
                        </td>

                        {/* Actions column */}
                        <td className="px-6 py-5 align-top whitespace-nowrap text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => handleDeleteInquiry(inq.id)}
                              className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                              title="Delete enquiry permanent"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
