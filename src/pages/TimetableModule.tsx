import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  AlertTriangle,
  CheckCircle2,
  Filter,
  ArrowRight,
  Zap,
  Building2,
  Clock,
  Sparkles,
  Users
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/ToastContext';
import { TIMETABLE_SLOTS } from '@/data/mockData';

interface TimetableModuleProps {
  onSelectDecision: (decisionId: string) => void;
  onRouteChange: (route: string) => void;
}

export const TimetableModule: React.FC<TimetableModuleProps> = ({
  onSelectDecision,
  onRouteChange
}) => {
  const { info, success } = useToast();
  const [selectedBatch, setSelectedBatch] = useState('CS-A');
  const [selectedDay, setSelectedDay] = useState('All');

  const batches = ['CS-A', 'CS-B', 'IT-A', 'EC-A', 'ALL'];
  const days = ['All', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const filteredSlots = TIMETABLE_SLOTS.filter((s) => {
    const matchesBatch = selectedBatch === 'ALL' || s.batch === selectedBatch || s.batch === 'ALL';
    const matchesDay = selectedDay === 'All' || s.day === selectedDay;
    return matchesBatch && matchesDay;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Master Timetable Grid
            </h1>
            <Badge variant="danger" size="sm" withDot>
              1 Active Collision Flagged
            </Badge>
          </div>
          <p className="text-sm text-slate-400">
            Real-time schedule allocation across 320 weekly slots with dynamic conflict detection.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onRouteChange('what-if')}
            className="text-xs border-slate-700 text-slate-300"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Simulate Schedule Shift</span>
          </Button>

          <Button
            variant="glow"
            size="sm"
            onClick={() => onSelectDecision('DEC-2026-092')}
            className="text-xs"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Solve Active Lab 2 Conflict</span>
          </Button>
        </div>
      </div>

      {/* Active Conflict Callout Banner */}
      <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
          <div>
            <span className="font-bold text-white block mb-0.5">Active Conflict Detected:</span>
            <span className="text-slate-300">
              Lab 2 closure (Sep 20–24) affects CS-A DBMS practicals. 91% confident relocation path ready in Decision Center.
            </span>
          </div>
        </div>
        <Button
          variant="glow"
          size="sm"
          onClick={() => onSelectDecision('DEC-2026-092')}
          className="shrink-0 text-xs"
        >
          <span>Open Relocation Plan</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 mr-1">Select Batch:</span>
          {batches.map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBatch(b)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedBatch === b
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {b}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 mr-1">Day Filter:</span>
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
          >
            {days.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Timetable Slots Table / Grid */}
      <Card className="border-slate-800 bg-slate-900/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400">
                <th className="p-3.5 font-semibold">Day & Time</th>
                <th className="p-3.5 font-semibold">Batch</th>
                <th className="p-3.5 font-semibold">Subject & Activity</th>
                <th className="p-3.5 font-semibold">Allocated Room</th>
                <th className="p-3.5 font-semibold">Instructor</th>
                <th className="p-3.5 font-semibold">Schedule Status</th>
                <th className="p-3.5 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredSlots.map((slot, idx) => (
                <tr
                  key={idx}
                  className={`transition-colors ${
                    slot.hasConflict
                      ? 'bg-rose-950/20 hover:bg-rose-950/30'
                      : slot.isRecommendationTarget
                      ? 'bg-blue-950/20 hover:bg-blue-950/30'
                      : slot.isUnderutilized
                      ? 'bg-amber-950/10 hover:bg-amber-950/20'
                      : 'hover:bg-slate-800/40'
                  }`}
                >
                  <td className="p-3.5 font-mono">
                    <div className="font-bold text-white">{slot.day}</div>
                    <div className="text-[11px] text-slate-400">{slot.time}</div>
                  </td>

                  <td className="p-3.5">
                    <Badge variant="neutral" size="sm">
                      {slot.batch}
                    </Badge>
                  </td>

                  <td className="p-3.5">
                    <div className="font-bold text-white">{slot.subject}</div>
                    {slot.conflictReason && (
                      <span className="text-[10px] text-rose-400 font-semibold block mt-0.5">
                        {slot.conflictReason}
                      </span>
                    )}
                  </td>

                  <td className="p-3.5 font-mono text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>{slot.room}</span>
                    </div>
                  </td>

                  <td className="p-3.5 text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>{slot.faculty}</span>
                    </div>
                  </td>

                  <td className="p-3.5">
                    {slot.hasConflict ? (
                      <Badge variant="danger" size="sm" withDot>
                        Collision Active
                      </Badge>
                    ) : slot.isRecommendationTarget ? (
                      <Badge variant="primary" size="sm" withDot>
                        Target Relocation
                      </Badge>
                    ) : slot.isUnderutilized ? (
                      <Badge variant="warning" size="sm">
                        Buffer Window
                      </Badge>
                    ) : (
                      <Badge variant="success" size="sm">
                        Confirmed
                      </Badge>
                    )}
                  </td>

                  <td className="p-3.5 text-right">
                    {slot.hasConflict ? (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => onSelectDecision('DEC-2026-092')}
                        className="text-xs"
                      >
                        Review
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => info('Slot details', `${slot.subject} at ${slot.room} by ${slot.faculty}`)}
                        className="text-xs text-slate-400 hover:text-white"
                      >
                        Inspect
                      </Button>
                    )}
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
