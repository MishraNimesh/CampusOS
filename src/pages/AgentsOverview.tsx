import React, { useState } from 'react';
import {
  Bot,
  GraduationCap,
  Users,
  Calendar,
  Building2,
  FileSpreadsheet,
  Briefcase,
  Megaphone,
  Cpu,
  CheckCircle2,
  RefreshCw,
  Activity,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/ToastContext';
import { CAMPUS_AGENTS, AgentInfo } from '@/data/mockData';

interface AgentsOverviewProps {
  onRouteChange: (route: string) => void;
  onSelectDecision: (decisionId: string) => void;
}

export const AgentsOverview: React.FC<AgentsOverviewProps> = ({
  onRouteChange,
  onSelectDecision
}) => {
  const { success } = useToast();
  const [isCalibrating, setIsCalibrating] = useState(false);

  const iconMap: Record<string, React.ElementType> = {
    GraduationCap,
    Users,
    Calendar,
    Building2,
    FileSpreadsheet,
    Briefcase,
    Megaphone,
    Cpu
  };

  const handleCalibrate = () => {
    setIsCalibrating(true);
    setTimeout(() => {
      setIsCalibrating(false);
      success(
        'Agent Swarm Synchronized',
        'All 8 agents verified constraints across 320 timetable slots with 0 telemetry lag.'
      );
    }, 700);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              AI Agents Swarm
            </h1>
            <Badge variant="primary" size="sm" withDot>
              8 Specialized Agents Online
            </Badge>
          </div>
          <p className="text-sm text-slate-400">
            Autonomous multi-agent system continuously inspecting operational constraints, syllabus paces, and room allocations.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCalibrate}
            isLoading={isCalibrating}
            className="text-xs border-slate-700 text-slate-300 hover:text-white"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1" />
            <span>Calibrate Swarm</span>
          </Button>

          <Button
            variant="glow"
            size="sm"
            onClick={() => onRouteChange('decision-center')}
            className="text-xs"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Open Decision Center</span>
          </Button>
        </div>
      </div>

      {/* System Telemetry Pulse Card */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shadow-inner">
              <Cpu className="w-6 h-6 animate-pulse" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-slate-950" />
          </div>
          <div>
            <div className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
              Multi-Agent Orchestrator Status
            </div>
            <h3 className="text-lg font-bold text-white">
              Continuous Operational Synthesis Active
            </h3>
            <p className="text-xs text-slate-400">
              Synchronizing 320 timetable slots, 84 faculty workloads, and 48 infrastructure facilities.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 text-center shrink-0">
          <div>
            <div className="text-xs text-slate-400 font-medium">Precision Rating</div>
            <div className="text-xl font-bold text-emerald-400 font-mono">99.4%</div>
          </div>
          <div className="w-px h-8 bg-slate-800" />
          <div>
            <div className="text-xs text-slate-400 font-medium">Active Constraints</div>
            <div className="text-xl font-bold text-white font-mono">142</div>
          </div>
          <div className="w-px h-8 bg-slate-800" />
          <div>
            <div className="text-xs text-slate-400 font-medium">Decisions Influenced</div>
            <div className="text-xl font-bold text-blue-400 font-mono">42</div>
          </div>
        </div>
      </div>

      {/* 8 Agent Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {CAMPUS_AGENTS.map((agent) => {
          const Icon = iconMap[agent.icon] || Bot;
          const isMaster = agent.id === 'orchestrator';

          return (
            <Card
              key={agent.id}
              className={`p-5 flex flex-col justify-between transition-all group ${
                isMaster
                  ? 'border-blue-500/50 bg-gradient-to-br from-slate-900 to-blue-950/40 shadow-lg shadow-blue-950/30 lg:col-span-2'
                  : 'border-slate-800 bg-slate-900/70 hover:border-slate-700'
              }`}
            >
              <div className="space-y-3">
                {/* Agent Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`p-2 rounded-xl flex items-center justify-center ${
                        isMaster
                          ? 'bg-blue-600/30 text-blue-400 border border-blue-500/40'
                          : 'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                        {agent.name}
                      </h4>
                      <span className="text-[10px] text-slate-400 block font-mono">
                        Active • {agent.lastActivity}
                      </span>
                    </div>
                  </div>

                  <Badge variant="success" size="sm" withDot>
                    {agent.status}
                  </Badge>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed min-h-[36px]">
                  {agent.description}
                </p>

                {/* Watched Constraints */}
                <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    Watched Constraints:
                  </div>
                  <div className="space-y-1">
                    {agent.watchedConstraints.map((constraint, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span className="truncate">{constraint}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Telemetry */}
              <div className="flex items-center justify-between pt-3 mt-4 border-t border-slate-800/80 text-[11px]">
                <span className="text-slate-400 font-mono">
                  Precision: <strong className="text-emerald-400">{agent.precisionScore}%</strong>
                </span>
                <span className="text-blue-400 font-mono">
                  {agent.recentDecisionsCount} resolutions
                </span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
