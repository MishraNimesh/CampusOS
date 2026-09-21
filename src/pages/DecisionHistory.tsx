import React, { useState } from 'react';
import {
  History,
  CheckCircle2,
  Search,
  Filter,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Building2,
  Zap,
  Eye
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/ToastContext';
import { MOCK_DECISIONS, DecisionItem } from '@/data/mockData';

interface DecisionHistoryProps {
  onSelectDecision: (decisionId: string) => void;
  onRouteChange: (route: string) => void;
}

export const DecisionHistory: React.FC<DecisionHistoryProps> = ({
  onSelectDecision,
  onRouteChange
}) => {
  const { info } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHistoricalDecision, setSelectedHistoricalDecision] = useState<DecisionItem | null>(null);

  const historicalDecisions = MOCK_DECISIONS.filter(
    (d) => d.status === 'Implemented' || d.id === 'DEC-2026-074' || d.id === 'DEC-2026-068'
  );

  const filtered = historicalDecisions.filter(
    (d) =>
      d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.problem.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Decision History & Audit Trail
            </h1>
            <Badge variant="success" size="sm" withDot>
              Cryptographically Verified Log
            </Badge>
          </div>
          <p className="text-sm text-slate-400">
            Complete historical record of previous administrative decisions, multi-agent rationales, and verified outcomes.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => info('Audit Log Exported', 'Exported full JSON/CSV decision audit log.')}
            className="text-xs border-slate-700 text-slate-300"
          >
            <span>Export Full Audit Trail</span>
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
        <input
          type="text"
          placeholder="Search historical decisions, departments, or dates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* History Table */}
      <Card className="border-slate-800 bg-slate-900/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400">
                <th className="p-3.5 font-semibold">Date & Decision ID</th>
                <th className="p-3.5 font-semibold">Problem Title</th>
                <th className="p-3.5 font-semibold">Departments</th>
                <th className="p-3.5 font-semibold">Implemented Action Summary</th>
                <th className="p-3.5 font-semibold">Outcome Status</th>
                <th className="p-3.5 font-semibold text-right">Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => onSelectDecision(item.id)}
                  className="hover:bg-slate-800/40 transition-colors cursor-pointer group"
                >
                  <td className="p-3.5 font-mono">
                    <div className="font-bold text-white group-hover:text-blue-300">{item.createdDate}</div>
                    <span className="text-[11px] text-blue-400">{item.id}</span>
                  </td>

                  <td className="p-3.5">
                    <div className="font-bold text-white">{item.title}</div>
                    <p className="text-[11px] text-slate-400 line-clamp-1 max-w-md mt-0.5">{item.problem}</p>
                  </td>

                  <td className="p-3.5 text-slate-300">
                    <Badge variant="neutral" size="sm">
                      {item.department}
                    </Badge>
                  </td>

                  <td className="p-3.5 text-slate-300 max-w-sm">
                    <div className="line-clamp-2 text-[11px]">
                      {item.recommendedAction.title}
                    </div>
                  </td>

                  <td className="p-3.5">
                    <Badge variant="success" size="sm" withDot>
                      Implemented
                    </Badge>
                  </td>

                  <td className="p-3.5 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectDecision(item.id);
                      }}
                      className="text-xs text-blue-400 hover:text-blue-300"
                    >
                      <Eye className="w-3.5 h-3.5 mr-1" />
                      <span>Inspect</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
