import React, { useState } from 'react';
import {
  Compass,
  ArrowRight,
  Sparkles,
  Zap,
  LayoutDashboard,
  CheckCircle2,
  X,
  Play
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/ToastContext';

interface DemoGuideBannerProps {
  currentRoute: string;
  onRouteChange: (route: string) => void;
  onSelectDecision?: (decisionId: string) => void;
}

export const DemoGuideBanner: React.FC<DemoGuideBannerProps> = ({
  currentRoute,
  onRouteChange,
  onSelectDecision
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const { info } = useToast();

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 left-4 z-40 flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600/90 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-900/40 backdrop-blur transition-all cursor-pointer border border-blue-400/30"
      >
        <Compass className="w-3.5 h-3.5" />
        <span>Open 3-Min Demo Tour</span>
      </button>
    );
  }

  const steps = [
    {
      id: 'step-1',
      title: '1. Dashboard',
      subtitle: 'KPIs & Conflicts',
      icon: LayoutDashboard,
      action: () => onRouteChange('dashboard'),
      isActive: currentRoute === 'dashboard'
    },
    {
      id: 'step-2',
      title: '2. Decision Center',
      subtitle: 'Active Problem Pipeline',
      icon: Zap,
      action: () => onRouteChange('decision-center'),
      isActive: currentRoute === 'decision-center' && !currentRoute.startsWith('decisions/')
    },
    {
      id: 'step-3',
      title: '3. Decision Workspace',
      subtitle: 'Multi-Agent Evidence & Plan',
      icon: Play,
      action: () => {
        if (onSelectDecision) {
          onSelectDecision('DEC-2026-092');
        } else {
          onRouteChange('decisions/DEC-2026-092');
        }
      },
      isActive: currentRoute === 'decisions/DEC-2026-092'
    },
    {
      id: 'step-4',
      title: '4. What-If Simulator',
      subtitle: 'Explore Impact Scenarios',
      icon: Sparkles,
      action: () => onRouteChange('what-if'),
      isActive: currentRoute === 'what-if'
    }
  ];

  return (
    <div className="bg-gradient-to-r from-slate-900 via-blue-950/70 to-slate-900 border-b border-blue-900/40 px-4 py-2 flex items-center justify-between gap-4 text-xs select-none shrink-0 transition-all">
      <div className="flex items-center gap-2 text-slate-300 shrink-0">
        <div className="flex items-center justify-center w-5 h-5 rounded-md bg-blue-600/30 text-blue-400 border border-blue-500/30">
          <Compass className="w-3.5 h-3.5" />
        </div>
        <span className="font-semibold text-white">Recommended Demo Flow:</span>
        <span className="hidden xl:inline text-slate-400 text-[11px]">
          (3–5 min evaluation path showcasing the decision support paradigm)
        </span>
      </div>

      {/* Steps Pill Buttons */}
      <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-0.5">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <React.Fragment key={step.id}>
              <button
                onClick={step.action}
                className={cn(
                  'flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all font-medium whitespace-nowrap cursor-pointer',
                  step.isActive
                    ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-400'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white border border-slate-700/60'
                )}
              >
                <Icon className="w-3 h-3 shrink-0" />
                <span className="text-[11px]">{step.title}</span>
              </button>
              {idx < steps.length - 1 && (
                <ArrowRight className="w-3 h-3 text-slate-400 shrink-0 hidden sm:inline" />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Dismiss Button */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => setIsVisible(false)}
          className="text-slate-400 hover:text-slate-200 p-1 rounded hover:bg-slate-800 transition-colors"
          title="Minimize Demo Tour Banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
