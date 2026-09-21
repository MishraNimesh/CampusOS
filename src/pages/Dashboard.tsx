import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Cpu,
  FileSpreadsheet,
  GraduationCap,
  HelpCircle,
  Layers,
  Send,
  Sparkles,
  TrendingUp,
  Users,
  Zap
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Legend,
  AreaChart,
  Area,
  CartesianGrid
} from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/ToastContext';
import {
  ROOM_UTILIZATION_CHART_DATA,
  FACULTY_WORKLOAD_CHART_DATA,
  EXAM_SCHEDULE_LOAD_DATA,
  PREBAKED_NL_QUERIES
} from '@/data/mockData';

interface DashboardProps {
  onRouteChange: (route: string) => void;
  onSelectDecision: (decisionId: string) => void;
  initialQuery?: string;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onRouteChange,
  onSelectDecision,
  initialQuery = ''
}) => {
  const { info, success } = useToast();
  const [nlQuery, setNlQuery] = useState(initialQuery);
  const [activeQueryResult, setActiveQueryResult] = useState<typeof PREBAKED_NL_QUERIES[0] | null>(
    initialQuery ? PREBAKED_NL_QUERIES.find(q => q.query.toLowerCase() === initialQuery.toLowerCase()) || PREBAKED_NL_QUERIES[0] : null
  );
  const [isQueryLoading, setIsQueryLoading] = useState(false);

  // Modal for Decision Insights
  const [selectedInsight, setSelectedInsight] = useState<{
    title: string;
    description: string;
    impact: string;
    agents: string[];
    actionLabel: string;
    actionRoute: string;
  } | null>(null);

  const handleRunQuery = (queryText: string) => {
    setNlQuery(queryText);
    setIsQueryLoading(true);

    setTimeout(() => {
      setIsQueryLoading(false);
      const match = PREBAKED_NL_QUERIES.find(
        (q) => q.query.toLowerCase().includes(queryText.toLowerCase()) || queryText.toLowerCase().includes(q.query.toLowerCase())
      ) || PREBAKED_NL_QUERIES[0];
      setActiveQueryResult(match);
      success('Query Analyzed', 'Structured decision response generated with verified evidence.');
    }, 450);
  };

  const handleQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nlQuery.trim()) return;
    handleRunQuery(nlQuery);
  };

  return (
    <div className="space-y-8 page-transition">
      {/* Top Welcome Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Good morning, Mr. Sharma
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-semibold border border-blue-500/20 font-mono">
              AY 2026–27
            </span>
          </div>
          <p className="text-sm text-slate-400">
            Here's what's happening across your campus operations today. 8 autonomous agents monitoring constraints in real time.
          </p>
        </div>

        {/* Action button cluster */}
        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onRouteChange('what-if')}
            className="text-xs border-slate-700 hover:border-purple-500/40 text-slate-300 hover:text-purple-300"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Run What-If Scenario</span>
          </Button>

          <Button
            variant="glow"
            size="sm"
            onClick={() => onSelectDecision('DEC-2026-092')}
            className="text-xs"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Open Priority Decision</span>
          </Button>
        </div>
      </div>

      {/* Top 5 KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 stagger-children">
        {/* KPI 1 */}
        <Card
          hoverable
          onClick={() => onRouteChange('decision-center')}
          className="cursor-pointer border-slate-800/80 bg-slate-900/60 p-4 relative overflow-hidden group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Issues</span>
            <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">8</span>
            <span className="text-xs font-medium text-rose-400 font-mono">+2 this week</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 truncate">3 require administrative signoff</p>
        </Card>

        {/* KPI 2 */}
        <Card
          hoverable
          onClick={() => onRouteChange('faculty')}
          className="cursor-pointer border-slate-800/80 bg-slate-900/60 p-4 relative overflow-hidden group gradient-border animate-fade-up"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Faculty Utilization</span>
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition-transform">
              <Users className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">78%</span>
            <span className="text-xs font-medium text-emerald-400">Healthy</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 truncate">2 faculty over 18h limit</p>
        </Card>

        {/* KPI 3 */}
        <Card
          hoverable
          onClick={() => onRouteChange('infrastructure')}
          className="cursor-pointer border-slate-800/80 bg-slate-900/60 p-4 relative overflow-hidden group gradient-border animate-fade-up"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Room Utilization</span>
            <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:scale-110 transition-transform">
              <Building2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">84%</span>
            <span className="text-xs font-medium text-blue-400 font-mono">+6% this month</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 truncate">48 active lecture spaces</p>
        </Card>

        {/* KPI 4 */}
        <Card
          hoverable
          onClick={() => onRouteChange('examinations')}
          className="cursor-pointer border-slate-800/80 bg-slate-900/60 p-4 relative overflow-hidden group gradient-border animate-fade-up"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Upcoming Exams</span>
            <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 group-hover:scale-110 transition-transform">
              <FileSpreadsheet className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">12</span>
            <span className="text-xs font-medium text-purple-400 font-mono">Next: 24 Sep</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 truncate">1 room capacity overflow</p>
        </Card>

        {/* KPI 5 */}
        <Card
          hoverable
          onClick={() => onRouteChange('decision-center')}
          className="cursor-pointer border-slate-800/80 bg-slate-900/60 p-4 relative overflow-hidden group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Pending Decisions</span>
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:scale-110 transition-transform">
              <Zap className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">5</span>
            <span className="text-xs font-medium text-rose-400 font-mono">2 high priority</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 truncate">All recommendations ready</p>
        </Card>
      </div>

      {/* Natural Language Decision Query Bar (Structured AI Decision Engine) */}
      <Card className="border-blue-900/50 bg-gradient-to-r from-slate-900 via-slate-900/90 to-blue-950/30 shadow-xl overflow-hidden gradient-animated animate-glow-pulse">
        <CardContent className="p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  Campus OS Intelligent Query
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-300 font-mono border border-blue-500/20">
                    Decision-Support Engine
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Ask questions about campus bottlenecks, resource clashes, or student eligibility to receive structured recommendations.
                </p>
              </div>
            </div>
          </div>

          {/* Search form */}
          <form onSubmit={handleQuerySubmit} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={nlQuery}
                onChange={(e) => setNlQuery(e.target.value)}
                placeholder="Ask Campus OS about your campus... (e.g. Which classrooms are underutilized? Who is overloaded?)"
                className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors shadow-inner"
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              isLoading={isQueryLoading}
              className="shrink-0 px-4 py-2.5"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Ask Campus OS</span>
            </Button>
          </form>

          {/* Preset query suggestion chips */}
          <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-0.5 text-xs">
            <span className="text-slate-400 text-[11px] shrink-0 font-medium">Suggestions:</span>
            {PREBAKED_NL_QUERIES.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleRunQuery(item.query)}
                className="px-2.5 py-1 rounded-lg bg-slate-800/70 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-all whitespace-nowrap cursor-pointer text-[11px]"
              >
                {item.query}
              </button>
            ))}
          </div>

          {/* Structured Query Output Card (Not a simple chatbot message, but an enterprise structured decision card) */}
          {activeQueryResult && (
            <div className="mt-4 p-4 sm:p-5 rounded-xl bg-slate-950/90 border border-blue-900/50 space-y-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                      Structured Agent Analysis
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-white leading-relaxed">
                    {activeQueryResult.answer}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {activeQueryResult.agents.map((agentName, idx) => (
                    <Badge key={idx} variant="primary" size="sm" withDot>
                      {agentName}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Data rows */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {activeQueryResult.data.map((row, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-900/90 border border-slate-800">
                    <div className="text-xs font-bold text-white">{row.name}</div>
                    <div className="text-xs font-semibold text-blue-400 mt-0.5">{row.utilization}</div>
                    <div className="text-[11px] text-slate-400 mt-1">{row.note}</div>
                  </div>
                ))}
              </div>

              {/* Evidence & Next Action */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-800/80 text-xs">
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="font-semibold text-slate-300">Verified Evidence:</span>
                  <span className="text-slate-400 truncate">{activeQueryResult.evidence}</span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    size="sm"
                    variant="glow"
                    onClick={() => {
                      if (activeQueryResult.query.includes('Lab') || activeQueryResult.query.includes('timetable')) {
                        onSelectDecision('DEC-2026-092');
                      } else if (activeQueryResult.query.includes('overloaded')) {
                        onSelectDecision('DEC-2026-089');
                      } else if (activeQueryResult.query.includes('classrooms')) {
                        onRouteChange('what-if');
                      } else {
                        onRouteChange('placements');
                      }
                    }}
                    className="text-xs"
                  >
                    <span>{activeQueryResult.recommendedActionText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Attention Required (Operational Conflicts Requiring Administrative Decisions) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white tracking-tight">
              Attention Required
            </h2>
            <Badge variant="danger" size="sm">
              3 Critical Items
            </Badge>
          </div>
          <span className="text-xs text-slate-400">
            Automated conflict resolution candidates prepared by specialized agents
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Conflict 1 */}
          <Card className="border-rose-900/40 bg-slate-900/90 hover:border-rose-500/40 transition-all flex flex-col justify-between">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="danger" size="sm" withDot>
                  TIMETABLE CONFLICT
                </Badge>
                <span className="text-xs font-semibold text-rose-400 font-mono">Severity: High</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  Lab 3 Double Booking & Lab 2 Outage
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  "CS-A has two classes assigned to Lab 3 at 10:00 AM while Lab 2 is closed for scheduled maintenance."
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-400 font-mono pt-1">
                <span>Affected: 42 students</span>
                <span>•</span>
                <span>2 Labs Involved</span>
              </div>
            </CardContent>
            <div className="p-5 pt-0 border-t border-slate-800/60 mt-auto">
              <Button
                variant="glow"
                size="sm"
                onClick={() => onSelectDecision('DEC-2026-092')}
                className="w-full text-xs justify-between"
              >
                <span>Review conflict in Decision Center</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </Card>

          {/* Conflict 2 */}
          <Card className="border-amber-900/40 bg-slate-900/90 hover:border-amber-500/40 transition-all flex flex-col justify-between">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="warning" size="sm" withDot>
                  FACULTY OVERLOAD
                </Badge>
                <span className="text-xs font-semibold text-amber-400 font-mono">Severity: Medium</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  Teaching Hours Exceeded (Dr. Mehta)
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  "Dr. Mehta is assigned 24 teaching hours this week (exceeding 18h UGC threshold by +6h)."
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-400 font-mono pt-1">
                <span>Dept: Computer Engg</span>
                <span>•</span>
                <span>2 Overloaded Faculty</span>
              </div>
            </CardContent>
            <div className="p-5 pt-0 border-t border-slate-800/60 mt-auto">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onSelectDecision('DEC-2026-089')}
                className="w-full text-xs justify-between border-slate-700 hover:border-amber-500/50 hover:text-amber-300"
              >
                <span>Analyze workload & rebalance</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </Card>

          {/* Conflict 3 */}
          <Card className="border-rose-900/40 bg-slate-900/90 hover:border-rose-500/40 transition-all flex flex-col justify-between">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="danger" size="sm" withDot>
                  EXAM ROOM CAPACITY
                </Badge>
                <span className="text-xs font-semibold text-rose-400 font-mono">Severity: High</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  Hall B204 Seating Overflow
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  "Room B204 exceeds recommended seating capacity by 8 students for Mid-Term CS301 exam."
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-400 font-mono pt-1">
                <span>Date: 24 Sep</span>
                <span>•</span>
                <span>68 Examinees / Cap 60</span>
              </div>
            </CardContent>
            <div className="p-5 pt-0 border-t border-slate-800/60 mt-auto">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onSelectDecision('DEC-2026-085')}
                className="w-full text-xs justify-between border-slate-700 hover:border-rose-500/50 hover:text-rose-300"
              >
                <span>Find alternatives (Hall A101)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Decision Insights */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Decision Insights
            </h2>
            <p className="text-xs text-slate-400">
              Pattern detections discovered across cross-domain campus telemetry
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Insight 1 */}
          <Card
            hoverable
            onClick={() =>
              setSelectedInsight({
                title: '12% Unused Classroom Capacity on Friday Afternoons',
                description: 'Across Block B and Block C, 7 lecture rooms and 2 seminar halls have <30% scheduled occupancy between 2:00 PM and 5:00 PM on Fridays.',
                impact: 'Consolidating Friday afternoon tutorial sessions could save ~480 kWh in HVAC power and free rooms for hackathons.',
                agents: ['Infrastructure Agent', 'Timetable Agent'],
                actionLabel: 'Simulate Friday Room Consolidation',
                actionRoute: 'what-if'
              })
            }
            className="cursor-pointer border-slate-800 bg-slate-900/60 p-5 group flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-blue-400 text-xs font-semibold">
                <Building2 className="w-4 h-4" />
                <span>Space Optimization</span>
              </div>
              <p className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">
                "12% unused classroom capacity detected on Friday afternoons across Block B & C."
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs text-blue-400 font-medium mt-4 pt-3 border-t border-slate-800/80">
              <span>View analysis</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Card>

          {/* Insight 2 */}
          <Card
            hoverable
            onClick={() =>
              setSelectedInsight({
                title: 'Faculty Competency Match for Unassigned Electives',
                description: '3 faculty members in Information Technology and ECE have certified specializations in Cloud Security and Embedded AI matching newly introduced semester electives.',
                impact: 'Eliminates need for external contract guest faculty while improving accreditation teacher-specialization mapping index.',
                agents: ['Faculty Agent', 'Academic Agent'],
                actionLabel: 'Review Faculty Allocation',
                actionRoute: 'faculty'
              })
            }
            className="cursor-pointer border-slate-800 bg-slate-900/60 p-5 group flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
                <Users className="w-4 h-4" />
                <span>Faculty Competency</span>
              </div>
              <p className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors">
                "3 faculty members have overlapping expertise with currently unassigned elective courses."
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs text-amber-400 font-medium mt-4 pt-3 border-t border-slate-800/80">
              <span>View analysis</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Card>

          {/* Insight 3 */}
          <Card
            hoverable
            onClick={() =>
              setSelectedInsight({
                title: 'TCS Prime Campus Recruitment Eligibility',
                description: 'Pre-screening completed for TCS Prime (9 LPA package). 67 final year students meet strict criteria (CGPA >= 7.5, zero active backlogs).',
                impact: '64 out of 67 students have confirmed participation; automated coding test roster ready for deployment.',
                agents: ['Placement Agent', 'Academic Agent'],
                actionLabel: 'Open Placement Module',
                actionRoute: 'placements'
              })
            }
            className="cursor-pointer border-slate-800 bg-slate-900/60 p-5 group flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
                <GraduationCap className="w-4 h-4" />
                <span>Placement Readiness</span>
              </div>
              <p className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                "Placement eligibility data indicates 67 students qualify for the upcoming TCS Prime drive."
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs text-emerald-400 font-medium mt-4 pt-3 border-t border-slate-800/80">
              <span>View analysis</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Card>
        </div>
      </div>

      {/* Operational Overview (Recharts Analytics) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Operational Overview
            </h2>
            <p className="text-xs text-slate-400">
              Real-time resource utilization, faculty teaching distributions, and exam schedules
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart 1: Room Utilization */}
          <Card className="border-slate-800 bg-slate-900/70 p-5">
            <CardHeader className="p-0 pb-4 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-bold text-white">
                  Weekly Room & Lab Utilization (%)
                </CardTitle>
                <CardDescription className="text-xs text-slate-400">
                  Hourly utilization by timeslot across 48 physical facilities
                </CardDescription>
              </div>
              <Badge variant="primary" size="sm">
                Live Sensor Feed
              </Badge>
            </CardHeader>
            <CardContent className="p-0 pt-2 h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ROOM_UTILIZATION_CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} domain={[0, 100]} unit="%" tickLine={false} />
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                    labelStyle={{ color: '#ffffff', fontWeight: 'bold' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar dataKey="Morning (8-11)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Mid-day (11-2)" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Afternoon (2-5)" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Chart 2: Faculty Workload Distribution */}
          <Card className="border-slate-800 bg-slate-900/70 p-5">
            <CardHeader className="p-0 pb-4 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-bold text-white">
                  Faculty Workload Distribution (Weekly Hours)
                </CardTitle>
                <CardDescription className="text-xs text-slate-400">
                  Teaching, Lab, and Admin hours against 18h maximum threshold
                </CardDescription>
              </div>
              <Badge variant="warning" size="sm">
                Threshold: 18 hrs
              </Badge>
            </CardHeader>
            <CardContent className="p-0 pt-2 h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={FACULTY_WORKLOAD_CHART_DATA} layout="vertical" margin={{ top: 5, right: 20, left: 25, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis type="number" stroke="#64748b" fontSize={12} domain={[0, 26]} unit="h" tickLine={false} />
                  <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                  <Bar dataKey="teaching" name="Lectures" stackId="a" fill="#3b82f6" />
                  <Bar dataKey="lab" name="Labs" stackId="a" fill="#10b981" />
                  <Bar dataKey="admin" name="Admin" stackId="a" fill="#64748b" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Insight Analysis Modal */}
      {selectedInsight && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedInsight(null)}
          title={selectedInsight.title}
          description="Synthesized operational insight generated from campus telemetry."
          size="md"
        >
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Observation Detail
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">
                {selectedInsight.description}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-900/40 space-y-2">
              <div className="text-xs font-semibold text-blue-300 uppercase tracking-wider">
                Actionable Optimization Impact
              </div>
              <p className="text-sm text-blue-100 leading-relaxed">
                {selectedInsight.impact}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <span className="text-xs text-slate-400">Agents Involved:</span>
              {selectedInsight.agents.map((ag, i) => (
                <Badge key={i} variant="primary" size="sm">
                  {ag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <Button variant="outline" size="sm" onClick={() => setSelectedInsight(null)}>
                Close
              </Button>
              <Button
                variant="glow"
                size="sm"
                onClick={() => {
                  const route = selectedInsight.actionRoute;
                  setSelectedInsight(null);
                  onRouteChange(route);
                }}
              >
                <span>{selectedInsight.actionLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
