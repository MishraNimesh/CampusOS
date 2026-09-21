import React, { useState } from 'react';
import {
  Zap,
  ArrowRight,
  Filter,
  Search,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Layers,
  Scale,
  Sparkles,
  Plus,
  Cpu,
  Building2,
  Users,
  GraduationCap
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Tabs } from '@/components/ui/Tabs';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/ToastContext';
import { MOCK_DECISIONS, DecisionItem } from '@/data/mockData';

interface DecisionCenterProps {
  onSelectDecision: (decisionId: string) => void;
  onRouteChange: (route: string) => void;
}

export const DecisionCenter: React.FC<DecisionCenterProps> = ({
  onSelectDecision,
  onRouteChange
}) => {
  const { success } = useToast();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [isNewProblemModalOpen, setIsNewProblemModalOpen] = useState(false);

  // New problem form local state
  const [problemDescription, setProblemDescription] = useState('');
  const [problemResource, setProblemResource] = useState('Lab 1');
  const [isSolvingNewProblem, setIsSolvingNewProblem] = useState(false);

  const departments = ['All', 'Computer Engineering', 'Examination Cell', 'Infrastructure & CS'];

  const filterTabs = [
    { id: 'all', label: 'All Decisions', badge: MOCK_DECISIONS.length },
    { id: 'ready', label: 'Ready for Review', badge: MOCK_DECISIONS.filter((d) => d.status === 'Ready for Review').length },
    { id: 'implemented', label: 'Implemented', badge: MOCK_DECISIONS.filter((d) => d.status === 'Implemented').length }
  ];

  const filteredDecisions = MOCK_DECISIONS.filter((d) => {
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'ready' && d.status === 'Ready for Review') ||
      (activeTab === 'implemented' && d.status === 'Implemented');

    const matchesDept = selectedDept === 'All' || d.department.includes(selectedDept);

    const matchesSearch =
      d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.problem.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.id.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesTab && matchesDept && matchesSearch;
  });

  const handleCreateProblem = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSolvingNewProblem(true);
    setTimeout(() => {
      setIsSolvingNewProblem(false);
      setIsNewProblemModalOpen(false);
      success(
        'Autonomous Agents Activated',
        'Timetable, Faculty & Infrastructure agents generated candidate solutions for ' + problemResource
      );
      onSelectDecision('DEC-2026-092');
    }, 800);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Decision Center
            </h1>
            <Badge variant="primary" size="sm">
              Live Optimization Engine
            </Badge>
          </div>
          <p className="text-sm text-slate-400">
            Analyze operational problems, examine agent-validated candidate actions, and evaluate transparent trade-offs.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onRouteChange('what-if')}
            className="text-xs border-slate-700 text-slate-300 hover:text-white"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Open Simulator</span>
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsNewProblemModalOpen(true)}
            className="text-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Ingest Operational Problem</span>
          </Button>
        </div>
      </div>

      {/* Philosophy Callout Banner */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-blue-900/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400 shrink-0">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-white block mb-0.5">Campus OS Decision Paradigm:</span>
            <span className="text-slate-300">
              Problem → Relevant Data → Agent Analysis → Constraints → Candidate Solutions → Validation → Ranking → Recommendation
            </span>
          </div>
        </div>
        <Badge variant="success" size="sm" withDot className="shrink-0">
          Zero Hard Violations Enforced
        </Badge>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Tabs tabs={filterTabs} activeTab={activeTab} onChange={setActiveTab} />

        <div className="flex items-center gap-3">
          {/* Department Filter */}
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
          >
            {departments.map((d) => (
              <option key={d} value={d}>
                {d === 'All' ? 'All Departments' : d}
              </option>
            ))}
          </select>

          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Filter decisions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 w-44 sm:w-56"
            />
          </div>
        </div>
      </div>

      {/* Decisions List Grid */}
      <div className="space-y-4">
        {filteredDecisions.map((decision) => {
          const isDone = decision.status === 'Implemented';
          return (
            <Card
              key={decision.id}
              hoverable
              onClick={() => onSelectDecision(decision.id)}
              className="p-5 sm:p-6 border-slate-800/90 bg-slate-900/70 hover:border-blue-500/50 transition-all cursor-pointer group"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-mono text-xs font-bold text-blue-400">{decision.id}</span>
                    <Badge
                      variant={isDone ? 'success' : decision.priority === 'High' ? 'danger' : 'warning'}
                      size="sm"
                      withDot
                    >
                      {decision.status}
                    </Badge>
                    <Badge variant="neutral" size="sm">
                      {decision.department}
                    </Badge>
                    <span className="text-xs text-slate-400 font-mono">
                      Created: {decision.createdDate}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                    {decision.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                    {decision.problem}
                  </p>

                  {/* Constraints pills */}
                  <div className="pt-2 flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] font-semibold text-slate-400 mr-1">Constraints:</span>
                    {decision.constraints.slice(0, 3).map((c, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300"
                      >
                        {c}
                      </span>
                    ))}
                    {decision.constraints.length > 3 && (
                      <span className="text-[10px] text-slate-400 font-mono">
                        +{decision.constraints.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Right Summary Box & Action */}
                <div className="flex lg:flex-col items-center lg:items-end justify-between gap-3 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-800/60">
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-[11px] text-slate-400">Confidence</div>
                      <div className="text-base font-bold text-blue-400 font-mono">
                        {decision.confidenceScore}%
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] text-slate-400">Impact Risk</div>
                      <div className="text-xs font-bold text-emerald-400">{decision.impactRisk}</div>
                    </div>
                  </div>

                  <Button
                    variant={isDone ? 'secondary' : 'glow'}
                    size="sm"
                    className="text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectDecision(decision.id);
                    }}
                  >
                    <span>{isDone ? 'View Audit Trail' : 'Open Workspace'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}

        {filteredDecisions.length === 0 && (
          <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
            <Zap className="w-8 h-8 text-slate-400 mx-auto" />
            <h4 className="text-sm font-semibold text-white">No decisions found</h4>
            <p className="text-xs text-slate-400">Try changing your search term or department filter.</p>
          </div>
        )}
      </div>

      {/* Ingest Operational Problem Modal */}
      {isNewProblemModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setIsNewProblemModalOpen(false)}
          title="Ingest Operational Problem"
          description="Submit an urgent operational disruption to initiate real-time multi-agent reasoning."
          size="md"
        >
          <form onSubmit={handleCreateProblem} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Affected Campus Resource
              </label>
              <select
                value={problemResource}
                onChange={(e) => setProblemResource(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Lab 1">Lab 1 (IoT & Network Systems)</option>
                <option value="Lab 3">Lab 3 (Advanced Computing)</option>
                <option value="Hall B204">Hall B204 (Lecture Theatre)</option>
                <option value="Dr. Amit Mehta">Faculty: Dr. Amit Mehta (Emergency Leave)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Problem Description & Constraints
              </label>
              <textarea
                rows={3}
                value={problemDescription}
                onChange={(e) => setProblemDescription(e.target.value)}
                placeholder="E.g., Air conditioner malfunction requires immediate 3-day closure of Lab 1. Need alternative slots with high-speed internet."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-900/40 text-xs text-slate-300">
              <span className="font-semibold text-blue-300 block mb-1">Agents to be Activated:</span>
              <div className="flex items-center gap-1.5 flex-wrap">
                <Badge variant="primary" size="sm">Timetable Agent</Badge>
                <Badge variant="primary" size="sm">Faculty Agent</Badge>
                <Badge variant="primary" size="sm">Infrastructure Agent</Badge>
                <Badge variant="primary" size="sm">Orchestrator</Badge>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={() => setIsNewProblemModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="glow"
                size="sm"
                type="submit"
                isLoading={isSolvingNewProblem}
              >
                <span>Trigger Agent Multi-Solve</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
