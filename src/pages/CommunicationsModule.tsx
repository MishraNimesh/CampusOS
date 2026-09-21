import React, { useState } from 'react';
import {
  Megaphone,
  Send,
  Plus,
  CheckCircle2,
  Calendar,
  Users,
  Search,
  AlertCircle,
  Mail,
  Bell
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/ToastContext';
import { MOCK_NOTICES } from '@/data/mockData';

interface CommunicationsModuleProps {
  onRouteChange: (route: string) => void;
}

export const CommunicationsModule: React.FC<CommunicationsModuleProps> = ({ onRouteChange }) => {
  const { success } = useToast();
  const [notices, setNotices] = useState(MOCK_NOTICES);
  const [searchTerm, setSearchTerm] = useState('');
  const [isComposeModalOpen, setIsComposeModalOpen] = useState(false);

  // Form
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeCategory, setNoticeCategory] = useState('Timetable');
  const [noticeTarget, setNoticeTarget] = useState('All CS & IT Students');
  const [noticeContent, setNoticeContent] = useState('');

  const filteredNotices = notices.filter(
    (n) =>
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePublishNotice = (e: React.FormEvent) => {
    e.preventDefault();
    const newNotice = {
      id: `notice-${Date.now()}`,
      title: noticeTitle,
      category: noticeCategory,
      date: 'Today',
      author: 'Office of the Dean',
      priority: 'High',
      content: noticeContent,
      target: noticeTarget
    };
    setNotices([newNotice, ...notices]);
    setIsComposeModalOpen(false);
    setNoticeTitle('');
    setNoticeContent('');
    success(
      'Circular Broadcasted',
      `Sent multi-channel notification to ${noticeTarget} via Campus OS Dispatch.`
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Communications & Broadcasts
            </h1>
            <Badge variant="primary" size="sm">
              Multi-Channel Dispatch
            </Badge>
          </div>
          <p className="text-sm text-slate-400">
            Publish official administrative circulars, schedule change broadcasts, and urgent alerts with verified audience routing.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="glow"
            size="sm"
            onClick={() => setIsComposeModalOpen(true)}
            className="text-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Compose Circular</span>
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
        <input
          type="text"
          placeholder="Search circulars, categories, or keywords..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Circulars List */}
      <div className="space-y-4">
        {filteredNotices.map((notice) => (
          <Card key={notice.id} className="p-5 sm:p-6 border-slate-800 bg-slate-900/80 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2.5 flex-wrap">
                <Badge variant={notice.priority === 'High' ? 'danger' : 'primary'} size="sm">
                  {notice.category}
                </Badge>
                <h3 className="text-sm sm:text-base font-bold text-white">{notice.title}</h3>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-400 font-mono shrink-0">
                <span>{notice.date}</span>
                <span>•</span>
                <span>By: {notice.author}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{notice.content}</p>

            <div className="flex items-center justify-between pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 font-mono">
                <Users className="w-3.5 h-3.5 text-blue-400" />
                <span>Target: {notice.target}</span>
              </div>
              <Badge variant="success" size="sm">
                Dispatched to Portal & App
              </Badge>
            </div>
          </Card>
        ))}
      </div>

      {/* Compose Circular Modal */}
      {isComposeModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setIsComposeModalOpen(false)}
          title="Compose Official Campus Circular"
          description="Draft and dispatch an authenticated broadcast to students and faculty."
          size="md"
        >
          <form onSubmit={handlePublishNotice} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Circular Title
              </label>
              <input
                type="text"
                required
                value={noticeTitle}
                onChange={(e) => setNoticeTitle(e.target.value)}
                placeholder="E.g., Lab 2 Rescheduling Notification for CS-A Practical Sessions"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Category</label>
                <select
                  value={noticeCategory}
                  onChange={(e) => setNoticeCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Timetable">Timetable & Labs</option>
                  <option value="Examinations">Examinations</option>
                  <option value="Placements">Placements</option>
                  <option value="Infrastructure">Infrastructure</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Audience Target</label>
                <select
                  value={noticeTarget}
                  onChange={(e) => setNoticeTarget(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="All CS & IT Students">All CS & IT Students</option>
                  <option value="CS-A Batch (42 Students)">CS-A Batch (42 Students)</option>
                  <option value="All Faculty Members">All Faculty Members</option>
                  <option value="Entire Campus Community">Entire Campus Community</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Message Body</label>
              <textarea
                rows={4}
                required
                value={noticeContent}
                onChange={(e) => setNoticeContent(e.target.value)}
                placeholder="Write circular details here..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <Button variant="outline" size="sm" type="button" onClick={() => setIsComposeModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="glow" size="sm" type="submit">
                <Send className="w-3.5 h-3.5" />
                <span>Broadcast Circular</span>
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
