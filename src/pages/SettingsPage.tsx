import React, { useState } from 'react';
import {
  Settings,
  ShieldCheck,
  User,
  Sliders,
  Bell,
  Cpu,
  Save,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/ToastContext';

interface SettingsPageProps {
  onRouteChange: (route: string) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ onRouteChange }) => {
  const { success } = useToast();

  const [activeRole, setActiveRole] = useState('Dean of Operations / IT Admin');
  const [maxFacultyHours, setMaxFacultyHours] = useState('18');
  const [minLabHours, setMinLabHours] = useState('36');
  const [examSpacingMeters, setExamSpacingMeters] = useState('1.5');
  const [autoDispatchNotices, setAutoDispatchNotices] = useState(true);
  const [agentSensitivity, setAgentSensitivity] = useState('High (Zero Hard Violations)');

  const roles = [
    'Dean of Operations / IT Admin',
    'Principal / Director',
    'Head of Department (CSE)',
    'Controller of Examinations',
    'Placement Officer'
  ];

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    success(
      'System Configuration Saved',
      'Multi-Agent constraint rules and administrative thresholds have been updated across the campus swarm.'
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Platform & Swarm Settings
            </h1>
            <Badge variant="primary" size="sm">
              Enterprise v2.4
            </Badge>
          </div>
          <p className="text-sm text-slate-400">
            Configure institutional compliance thresholds, agent sensitivity levels, and administrator role emulation.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="glow"
            size="sm"
            onClick={handleSaveSettings}
            className="text-xs"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Preferences</span>
          </Button>
        </div>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Active Role Persona Switcher */}
        <Card className="border-slate-800 bg-slate-900/80 p-5 sm:p-6 space-y-4">
          <div>
            <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
              <User className="w-4 h-4 text-blue-400" />
              <span>Active Persona Switcher (Demo Emulation)</span>
            </CardTitle>
            <CardDescription className="text-xs text-slate-400">
              Switch the active administrative persona to test permissions and tailored decision workflows
            </CardDescription>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {roles.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => {
                  setActiveRole(r);
                  success('Persona Switched', `Logged in as ${r}.`);
                }}
                className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                  activeRole === r
                    ? 'border-blue-500 bg-blue-950/40 text-blue-300 shadow-md'
                    : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <div className="truncate">{r}</div>
                {activeRole === r && (
                  <span className="text-[10px] text-blue-400 font-mono block mt-1">Active Role</span>
                )}
              </button>
            ))}
          </div>
        </Card>

        {/* Multi-Agent Constraint Engine Parameters */}
        <Card className="border-slate-800 bg-slate-900/80 p-5 sm:p-6 space-y-5">
          <div>
            <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-400" />
              <span>Multi-Agent Constraint & Accreditation Guidelines</span>
            </CardTitle>
            <CardDescription className="text-xs text-slate-400">
              Institutional thresholds enforced during automated timetable and workload resolution
            </CardDescription>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Faculty Weekly Teaching Limit (Hours)
              </label>
              <input
                type="number"
                value={maxFacultyHours}
                onChange={(e) => setMaxFacultyHours(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">UGC standard: 18 hours/week</span>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Mandatory Practical Lab Hours / Sem
              </label>
              <input
                type="number"
                value={minLabHours}
                onChange={(e) => setMinLabHours(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Accreditation minimum contact hours</span>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Exam Anti-Cheating Spacing (Meters)
              </label>
              <input
                type="number"
                step="0.1"
                value={examSpacingMeters}
                onChange={(e) => setExamSpacingMeters(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Minimum desk-to-desk spacing in examination halls</span>
            </div>
          </div>

          <div className="pt-2">
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Agent Conflict Sensitivity Level
            </label>
            <select
              value={agentSensitivity}
              onChange={(e) => setAgentSensitivity(e.target.value)}
              className="w-full max-w-md bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
            >
              <option value="High (Zero Hard Violations)">High (Zero Hard Violations Enforced)</option>
              <option value="Balanced (Allows soft relaxation)">Balanced (Allows soft relaxation with warning)</option>
              <option value="Lenient">Lenient (Focus on room throughput)</option>
            </select>
          </div>
        </Card>

        {/* Institution Info */}
        <Card className="border-slate-800 bg-slate-900/80 p-5 sm:p-6 space-y-3">
          <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Campus Profile & Accreditation Metadata</span>
          </CardTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Institution Name</span>
              <span className="font-bold text-white">Vivekananda Institute of Technology & Operations</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Affiliation & Status</span>
              <span className="font-bold text-white">Autonomous • NAAC A++ Accredited</span>
            </div>
          </div>
        </Card>
      </form>
    </div>
  );
};
