import React, { useState } from 'react';
import {
  FileSpreadsheet,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Building2,
  Users,
  Search,
  Zap,
  ArrowRight,
  ShieldCheck,
  Download
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/ToastContext';
import { MOCK_EXAMS, ExamItem } from '@/data/mockData';

interface ExaminationsModuleProps {
  onSelectDecision: (decisionId: string) => void;
  onRouteChange: (route: string) => void;
}

export const ExaminationsModule: React.FC<ExaminationsModuleProps> = ({
  onSelectDecision,
  onRouteChange
}) => {
  const { info, success } = useToast();
  const [exams, setExams] = useState<ExamItem[]>(MOCK_EXAMS);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredExams = exams.filter((e) =>
    e.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.roomCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.invigilator.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Examinations & Invigilation Cell
            </h1>
            <Badge variant="danger" size="sm" withDot>
              1 Seating Overflow Alert
            </Badge>
          </div>
          <p className="text-sm text-slate-400">
            Mid-term and end-term exam seating rosters, spacing compliance, and faculty invigilation assignments.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              info('Seating Roster Exported', 'Downloaded PDF seating charts for mid-term exams.');
            }}
            className="text-xs border-slate-700 text-slate-300"
          >
            <Download className="w-3.5 h-3.5 mr-1" />
            <span>Export Seating Chart</span>
          </Button>

          <Button
            variant="glow"
            size="sm"
            onClick={() => onSelectDecision('DEC-2026-085')}
            className="text-xs"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Resolve Hall B204 Overflow</span>
          </Button>
        </div>
      </div>

      {/* Overflow Alert Banner */}
      <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
          <div>
            <span className="font-bold text-white block mb-0.5">Hall B204 Capacity Exceeded:</span>
            <span className="text-slate-300">
              68 students enrolled for CS301 DBMS Mid-term in 60-seat Hall B204 (+8 overflow). Relocation to Hall A101 (120 seats) recommended.
            </span>
          </div>
        </div>
        <Button
          variant="glow"
          size="sm"
          onClick={() => onSelectDecision('DEC-2026-085')}
          className="shrink-0 text-xs"
        >
          <span>Open Relocation Plan</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          <input
            type="text"
            placeholder="Search exams, course codes, or invigilators..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Exams Table */}
      <Card className="border-slate-800 bg-slate-900/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400">
                <th className="p-3.5 font-semibold">Course & Code</th>
                <th className="p-3.5 font-semibold">Date & Window</th>
                <th className="p-3.5 font-semibold">Allocated Room</th>
                <th className="p-3.5 font-semibold">Seating Density</th>
                <th className="p-3.5 font-semibold">Invigilator</th>
                <th className="p-3.5 font-semibold">Audit Status</th>
                <th className="p-3.5 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredExams.map((exam) => {
                const isWarning = exam.status === 'Capacity Warning';

                return (
                  <tr
                    key={exam.id}
                    className={`transition-colors ${
                      isWarning ? 'bg-rose-950/20 hover:bg-rose-950/30' : 'hover:bg-slate-800/40'
                    }`}
                  >
                    <td className="p-3.5">
                      <div className="font-bold text-white">{exam.courseName}</div>
                      <span className="text-[11px] font-mono text-blue-400">{exam.courseCode}</span>
                    </td>

                    <td className="p-3.5 font-mono text-slate-300">
                      <div>{exam.date}</div>
                      <div className="text-[10px] text-slate-400">{exam.timeSlot}</div>
                    </td>

                    <td className="p-3.5 font-mono text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        <span>{exam.roomCode}</span>
                      </div>
                    </td>

                    <td className="p-3.5">
                      <div className="flex items-baseline gap-1 font-mono">
                        <span className={`text-sm font-black ${isWarning ? 'text-rose-400' : 'text-white'}`}>
                          {exam.enrolledStudents}
                        </span>
                        <span className="text-[10px] text-slate-500">/ {exam.capacity} capacity</span>
                      </div>
                      {isWarning && (
                        <span className="text-[10px] text-rose-400 font-semibold block mt-0.5">
                          +8 overflow
                        </span>
                      )}
                    </td>

                    <td className="p-3.5 text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        <span>{exam.invigilator}</span>
                      </div>
                    </td>

                    <td className="p-3.5">
                      <Badge variant={isWarning ? 'danger' : 'success'} size="sm" withDot>
                        {exam.status}
                      </Badge>
                    </td>

                    <td className="p-3.5 text-right">
                      {isWarning ? (
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => onSelectDecision('DEC-2026-085')}
                          className="text-xs"
                        >
                          Resolve Overflow
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => info('Exam verified', `${exam.courseCode} confirmed for ${exam.date}`)}
                          className="text-xs text-slate-400 hover:text-white"
                        >
                          Roster
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
