import React, { useState } from 'react';
import {
  Sparkles,
  Play,
  RotateCcw,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Users,
  Building2,
  Calendar,
  Layers,
  BarChart3,
  Cpu,
  Zap,
  Sliders
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Legend,
  CartesianGrid
} from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/ToastContext';
import { WHAT_IF_PRESETS } from '@/data/mockData';

interface WhatIfSimulatorProps {
  onRouteChange: (route: string) => void;
  onSelectDecision: (decisionId: string) => void;
}

export const WhatIfSimulator: React.FC<WhatIfSimulatorProps> = ({
  onRouteChange,
  onSelectDecision
}) => {
  const { success, info } = useToast();
  const [selectedPresetId, setSelectedPresetId] = useState(WHAT_IF_PRESETS[0].id);

  // Form controls
  const [selectedResource, setSelectedResource] = useState('Lab 3 (Advanced Computing Lab)');
  const [selectedDuration, setSelectedDuration] = useState('20–24 Sep (5 Days)');
  const [selectedDept, setSelectedDept] = useState('Computer Engineering');
  const [simulationDepth, setSimulationDepth] = useState<'Standard' | 'Deep (Cross-Department)'>('Deep (Cross-Department)');

  const [isSimulating, setIsSimulating] = useState(false);
  const [hasSimulated, setHasSimulated] = useState(true);

  const activePreset = WHAT_IF_PRESETS.find((p) => p.id === selectedPresetId) || WHAT_IF_PRESETS[0];

  const handleSelectPreset = (preset: typeof WHAT_IF_PRESETS[0]) => {
    setSelectedPresetId(preset.id);
    setSelectedResource(preset.resource);
    setSelectedDuration(preset.duration);
    setSelectedDept(preset.departments[0]);
    setHasSimulated(true);
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setHasSimulated(true);
      success(
        'Simulation Complete',
        `Evaluated 320 timetable permutations against ${selectedResource}. 0 deadlocks.`
      );
    }, 600);
  };

  const handleConvertToDecision = () => {
    success(
      'Decision Draft Created',
      `Converted scenario "${activePreset.title}" into Decision Center workspace.`
    );
    onSelectDecision('DEC-2026-092');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              What-if Simulator
            </h1>
            <Badge variant="purple" size="sm">
              Predictive Multi-Agent Sandbox
            </Badge>
          </div>
          <p className="text-sm text-slate-400">
            Explore the cascading operational impact of resource outages, faculty leaves, or batch expansions before implementing changes.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleRunSimulation()}
            className="text-xs border-slate-700 text-slate-300"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Simulation</span>
          </Button>

          <Button
            variant="glow"
            size="sm"
            onClick={handleRunSimulation}
            isLoading={isSimulating}
            className="text-xs bg-blue-600 text-white hover:bg-blue-500 shadow-md shadow-blue-900/30 focus:ring-blue-500 border border-blue-500/30"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Simulate Impact</span>
          </Button>
        </div>
      </div>

      {/* Preset Scenarios Selector Bar */}
      <div>
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Preset Operational Scenarios</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {WHAT_IF_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset)}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                selectedPresetId === preset.id
                  ? 'border-purple-500/60 bg-purple-950/20 shadow-lg shadow-purple-950/20'
                  : 'border-slate-800 bg-slate-900/60 hover:bg-slate-800/60 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs font-bold text-white leading-snug">{preset.title}</span>
                  {selectedPresetId === preset.id && (
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                  )}
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
                  {preset.description}
                </p>
              </div>
              <div className="flex items-center gap-2 mt-3 pt-2 border-t border-slate-800/80 text-[10px] font-mono text-slate-400">
                <span>{preset.duration}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Scenario Builder Form Controls */}
      <Card className="border-slate-800 bg-slate-900/80">
        <CardHeader className="pb-3 border-b border-slate-800/80">
          <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-purple-400" />
            <span>Scenario Parameter Controls</span>
          </CardTitle>
          <CardDescription className="text-xs text-slate-400">
            Customize target resources, outage durations, and affected departments
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Target Resource / Factor
              </label>
              <select
                value={selectedResource}
                onChange={(e) => setSelectedResource(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                <option value="Lab 3 (Advanced Computing Lab)">Lab 3 (Advanced Computing Lab)</option>
                <option value="Lab 2 (Software Engineering Lab)">Lab 2 (Software Engineering Lab)</option>
                <option value="Hall B204 (Lecture Theatre)">Hall B204 (Lecture Theatre)</option>
                <option value="Dr. Amit Mehta & Prof. Neha Kulkarni">Faculty: Dr. Mehta & Prof. Kulkarni</option>
                <option value="Batch Intake Expansion (+15%)">Batch Intake Expansion (+15%)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Duration / Schedule Window
              </label>
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                <option value="20–24 Sep (5 Days)">20–24 Sep (5 Working Days)</option>
                <option value="1 Day Flash Outage">1 Day Flash Outage (Wednesday)</option>
                <option value="Full Semester Window">Entire Semester Window</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Affected Department Scope
              </label>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                <option value="Computer Engineering">Computer Engineering</option>
                <option value="Information Technology">Information Technology</option>
                <option value="All Engineering Departments">All Engineering Departments</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Simulation Depth
              </label>
              <select
                value={simulationDepth}
                onChange={(e) => setSimulationDepth(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                <option value="Deep (Cross-Department)">Deep (Cross-Department Multi-Agent)</option>
                <option value="Standard">Standard Local Scope</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Simulation Results Output */}
      {hasSimulated && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Top Impact Summary Numbers */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-purple-400" />
                <span>Simulated Operational Impact Summary</span>
              </h3>
              <Badge variant="purple" size="sm">
                Computed in 180ms
              </Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
                <div className="text-3xl font-black text-rose-400 font-mono">
                  {activePreset.results.affectedClasses}
                </div>
                <div className="text-xs text-slate-300 mt-1 font-medium">Classes Affected</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
                <div className="text-3xl font-black text-blue-400 font-mono">
                  {activePreset.results.affectedStudents}
                </div>
                <div className="text-xs text-slate-300 mt-1 font-medium">Students Affected</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
                <div className="text-3xl font-black text-purple-400 font-mono">
                  {activePreset.results.affectedFaculty}
                </div>
                <div className="text-xs text-slate-300 mt-1 font-medium">Faculty Impacted</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
                <div className="text-3xl font-black text-amber-400 font-mono">
                  {activePreset.results.roomsRequired}
                </div>
                <div className="text-xs text-slate-300 mt-1 font-medium">Alternative Rooms Needed</div>
              </div>
            </div>
          </div>

          {/* Conflict Breakdown & Recommended Mitigations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Conflicts Detected */}
            <Card className="border-rose-900/30 bg-slate-900/80 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Bottlenecks & Conflicts Detected</span>
                </h4>
                <Badge variant="danger" size="sm">
                  {activePreset.results.conflictsDetected.length} Collisions
                </Badge>
              </div>

              <div className="space-y-2">
                {activePreset.results.conflictsDetected.map((c, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-slate-950/80 border border-rose-900/30 text-xs text-slate-200 flex items-start gap-2.5"
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recommended Mitigations */}
            <Card className="border-emerald-900/30 bg-slate-900/80 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Recommended Multi-Agent Mitigations</span>
                </h4>
                <Badge variant="success" size="sm">
                  0 Hard Violations
                </Badge>
              </div>

              <div className="space-y-2">
                {activePreset.results.recommendedAdjustments.map((rec, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-slate-950/80 border border-emerald-900/30 text-xs text-slate-200 flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Before vs After Recharts Visualization */}
          <Card className="border-slate-800 bg-slate-900/70 p-5">
            <CardHeader className="p-0 pb-4 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-purple-400" />
                  <span>Before vs After Resource Load Comparison (%)</span>
                </CardTitle>
                <CardDescription className="text-xs text-slate-400">
                  Predicted load redistribution across campus resources under this scenario
                </CardDescription>
              </div>
              <Badge variant="purple" size="sm">
                Redistribution Model
              </Badge>
            </CardHeader>
            <CardContent className="p-0 pt-2 h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activePreset.results.beforeAfterData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="label" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} unit="%" tickLine={false} />
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar dataKey="before" name="Baseline Load (%)" fill="#64748b" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="after" name="Simulated Post-Mitigation Load (%)" fill="#a855f7" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Bottom Action Footer */}
          <div className="p-5 rounded-xl bg-white border border-purple-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-white">
                Ready to execute this mitigation strategy?
              </h4>
              <p className="text-xs text-slate-400">
                You can convert this simulated mitigation plan directly into an active decision proposal in the Decision Center.
              </p>
            </div>

            <Button
              variant="glow"
              size="md"
              onClick={handleConvertToDecision}
              className="shrink-0 bg-blue-600 text-white hover:bg-blue-500 shadow-md shadow-blue-900/30 focus:ring-blue-500 border border-blue-500/30"
            >
              <Zap className="w-4 h-4" />
              <span>Convert to Active Decision</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
