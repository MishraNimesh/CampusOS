import React, { useState } from 'react';
import {
  Briefcase,
  GraduationCap,
  CheckCircle2,
  Search,
  Building2,
  DollarSign,
  Users,
  Send,
  Sparkles,
  Download,
  Calendar
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/ToastContext';
import { MOCK_DRIVES, PlacementDrive } from '@/data/mockData';

interface PlacementsModuleProps {
  onRouteChange: (route: string) => void;
}

export const PlacementsModule: React.FC<PlacementsModuleProps> = ({ onRouteChange }) => {
  const { success, info } = useToast();
  const [drives, setDrives] = useState<PlacementDrive[]>(MOCK_DRIVES);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDrives = drives.filter(
    (d) =>
      d.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNotifyEligible = (drive: PlacementDrive) => {
    success(
      'Circular Broadcasted',
      `Sent automated placement registration circular to ${drive.eligibleStudentsCount} eligible students.`
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Training & Placement Cell
            </h1>
            <Badge variant="success" size="sm" withDot>
              336 Verified Candidates
            </Badge>
          </div>
          <p className="text-sm text-slate-400">
            Corporate recruitment drives, automated eligibility filtering, and skill readiness telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => info('Placement Roster Exported', 'Exported eligible candidate master database.')}
            className="text-xs border-slate-700 text-slate-300"
          >
            <Download className="w-3.5 h-3.5 mr-1" />
            <span>Export Roster</span>
          </Button>

          <Button
            variant="glow"
            size="sm"
            onClick={() => info('Placement Agent Triggered', 'Synchronized student CGPAs and backlog records with Examination Cell.')}
            className="text-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Audit Eligibility</span>
          </Button>
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
          <div className="text-2xl font-black text-white font-mono">4</div>
          <div className="text-xs text-slate-400 mt-1">Active Drives</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
          <div className="text-2xl font-black text-emerald-400 font-mono">28.5 LPA</div>
          <div className="text-xs text-slate-400 mt-1">Highest Offer (Microsoft)</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
          <div className="text-2xl font-black text-blue-400 font-mono">336</div>
          <div className="text-xs text-slate-400 mt-1">Eligible Final Years</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
          <div className="text-2xl font-black text-purple-400 font-mono">94%</div>
          <div className="text-xs text-slate-400 mt-1">Placement Index Target</div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
        <input
          type="text"
          placeholder="Search placement drives or companies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Drives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDrives.map((drive) => (
          <Card key={drive.id} className="p-5 border-slate-800 bg-slate-900/80 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">{drive.company}</h3>
                  <div className="text-xs text-slate-400">{drive.role}</div>
                </div>
                <div className="text-right">
                  <div className="text-base font-black text-emerald-400 font-mono">
                    ₹{drive.packageLPA} LPA
                  </div>
                  <Badge variant="primary" size="sm">
                    {drive.status}
                  </Badge>
                </div>
              </div>

              {/* Criteria */}
              <div className="grid grid-cols-3 gap-2 text-xs pt-1">
                <div className="p-2 rounded bg-slate-950 border border-slate-800 text-center">
                  <span className="text-slate-400 text-[10px] block">Min CGPA</span>
                  <span className="font-bold text-white font-mono">{drive.eligibilityCGPA}</span>
                </div>
                <div className="p-2 rounded bg-slate-950 border border-slate-800 text-center">
                  <span className="text-slate-400 text-[10px] block">Max Backlogs</span>
                  <span className="font-bold text-white font-mono">{drive.maxBacklogs}</span>
                </div>
                <div className="p-2 rounded bg-slate-950 border border-slate-800 text-center">
                  <span className="text-slate-400 text-[10px] block">Drive Date</span>
                  <span className="font-bold text-white font-mono">{drive.driveDate}</span>
                </div>
              </div>

              {/* Eligible branches */}
              <div className="space-y-1">
                <span className="text-[10px] font-semibold text-slate-400 uppercase">Target Branches:</span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {drive.targetBranches.map((b, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Action */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
              <div className="text-slate-400 font-mono">
                <strong className="text-blue-400">{drive.eligibleStudentsCount}</strong> eligible students
              </div>
              <Button
                variant="glow"
                size="sm"
                onClick={() => handleNotifyEligible(drive)}
                className="text-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Notify Candidates</span>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
