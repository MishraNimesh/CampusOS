import React, { useState, useEffect } from 'react';
import {
  Search,
  Bell,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Info,
  ChevronDown,
  Cpu,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Drawer } from '@/components/ui/Drawer';
import { Button } from '@/components/ui/Button';
import { MOCK_NOTIFICATIONS, NotificationItem } from '@/data/mockData';
import { useToast } from '@/components/ui/ToastContext';

interface TopBarProps {
  onOpenSearch: () => void;
  onRouteChange: (route: string) => void;
  academicTerm: string;
  onTermChange: (term: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  onOpenSearch,
  onRouteChange,
  academicTerm,
  onTermChange
}) => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const [isTermMenuOpen, setIsTermMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { success } = useToast();

  // Live clock tick
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    success('Notifications marked as read', 'All alert badges cleared.');
  };

  const markItemAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleNotificationClick = (item: NotificationItem) => {
    markItemAsRead(item.id);
    setIsNotifOpen(false);
    if (item.actionPath) {
      if (item.actionPath.startsWith('/decisions/')) {
        onRouteChange('decision-center');
      } else {
        onRouteChange(item.actionPath.replace('/', ''));
      }
    }
  };

  const termOptions = [
    'AY 2026–27 • Odd Sem (Sem 5 & 7)',
    'AY 2026–27 • Even Sem (Upcoming)',
    'AY 2025–26 • Archived Records'
  ];

  return (
    <>
      <header className="h-16 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between gap-4 z-20 shrink-0 select-none">
        {/* Left Search Bar Trigger */}
        <div className="flex items-center gap-4 flex-1 max-w-xl">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-all group shadow-inner cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Search className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors" />
              <span className="truncate">Search campus data, faculty, rooms, or ask Campus OS...</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-medium text-slate-400 bg-slate-800 border border-slate-700 rounded">
                ⌘K
              </kbd>
            </div>
          </button>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Live Clock */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-60"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
            </span>
            <span className="text-white font-semibold tabular-nums">{formatTime(currentTime)}</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">{formatDate(currentTime)}</span>
          </div>
          {/* Active Agents Status Pill */}
          <button
            onClick={() => onRouteChange('agents')}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-950/40 border border-blue-800/40 hover:bg-blue-950/60 transition-all text-xs font-medium text-blue-300 group cursor-pointer"
            title="8 Specialized Agents Active & Monitoring Constraints"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Cpu className="w-3.5 h-3.5 text-blue-400 group-hover:rotate-12 transition-transform" />
            <span className="font-mono font-semibold">8 AGENTS ONLINE</span>
          </button>

          {/* Academic Term Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsTermMenuOpen(!isTermMenuOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-medium text-slate-200 transition-all cursor-pointer"
            >
              <span>{academicTerm}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isTermMenuOpen && (
              <div className="absolute right-0 mt-1.5 w-64 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl py-1 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                  Select Academic Session
                </div>
                {termOptions.map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      onTermChange(term);
                      setIsTermMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-slate-200 hover:bg-blue-600/20 hover:text-blue-300 transition-colors flex items-center justify-between"
                  >
                    <span>{term}</span>
                    {term === academicTerm && <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick What-If Simulator Trigger */}
          <button
            onClick={() => onRouteChange('what-if')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-950/40 border border-purple-800/40 hover:bg-purple-900/40 text-purple-300 text-xs font-medium transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>What-if Simulator</span>
          </button>

          {/* Notification Bell */}
          <button
            onClick={() => setIsNotifOpen(true)}
            className="relative p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all cursor-pointer"
            title="Open Operational Alerts"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-rose-500 rounded-full ring-2 ring-slate-950">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Notifications Drawer */}
      <Drawer
        isOpen={isNotifOpen}
        onClose={() => setIsNotifOpen(false)}
        title="Operational Alerts & Telemetry"
        description="Real-time multi-agent conflict alerts, capacity warnings, and status triggers."
        width="md"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs text-slate-400 font-medium">
              {unreadCount} unread operational alert{unreadCount !== 1 ? 's' : ''}
            </span>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors cursor-pointer"
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="space-y-2.5">
            {notifications.map((item) => {
              const icons = {
                high: <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />,
                medium: <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />,
                info: <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              };

              const badgeVariants = {
                high: 'danger' as const,
                medium: 'warning' as const,
                info: 'primary' as const
              };

              return (
                <div
                  key={item.id}
                  onClick={() => handleNotificationClick(item)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    item.read
                      ? 'bg-slate-900/50 border-slate-800/60 opacity-75 hover:opacity-100 hover:border-slate-700'
                      : 'bg-slate-900 border-slate-700/80 shadow-md hover:border-blue-500/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {icons[item.type]}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-xs font-semibold text-white truncate">{item.title}</span>
                        <Badge variant={badgeVariants[item.type]} size="sm">
                          {item.category}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{item.message}</p>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/60">
                        <span className="text-[10px] text-slate-400 font-mono">{item.timestamp}</span>
                        {item.decisionId && (
                          <span className="text-[11px] text-blue-400 font-medium flex items-center gap-1 hover:underline">
                            Open Decision <ArrowRight className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-900/30 text-xs text-slate-300">
            <div className="flex items-center gap-2 font-semibold text-blue-300 mb-1">
              <Cpu className="w-4 h-4 text-blue-400" />
              <span>Campus OS Sentinel Active</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Timetable, Faculty, and Infrastructure agents scan all scheduling changes continuously every 60 seconds.
            </p>
          </div>
        </div>
      </Drawer>
    </>
  );
};
