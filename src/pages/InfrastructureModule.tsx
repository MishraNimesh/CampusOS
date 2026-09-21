import React, { useState } from 'react';
import {
  Building2,
  AlertTriangle,
  CheckCircle2,
  Search,
  Filter,
  Monitor,
  Wind,
  Tv,
  ArrowRight,
  Zap,
  Wrench
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/ToastContext';
import { MOCK_ROOMS, RoomItem } from '@/data/mockData';

interface InfrastructureModuleProps {
  onSelectDecision: (decisionId: string) => void;
  onRouteChange: (route: string) => void;
}

export const InfrastructureModule: React.FC<InfrastructureModuleProps> = ({
  onSelectDecision,
  onRouteChange
}) => {
  const { info } = useToast();
  const [rooms, setRooms] = useState<RoomItem[]>(MOCK_ROOMS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  const types = ['All', 'Computer Lab', 'Hardware Lab', 'Lecture Hall', 'Smart Classroom', 'Amphitheatre'];

  const filteredRooms = rooms.filter((r) => {
    const matchesType = selectedType === 'All' || r.type === selectedType;
    const matchesSearch =
      r.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.building.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Infrastructure & Facility Inventory
            </h1>
            <Badge variant="primary" size="sm">
              48 Monitored Spaces
            </Badge>
          </div>
          <p className="text-sm text-slate-400">
            Real-time tracking of workstation capacity, HVAC status, AV consoles, and scheduled maintenance windows.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onRouteChange('what-if')}
            className="text-xs border-slate-700 text-slate-300"
          >
            <Building2 className="w-3.5 h-3.5 text-blue-400" />
            <span>Simulate Outage</span>
          </Button>

          <Button
            variant="glow"
            size="sm"
            onClick={() => onSelectDecision('DEC-2026-092')}
            className="text-xs"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Lab 2 Maintenance Plan</span>
          </Button>
        </div>
      </div>

      {/* Maintenance Callout */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Wrench className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-white block mb-0.5">Active Maintenance Window:</span>
            <span className="text-slate-300">
              Lab 2 (50 workstations) is OFFLINE for scheduled electrical and network switch replacement (20–24 Sep).
            </span>
          </div>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onSelectDecision('DEC-2026-092')}
          className="text-xs border-slate-700 text-blue-400"
        >
          View Relocated Slots
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                selectedType === t
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          <input
            type="text"
            placeholder="Search rooms, labs, buildings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 w-64"
          />
        </div>
      </div>

      {/* Rooms Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRooms.map((room) => {
          const isMaint = room.status === 'Maintenance';
          const isConflict = room.status === 'Conflict';

          return (
            <Card
              key={room.id}
              hoverable
              onClick={() => info(`Room ${room.code}`, `${room.name} (${room.type}) • Capacity: ${room.capacity}`)}
              className={`p-5 flex flex-col justify-between transition-all cursor-pointer ${
                isMaint
                  ? 'border-amber-900/40 bg-slate-900/60'
                  : isConflict
                  ? 'border-rose-900/40 bg-slate-900/60'
                  : 'border-slate-800 bg-slate-900/80'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-blue-400">{room.code}</span>
                  <Badge
                    variant={isMaint ? 'warning' : isConflict ? 'danger' : room.status === 'In Use' ? 'purple' : 'success'}
                    size="sm"
                    withDot
                  >
                    {room.status}
                  </Badge>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white">{room.name}</h4>
                  <div className="text-[11px] text-slate-400">{room.building} • {room.floor}</div>
                </div>

                {/* Capacity & Util Bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Capacity: {room.capacity} seats</span>
                    <span className="text-white font-bold">{room.utilizationRate}% Util</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        room.utilizationRate > 85
                          ? 'bg-rose-500'
                          : room.utilizationRate > 60
                          ? 'bg-blue-500'
                          : 'bg-emerald-500'
                      }`}
                      style={{ width: `${room.utilizationRate}%` }}
                    />
                  </div>
                </div>

                {/* Hardware profile */}
                <div className="flex items-center gap-3 pt-2 text-[11px] text-slate-300 font-mono">
                  {room.workstations && (
                    <div className="flex items-center gap-1">
                      <Monitor className="w-3.5 h-3.5 text-blue-400" />
                      <span>{room.workstations} PCs</span>
                    </div>
                  )}
                  {room.hasAC && (
                    <div className="flex items-center gap-1">
                      <Wind className="w-3.5 h-3.5 text-emerald-400" />
                      <span>AC Active</span>
                    </div>
                  )}
                  {room.hasProjector && (
                    <div className="flex items-center gap-1">
                      <Tv className="w-3.5 h-3.5 text-purple-400" />
                      <span>AV Ready</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer current class */}
              <div className="pt-3 mt-3 border-t border-slate-800/80 text-[11px] text-slate-400 truncate">
                {room.currentClass || 'No active session'}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
