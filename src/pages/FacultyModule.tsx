import React, { useState } from 'react';
import {
  Users,
  AlertTriangle,
  CheckCircle2,
  Search,
  Filter,
  ArrowRight,
  Zap,
  Scale,
  GraduationCap,
  Mail,
  Phone,
  Clock
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/ToastContext';
import { MOCK_FACULTY, FacultyMember } from '@/data/mockData';

interface FacultyModuleProps {
  onSelectDecision: (decisionId: string) => void;
  onRouteChange: (route: string) => void;
}

export const FacultyModule: React.FC<FacultyModuleProps> = ({
  onSelectDecision,
  onRouteChange
}) => {
  const { success } = useToast();
  const [facultyList, setFacultyList] = useState<FacultyMember[]>(MOCK_FACULTY);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyMember | null>(null);
  const [isRebalanceModalOpen, setIsRebalanceModalOpen] = useState(false);

  const departments = ['All', 'Computer Engineering', 'Information Technology', 'Electronics & Telecomm', 'Mechanical Engineering', 'Civil Engineering'];

  const filteredFaculty = facultyList.filter((f) => {
    const matchesDept = selectedDept === 'All' || f.department === selectedDept;
    const matchesSearch =
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.specialization.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesDept && matchesSearch;
  });

  const handleApplyRebalance = () => {
    setFacultyList((prev) =>
      prev.map((f) => {
        if (f.id === 'fac-1') return { ...f, totalHours: 18, teachingHours: 12, status: 'Healthy' as const };
        if (f.id === 'fac-2') return { ...f, totalHours: 18, teachingHours: 10, status: 'Healthy' as const };
        if (f.id === 'fac-4') return { ...f, totalHours: 18, labHours: 8, status: 'Healthy' as const };
        return f;
      })
    );
    setIsRebalanceModalOpen(false);
    success(
      'Faculty Workload Balanced',
      'Reallocated CS301 DBMS Lab and CS402 AI Lab. All professors are within UGC 18h limit.'
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Faculty Workload & Allocation
            </h1>
            <Badge variant="warning" size="sm">
              2 Overload Warnings
            </Badge>
          </div>
          <p className="text-sm text-slate-400">
            Monitor weekly contact hours, subject expertise matrices, research buffers, and UGC 18h compliance.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSelectDecision('DEC-2026-089')}
            className="text-xs border-slate-700 text-slate-300"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Open Rebalance Decision</span>
          </Button>

          <Button
            variant="glow"
            size="sm"
            onClick={() => setIsRebalanceModalOpen(true)}
            className="text-xs"
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Auto-Balance Workloads</span>
          </Button>
        </div>
      </div>

      {/* Overload Alert Banner */}
      <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
          <div>
            <span className="font-bold text-white block mb-0.5">Faculty Workload Threshold Alert:</span>
            <span className="text-slate-300">
              Dr. Amit Mehta (24h) and Prof. Neha Kulkarni (22h) exceed the recommended 18h ceiling.
            </span>
          </div>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setIsRebalanceModalOpen(true)}
          className="shrink-0 text-xs border-amber-800/60 hover:border-amber-500/60 text-amber-300"
        >
          Review Agent Redistribution
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
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
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          <input
            type="text"
            placeholder="Search faculty or specialization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 w-64"
          />
        </div>
      </div>

      {/* Faculty Table */}
      <Card className="border-slate-800 bg-slate-900/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400">
                <th className="p-3.5 font-semibold">Faculty Member</th>
                <th className="p-3.5 font-semibold">Department</th>
                <th className="p-3.5 font-semibold">Total Hours</th>
                <th className="p-3.5 font-semibold">Load Breakdown</th>
                <th className="p-3.5 font-semibold">Compliance Status</th>
                <th className="p-3.5 font-semibold">Specialization</th>
                <th className="p-3.5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredFaculty.map((faculty) => {
                const isOver = faculty.totalHours > faculty.maxThreshold;
                const isWarning = faculty.totalHours > 20;

                return (
                  <tr
                    key={faculty.id}
                    onClick={() => setSelectedFaculty(faculty)}
                    className="hover:bg-slate-800/40 transition-colors cursor-pointer group"
                  >
                    <td className="p-3.5">
                      <div className="font-bold text-white group-hover:text-blue-300">
                        {faculty.name}
                      </div>
                      <div className="text-[11px] text-slate-400">{faculty.designation}</div>
                    </td>

                    <td className="p-3.5 text-slate-300">{faculty.department}</td>

                    <td className="p-3.5">
                      <div className="flex items-baseline gap-1">
                        <span className={`text-base font-black font-mono ${isOver ? 'text-rose-400' : 'text-white'}`}>
                          {faculty.totalHours}h
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">/ {faculty.maxThreshold}h max</span>
                      </div>
                    </td>

                    <td className="p-3.5">
                      <div className="flex items-center gap-1.5 text-[11px] font-mono">
                        <span className="text-blue-400">{faculty.teachingHours}h Lec</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-emerald-400">{faculty.labHours}h Lab</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-400">{faculty.adminHours}h Admin</span>
                      </div>
                    </td>

                    <td className="p-3.5">
                      <Badge
                        variant={faculty.status === 'Overloaded' ? 'danger' : faculty.status === 'Warning' ? 'warning' : 'success'}
                        size="sm"
                        withDot
                      >
                        {faculty.status}
                      </Badge>
                    </td>

                    <td className="p-3.5">
                      <div className="flex items-center gap-1 flex-wrap">
                        {faculty.specialization.slice(0, 2).map((s, i) => (
                          <span
                            key={i}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="p-3.5 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFaculty(faculty);
                        }}
                        className="text-xs text-blue-400 hover:text-blue-300"
                      >
                        Details
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Faculty Profile Modal */}
      {selectedFaculty && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedFaculty(null)}
          title={selectedFaculty.name}
          description={`${selectedFaculty.designation} • ${selectedFaculty.department}`}
          size="md"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400">Total Teaching Load</span>
                <div className="text-xl font-bold text-white font-mono">{selectedFaculty.totalHours} hrs/week</div>
                <span className="text-[11px] text-slate-400">Threshold: {selectedFaculty.maxThreshold} hrs/week</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400">Contact</span>
                <div className="text-slate-200 truncate">{selectedFaculty.email}</div>
                <div className="text-slate-400 font-mono">{selectedFaculty.phone}</div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Assigned Courses this Semester
              </h4>
              <div className="space-y-1.5">
                {selectedFaculty.courses.map((c, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 flex items-center justify-between">
                    <span>{c}</span>
                    <Badge variant="primary" size="sm">Active Slot</Badge>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Certified Subject Specializations
              </h4>
              <div className="flex items-center gap-1.5 flex-wrap">
                {selectedFaculty.specialization.map((s, i) => (
                  <Badge key={i} variant="neutral" size="sm">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <Button variant="outline" size="sm" onClick={() => setSelectedFaculty(null)}>
                Close
              </Button>
              {selectedFaculty.status === 'Overloaded' && (
                <Button
                  variant="glow"
                  size="sm"
                  onClick={() => {
                    setSelectedFaculty(null);
                    onSelectDecision('DEC-2026-089');
                  }}
                >
                  <span>Open Redistribution Decision</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              )}
            </div>
          </div>
        </Modal>
      )}

      {/* Auto Rebalance Modal */}
      {isRebalanceModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setIsRebalanceModalOpen(false)}
          title="Auto-Rebalance Faculty Workloads"
          description="Synthesized workload redistribution generated by the Faculty & Academic Agents."
          size="lg"
        >
          <div className="space-y-5">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Proposed Reallocation Changes
              </h4>
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-white">CS301 Database Systems Lab (4h)</div>
                    <div className="text-slate-400">Dr. Amit Mehta (24h → 18h) → Prof. Priya Sharma (14h → 18h)</div>
                  </div>
                  <Badge variant="success" size="sm">UGC Compliant</Badge>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-white">CS402 Machine Learning Lab Tutorial (2h)</div>
                    <div className="text-slate-400">Prof. Neha Kulkarni (22h → 18h) → Dr. Rahul Joshi (16h → 18h)</div>
                  </div>
                  <Badge variant="success" size="sm">Domain Matched</Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <Button variant="outline" size="sm" onClick={() => setIsRebalanceModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="glow" size="sm" onClick={handleApplyRebalance}>
                <span>Approve & Apply Redistribution</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
