import React, { useState, useEffect } from 'react';
import {
  Search,
  Zap,
  Sparkles,
  Users,
  Building2,
  Calendar,
  GraduationCap,
  ArrowRight,
  HelpCircle,
  FileText
} from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { MOCK_DECISIONS, MOCK_FACULTY, MOCK_ROOMS, PREBAKED_NL_QUERIES } from '@/data/mockData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onRouteChange: (route: string) => void;
  onSelectDecision?: (decisionId: string) => void;
  onSelectQuery?: (queryText: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onRouteChange,
  onSelectDecision,
  onSelectQuery
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled by parent, or toggle
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleNavigate = (route: string) => {
    onRouteChange(route);
    onClose();
    setSearchTerm('');
  };

  const handleDecision = (id: string) => {
    if (onSelectDecision) {
      onSelectDecision(id);
    } else {
      onRouteChange(`decisions/${id}`);
    }
    onClose();
    setSearchTerm('');
  };

  const handleQuery = (query: string) => {
    if (onSelectQuery) {
      onSelectQuery(query);
    }
    onRouteChange('dashboard');
    onClose();
    setSearchTerm('');
  };

  // Filtered lists
  const filteredDecisions = MOCK_DECISIONS.filter(
    (d) =>
      d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.problem.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFaculty = MOCK_FACULTY.filter(
    (f) =>
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.specialization.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredRooms = MOCK_ROOMS.filter(
    (r) =>
      r.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredQueries = PREBAKED_NL_QUERIES.filter((q) =>
    q.query.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" className="p-0 border-slate-700 bg-slate-900 shadow-2xl">
      <div className="flex flex-col">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 p-4 border-b border-slate-800 bg-slate-950/60">
          <Search className="w-5 h-5 text-blue-400 shrink-0" />
          <input
            type="text"
            placeholder="Type a command, query, faculty name, room code, or decision ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
          />
          <kbd className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400">
            ESC
          </kbd>
        </div>

        {/* Results Body */}
        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-5">
          {/* Quick Actions / Shortcuts when search is empty */}
          {!searchTerm && (
            <div className="space-y-4">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Recommended Queries & Actions
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={() => handleQuery('Which classrooms are underutilized this week?')}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-800 text-left transition-all group cursor-pointer"
                  >
                    <HelpCircle className="w-4 h-4 text-blue-400 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="text-xs font-semibold text-white">Underutilized Classrooms</div>
                      <p className="text-[11px] text-slate-400">Analyze Friday low occupancy</p>
                    </div>
                  </button>

                  <button
                    onClick={() => handleQuery('Who is overloaded this semester?')}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-800 text-left transition-all group cursor-pointer"
                  >
                    <Users className="w-4 h-4 text-amber-400 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="text-xs font-semibold text-white">Faculty Overload Check</div>
                      <p className="text-[11px] text-slate-400">Review 18h teaching threshold</p>
                    </div>
                  </button>

                  <button
                    onClick={() => handleDecision('DEC-2026-092')}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-800 text-left transition-all group cursor-pointer"
                  >
                    <Zap className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="text-xs font-semibold text-white">Open Lab 2 Decision</div>
                      <p className="text-[11px] text-slate-400">Recommendation ready (91%)</p>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavigate('what-if')}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-800 text-left transition-all group cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-purple-400 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="text-xs font-semibold text-white">What-If Simulator</div>
                      <p className="text-[11px] text-slate-400">Simulate outages & enrollment</p>
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Direct Module Navigation
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'dashboard', label: 'Dashboard', icon: Zap },
                    { id: 'faculty', label: 'Faculty Workload', icon: Users },
                    { id: 'timetable', label: 'Timetable Grid', icon: Calendar },
                    { id: 'infrastructure', label: 'Infrastructure & Labs', icon: Building2 },
                    { id: 'examinations', label: 'Examinations', icon: FileText },
                    { id: 'placements', label: 'Placements', icon: GraduationCap }
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavigate(item.id)}
                        className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/40 hover:bg-slate-800/60 border border-slate-800/60 text-xs text-slate-300 hover:text-white transition-all text-left cursor-pointer"
                      >
                        <Icon className="w-3.5 h-3.5 text-slate-400" />
                        <span className="truncate">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Search Results */}
          {searchTerm && (
            <div className="space-y-4">
              {/* Decisions */}
              {filteredDecisions.length > 0 && (
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-blue-400" />
                    <span>Decisions ({filteredDecisions.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {filteredDecisions.map((d) => (
                      <button
                        key={d.id}
                        onClick={() => handleDecision(d.id)}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-800 text-left transition-all group cursor-pointer"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs text-blue-400 font-semibold">{d.id}</span>
                            <span className="text-xs font-semibold text-white group-hover:text-blue-300">{d.title}</span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{d.problem}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Natural Language Queries */}
              {filteredQueries.length > 0 && (
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
                    <span>Natural Language Analysis Queries</span>
                  </div>
                  <div className="space-y-1.5">
                    {filteredQueries.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuery(q.query)}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-800 text-left transition-all group cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <HelpCircle className="w-4 h-4 text-purple-400 shrink-0" />
                          <span className="text-xs font-medium text-slate-200 group-hover:text-white">{q.query}</span>
                        </div>
                        <span className="text-[10px] text-blue-400 font-medium">Ask Engine</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Faculty */}
              {filteredFaculty.length > 0 && (
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-amber-400" />
                    <span>Faculty ({filteredFaculty.length})</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {filteredFaculty.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => handleNavigate('faculty')}
                        className="flex items-center justify-between p-2 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-800 text-left transition-all cursor-pointer"
                      >
                        <div>
                          <div className="text-xs font-semibold text-white">{f.name}</div>
                          <div className="text-[11px] text-slate-400">{f.department} • {f.totalHours}h load</div>
                        </div>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                            f.status === 'Overloaded'
                              ? 'bg-rose-950 text-rose-300'
                              : f.status === 'Warning'
                              ? 'bg-amber-950 text-amber-300'
                              : 'bg-emerald-950 text-emerald-300'
                          }`}
                        >
                          {f.status}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Rooms & Labs */}
              {filteredRooms.length > 0 && (
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Rooms & Labs ({filteredRooms.length})</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {filteredRooms.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => handleNavigate('infrastructure')}
                        className="flex items-center justify-between p-2 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-800 text-left transition-all cursor-pointer"
                      >
                        <div>
                          <div className="text-xs font-semibold text-white">{r.code} - {r.name}</div>
                          <div className="text-[11px] text-slate-400">{r.type} • Cap: {r.capacity}</div>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">{r.utilizationRate}% Util</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
