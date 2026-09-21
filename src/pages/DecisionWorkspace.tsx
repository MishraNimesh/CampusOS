import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Calendar,
  Clock,
  Cpu,
  FileCheck,
  GraduationCap,
  Layers,
  Scale,
  Sparkles,
  Users,
  Zap,
  ExternalLink,
  Download,
  Share2,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Drawer } from '@/components/ui/Drawer';
import { useToast } from '@/components/ui/ToastContext';
import { MOCK_DECISIONS, DecisionItem, EvidenceSource, AlternativeOption } from '@/data/mockData';

interface DecisionWorkspaceProps {
  decisionId: string;
  onBack: () => void;
  onRouteChange: (route: string) => void;
}

export const DecisionWorkspace: React.FC<DecisionWorkspaceProps> = ({
  decisionId,
  onBack,
  onRouteChange
}) => {
  const { success, info } = useToast();
  const [decision, setDecision] = useState<DecisionItem>(
    MOCK_DECISIONS.find((d) => d.id === decisionId) || MOCK_DECISIONS[0]
  );

  const [isImplemented, setIsImplemented] = useState(decision.status === 'Implemented');
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceSource | null>(null);
  const [selectedAlternative, setSelectedAlternative] = useState<AlternativeOption>(
    decision.alternatives[0] || ({} as AlternativeOption)
  );

  const handleApproveDecision = () => {
    setIsImplemented(true);
    setDecision((prev) => ({ ...prev, status: 'Implemented' }));

    // Confetti effect
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    success(
      'Decision Approved & Implemented',
      `Timetable shifts have been auto-synced to Master Registry. Circular queued for dispatch to CS-A students.`
    );
  };

  const handleExportBrief = () => {
    info(
      'Decision Brief Exported',
      `Generated verified audit report for ${decision.id} (PDF & Cryptographic Timestamp included).`
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-12">
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onBack}
            className="text-xs text-slate-300 hover:text-white border-slate-700"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            <span>Back to Decision Center</span>
          </Button>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold text-blue-400">{decision.id}</span>
            <span className="text-slate-600">•</span>
            <Badge
              variant={isImplemented ? 'success' : 'primary'}
              size="sm"
              withDot
            >
              {isImplemented ? 'Implemented & Verified' : decision.status}
            </Badge>
            <Badge variant="neutral" size="sm">
              {decision.department}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportBrief}
            className="text-xs border-slate-700 text-slate-300 hover:text-white"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Brief</span>
          </Button>

          <Button
            variant={isImplemented ? 'secondary' : 'glow'}
            size="sm"
            onClick={handleApproveDecision}
            disabled={isImplemented}
            className="text-xs"
          >
            {isImplemented ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Decision Applied</span>
              </>
            ) : (
              <>
                <Zap className="w-3.5 h-3.5" />
                <span>Approve & Apply Plan</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Main Decision Title Banner */}
      <div className="p-6 rounded-2xl bg-white border border-slate-800 shadow-xl space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider font-mono mb-1">
              Operational Decision Workspace
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {decision.title}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
              <div className="text-[11px] text-slate-400 uppercase font-semibold">Confidence Score</div>
              <div className="text-2xl font-black text-blue-400 font-mono flex items-center justify-center gap-1">
                {decision.confidenceScore}%
              </div>
            </div>

            <div className="px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
              <div className="text-[11px] text-slate-400 uppercase font-semibold">Disruption Risk</div>
              <div className="text-sm font-bold text-emerald-400 flex items-center justify-center gap-1 mt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{decision.impactRisk}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Problem Statement Box */}
        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-sm text-slate-200 leading-relaxed flex items-start gap-3 mt-2">
          <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 shrink-0 mt-0.5">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-white block mb-0.5">Problem Statement:</span>
            {decision.problem}
          </div>
        </div>
      </div>

      {/* Relevant Data Metrics Grid */}
      <div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
          Relevant Telemetry & Impact Scope
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
            <div className="text-2xl font-black text-white font-mono">{decision.affectedScope.sessions}</div>
            <div className="text-xs text-slate-400 mt-1">Affected Sessions</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
            <div className="text-2xl font-black text-blue-400 font-mono">{decision.affectedScope.students}</div>
            <div className="text-xs text-slate-400 mt-1">Enrolled Students</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
            <div className="text-2xl font-black text-purple-400 font-mono">{decision.affectedScope.faculty}</div>
            <div className="text-xs text-slate-400 mt-1">Faculty Impacted</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
            <div className="text-2xl font-black text-amber-400 font-mono">{decision.affectedScope.alternativeRooms}</div>
            <div className="text-xs text-slate-400 mt-1">Alternative Rooms</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
            <div className="text-2xl font-black text-emerald-400 font-mono">{decision.affectedScope.availableLabs}</div>
            <div className="text-xs text-slate-400 mt-1">Viable Labs</div>
          </div>
        </div>
      </div>

      {/* Multi-Agent Orchestration Flow (Step-by-step visual pipeline) */}
      <Card className="border-slate-800 bg-slate-900/70 overflow-hidden">
        <CardHeader className="pb-3 border-b border-slate-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-blue-400" />
                <span>Multi-Agent Constraint Solving Workflow</span>
              </CardTitle>
              <CardDescription className="text-xs text-slate-400">
                Transparent multi-agent pipeline from problem ingestion to ranked recommendation
              </CardDescription>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {decision.agentsInvolved.map((agent) => (
                <Badge key={agent.id} variant="primary" size="sm" withDot>
                  {agent.name}
                </Badge>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-5">
          {/* Horizontal / Grid Workflow Pipeline */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-2.5 relative">
            {decision.workflowSteps.map((step, idx) => (
              <div
                key={step.step}
                className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 relative flex flex-col justify-between group hover:border-blue-500/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold text-blue-400 font-mono">STEP 0{step.step}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  </div>
                  <div className="text-xs font-bold text-white leading-snug">{step.name}</div>
                  <p className="text-[10px] text-slate-400 mt-1 line-clamp-3 leading-relaxed">
                    {step.detail}
                  </p>
                </div>
                <div className="text-[9px] font-mono text-slate-400 mt-2 pt-1.5 border-t border-slate-800/60 truncate">
                  {step.agent}
                </div>
              </div>
            ))}
          </div>

          {/* Enforced Constraints Checklist */}
          <div className="mt-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-blue-400" />
              <span>Hard Operational Constraints Watched & Satisfied</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {decision.constraints.map((c, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* RECOMMENDED ACTION SECTION (HERO CARD) */}
      <Card className="border-blue-500/40 bg-white shadow-2xl shadow-blue-950/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <CardHeader className="border-b border-blue-900/40 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shadow-inner">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold text-blue-400 uppercase tracking-wider font-mono">
                    OPTIMAL RECOMMENDED ACTION
                  </span>
                  <Badge variant="success" size="sm">
                    {decision.recommendedAction.confidence}% Confidence
                  </Badge>
                </div>
                <CardTitle className="text-base sm:text-lg font-bold text-white mt-0.5">
                  {decision.recommendedAction.title}
                </CardTitle>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsCompareModalOpen(true)}
                className="text-xs border-slate-700 hover:border-blue-500/40 text-slate-200"
              >
                <Scale className="w-3.5 h-3.5 text-blue-400" />
                <span>Compare Alternatives</span>
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          {/* Expected Impact Badges */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
              Verified Operational Impact
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {decision.recommendedAction.expectedImpact.map((impact, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-950/80 border border-emerald-900/30 flex items-start gap-2.5 text-xs text-slate-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">{impact}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Why This Recommendation? (Transparent Reasoning) */}
          <div className="p-5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-blue-400" />
              <span>Why This Recommendation? (Multi-Agent Rationale)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {decision.recommendedAction.whyExplanation.map((why, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <span className="w-5 h-5 rounded-full bg-blue-500/10 text-blue-400 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{why}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Evidence Sources (Clickable Audit Cards) */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>Supporting Evidence & Data Sources</span>
              </h4>
              <span className="text-[11px] text-slate-400">Click any source card to view verified audit snapshot</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {decision.recommendedAction.evidenceSources.map((source, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedEvidence(source)}
                  className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-blue-500/40 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white group-hover:text-blue-300 truncate">
                        {source.title}
                      </span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">Updated: {source.updated}</div>
                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">{source.summary}</p>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-blue-400 font-medium pt-2.5 mt-2 border-t border-slate-800/80">
                    <span>{source.recordCount}</span>
                    <span className="flex items-center gap-0.5 group-hover:underline">
                      View Source <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alternative Options Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Evaluated Alternative Solutions
            </h3>
            <p className="text-xs text-slate-400">
              Transparent trade-off matrix evaluated by the Multi-Agent Orchestrator
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsCompareModalOpen(true)}
            className="text-xs border-slate-700 text-slate-200"
          >
            <Scale className="w-3.5 h-3.5 text-blue-400" />
            <span>Open Side-by-Side Comparison</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {decision.alternatives.map((option) => (
            <Card
              key={option.id}
              className={`p-5 flex flex-col justify-between transition-all ${
                option.isRecommended
                  ? 'border-blue-500/50 bg-slate-900/90 shadow-lg shadow-blue-950/30'
                  : 'border-slate-800 bg-slate-900/60'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge
                    variant={option.isRecommended ? 'primary' : 'neutral'}
                    size="sm"
                  >
                    {option.name}
                  </Badge>
                  <span
                    className={`text-[11px] font-medium font-mono ${
                      option.impactLevel === 'Low Disruption'
                        ? 'text-emerald-400'
                        : option.impactLevel === 'Medium Disruption'
                        ? 'text-amber-400'
                        : 'text-rose-400'
                    }`}
                  >
                    {option.impactLevel}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white">{option.action}</h4>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div className="p-2 rounded bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Changes Required</span>
                    <span className="font-bold text-white font-mono">{option.changesRequired} slots</span>
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Constraint Violations</span>
                    <span className={`font-bold font-mono ${option.constraintViolations > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {option.constraintViolations}
                    </span>
                  </div>
                </div>

                {/* Pros & Cons */}
                <div className="space-y-1.5 text-[11px] pt-2">
                  <div className="space-y-1">
                    {option.pros.map((pro, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-emerald-300">
                        <CheckCircle2 className="w-3 h-3 shrink-0" />
                        <span>{pro}</span>
                      </div>
                    ))}
                  </div>
                  {option.cons.length > 0 && (
                    <div className="space-y-1 pt-1">
                      {option.cons.map((con, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-slate-400">
                          <AlertCircle className="w-3 h-3 text-amber-400 shrink-0" />
                          <span>{con}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80">
                {option.isRecommended ? (
                  <Button
                    variant="glow"
                    size="sm"
                    onClick={handleApproveDecision}
                    disabled={isImplemented}
                    className="w-full text-xs"
                  >
                    {isImplemented ? 'Plan Active' : 'Approve Recommended Plan'}
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedAlternative(option);
                      setIsCompareModalOpen(true);
                    }}
                    className="w-full text-xs border-slate-700 text-slate-300 hover:text-white"
                  >
                    Inspect Trade-offs
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Evidence Source Drawer Preview */}
      {selectedEvidence && (
        <Drawer
          isOpen={true}
          onClose={() => setSelectedEvidence(null)}
          title={selectedEvidence.title}
          description={`Verified Data Source • ${selectedEvidence.source}`}
          width="md"
        >
          <div className="space-y-5">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-400">Audit Status</span>
                <Badge variant="success" size="sm" withDot>
                  Verified Telemetry
                </Badge>
              </div>
              <div className="text-xs text-slate-300">
                <span className="text-slate-400">Timestamp: </span>
                <span className="font-mono text-white">{selectedEvidence.updated}</span>
              </div>
              <div className="text-xs text-slate-300">
                <span className="text-slate-400">Record Depth: </span>
                <span className="font-mono text-blue-400">{selectedEvidence.recordCount}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Raw Telemetry Summary
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed p-4 rounded-xl bg-slate-900 border border-slate-800">
                {selectedEvidence.summary}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-900/40 text-xs text-slate-300 space-y-2">
              <div className="font-semibold text-blue-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>Cryptographic Audit Proof</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-mono">
                SHA-256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
              </p>
            </div>
          </div>
        </Drawer>
      )}

      {/* Side-by-Side Alternatives Comparison Modal */}
      {isCompareModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setIsCompareModalOpen(false)}
          title="Compare Alternative Solution Pathways"
          description="Evaluate transparent trade-offs across timetable changes, faculty loads, and accreditation constraints."
          size="xl"
        >
          <div className="space-y-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400">
                    <th className="p-3 font-semibold">Factor / Criteria</th>
                    {decision.alternatives.map((alt) => (
                      <th
                        key={alt.id}
                        className={`p-3 font-semibold ${
                          alt.isRecommended ? 'text-blue-400 bg-blue-950/20' : 'text-slate-200'
                        }`}
                      >
                        {alt.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  <tr>
                    <td className="p-3 font-semibold text-slate-300">Action Plan</td>
                    {decision.alternatives.map((alt) => (
                      <td key={alt.id} className="p-3 text-slate-200">
                        {alt.action}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-300">Disruption Level</td>
                    {decision.alternatives.map((alt) => (
                      <td key={alt.id} className="p-3">
                        <span
                          className={`font-mono font-bold ${
                            alt.impactLevel === 'Low Disruption'
                              ? 'text-emerald-400'
                              : alt.impactLevel === 'Medium Disruption'
                              ? 'text-amber-400'
                              : 'text-rose-400'
                          }`}
                        >
                          {alt.impactLevel}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-300">Timetable Shifts</td>
                    {decision.alternatives.map((alt) => (
                      <td key={alt.id} className="p-3 font-mono text-white">
                        {alt.changesRequired} slots
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-300">Hard Violations</td>
                    {decision.alternatives.map((alt) => (
                      <td key={alt.id} className="p-3 font-mono">
                        {alt.constraintViolations === 0 ? (
                          <span className="text-emerald-400 font-bold">0 (None)</span>
                        ) : (
                          <span className="text-rose-400 font-bold">{alt.constraintViolations} (Accreditation rule)</span>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-300">Faculty Load Impact</td>
                    {decision.alternatives.map((alt) => (
                      <td key={alt.id} className="p-3 text-slate-300">
                        {alt.facultyImpact}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-300">Estimated Student Index</td>
                    {decision.alternatives.map((alt) => (
                      <td key={alt.id} className="p-3 font-mono text-blue-400 font-bold">
                        {alt.studentSatisfaction}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <Button variant="outline" size="sm" onClick={() => setIsCompareModalOpen(false)}>
                Close Matrix
              </Button>
              <Button
                variant="glow"
                size="sm"
                onClick={() => {
                  setIsCompareModalOpen(false);
                  handleApproveDecision();
                }}
              >
                <span>Approve Option A (Recommended)</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
