import React from 'react';
import {
  LayoutDashboard,
  Zap,
  Sparkles,
  Bot,
  GraduationCap,
  Users,
  Calendar,
  Building2,
  FileSpreadsheet,
  Briefcase,
  Megaphone,
  BarChart3,
  History,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/ToastContext';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string | number;
  badgeVariant?: 'primary' | 'warning' | 'danger' | 'purple' | 'neutral';
}

interface SidebarProps {
  currentRoute: string;
  onRouteChange: (route: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentRoute,
  onRouteChange,
  isCollapsed,
  onToggleCollapse
}) => {
  const { info } = useToast();

  const mainNavItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'decision-center', label: 'Decision Center', icon: Zap, badge: '2 Ready', badgeVariant: 'primary' },
    { id: 'what-if', label: 'What-if Simulator', icon: Sparkles, badge: 'New', badgeVariant: 'purple' },
    { id: 'agents', label: 'Monitoring', icon: Bot, badge: '8 Active', badgeVariant: 'neutral' },
    { id: 'academic', label: 'Academic', icon: GraduationCap },
    { id: 'faculty', label: 'Faculty Workload', icon: Users, badge: '2 Overload', badgeVariant: 'warning' },
    { id: 'timetable', label: 'Timetable', icon: Calendar, badge: '1 Conflict', badgeVariant: 'danger' },
    { id: 'infrastructure', label: 'Infrastructure', icon: Building2 },
    { id: 'examinations', label: 'Examinations', icon: FileSpreadsheet, badge: '1 Alert', badgeVariant: 'danger' },
    { id: 'placements', label: 'Placements', icon: Briefcase },
    { id: 'communications', label: 'Communications', icon: Megaphone },
    { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
    { id: 'decision-history', label: 'Decision History', icon: History }
  ];

  const badgeStyles = {
    primary: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
    warning: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
    danger: 'bg-rose-500/20 text-rose-300 border border-rose-500/30',
    purple: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
    neutral: 'bg-slate-800 text-slate-300 border border-slate-700'
  };

  return (
    <aside
      className={cn(
        'relative flex flex-col h-full bg-slate-950 border-r border-slate-800/80 transition-all duration-300 select-none z-30 shrink-0',
        isCollapsed ? 'w-[72px]' : 'w-[264px]'
      )}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800/80 bg-slate-950/60">
        {!isCollapsed ? (
          <div className="flex items-center gap-3 overflow-hidden cursor-pointer" onClick={() => onRouteChange('dashboard')}>
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-600 text-white shadow-md shrink-0 ring-1 ring-white/20">
              <Zap className="w-5 h-5 fill-white text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-wider text-white font-mono">CAMPUS<span className="text-blue-400">OS</span></span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 font-semibold border border-blue-500/30">OPS</span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium tracking-tight truncate">Campus operations desk</span>
            </div>
          </div>
        ) : (
          <div className="mx-auto cursor-pointer" onClick={() => onRouteChange('dashboard')}>
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-600 text-white shadow-md">
              <Zap className="w-5 h-5 fill-white" />
            </div>
          </div>
        )}

        {/* Collapse Toggle */}
        <button
          onClick={onToggleCollapse}
          className={cn(
            'hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer',
            isCollapsed && 'absolute -right-3.5 top-5 bg-slate-900 border border-slate-700 shadow-md text-slate-300 z-40'
          )}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
        {!isCollapsed && (
          <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Operations & Planning
          </div>
        )}

        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentRoute === item.id || (item.id === 'decision-center' && currentRoute.startsWith('decisions/'));

          return (
            <button
              key={item.id}
              onClick={() => onRouteChange(item.id)}
              className={cn(
             'w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all group cursor-pointer relative',
                isActive
                  ? 'bg-blue-600/15 text-blue-400 font-semibold border border-blue-500/30 shadow-sm shadow-blue-950'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80',
                isCollapsed && 'justify-center px-0 py-2.5'
              )}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon
                className={cn(
                  'w-4 h-4 shrink-0 transition-transform group-hover:scale-110',
                  isActive ? 'text-blue-400' : 'text-slate-400 group-hover:text-slate-200'
                )}
              />

              {!isCollapsed && (
                <>
                  <span className="truncate flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span
                      className={cn(
                         'text-[10px] px-2 py-0.5 rounded-sm font-medium shrink-0',
                        badgeStyles[item.badgeVariant || 'neutral']
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </>
              )}

              {isCollapsed && item.badge && (
                <span className="absolute top-1.5 right-2 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-slate-950" />
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom User / Institution Section */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/80 space-y-2 shrink-0">
        {!isCollapsed ? (
          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/80 flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center text-white font-bold text-sm shadow">
                RS
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-slate-900" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-white truncate">Mr. R. K. Sharma</span>
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              </div>
              <p className="text-[11px] text-slate-400 truncate">Dean of Operations</p>
              <p className="text-[10px] text-slate-400 truncate font-mono">VIT Pune • Autonomous</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center text-white font-bold text-sm shadow">
              RS
            </div>
          </div>
        )}

        {/* Quick Settings / Logout footer buttons */}
        {!isCollapsed && (
          <div className="flex items-center justify-between px-1 pt-1 text-xs text-slate-400">
            <button
              onClick={() => onRouteChange('settings')}
              className={cn(
                'flex items-center gap-1.5 hover:text-slate-200 transition-colors py-1 px-1.5 rounded hover:bg-slate-900 cursor-pointer',
                currentRoute === 'settings' && 'text-blue-400 font-semibold'
              )}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Settings</span>
            </button>
            <button
              onClick={() => info('Logout simulation', 'Demo session preserved. Click anytime to switch administrator roles.')}
              className="flex items-center gap-1 hover:text-rose-400 transition-colors py-1 px-1.5 rounded hover:bg-slate-900 cursor-pointer text-slate-400"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
