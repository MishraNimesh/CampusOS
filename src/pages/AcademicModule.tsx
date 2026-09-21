import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Calendar,
  Layers,
  Sparkles,
  Search,
  ArrowRight
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/ToastContext';

interface AcademicModuleProps {
  onSelectDecision: (decisionId: string) => void;
  onRouteChange: (route: string) => void;
}

export const AcademicModule: React.FC<AcademicModuleProps> = ({
  onSelectDecision,
  onRouteChange
}) => {
  const { info } = useToast();

  const courses = [
    {
      code: 'CS301',
      name: 'Database Management Systems',
      dept: 'Computer Engineering',
      faculty: 'Dr. Amit Mehta',
      progress: 68,
      targetProgress: 65,
      labHoursCompleted: 24,
      totalLabHoursRequired: 36,
      status: 'On Track'
    },
    {
      code: 'CS401',
      name: 'Machine Learning & Neural Networks',
      dept: 'Computer Engineering',
      faculty: 'Prof. Neha Kulkarni',
      progress: 72,
      targetProgress: 70,
      labHoursCompleted: 26,
      totalLabHoursRequired: 36,
      status: 'Ahead of Pace'
    },
    {
      code: 'CS202',
      name: 'Operating Systems & Concurrency',
      dept: 'Computer Engineering',
      faculty: 'Prof. Priya Sharma',
      progress: 62,
      targetProgress: 65,
      labHoursCompleted: 20,
      totalLabHoursRequired: 36,
      status: 'Minor Delay'
    },
    {
      code: 'EC302',
      name: 'Digital Signal Processing',
      dept: 'Electronics & Telecomm',
      faculty: 'Prof. Rajesh Iyer',
      progress: 70,
      targetProgress: 70,
      labHoursCompleted: 28,
      totalLabHoursRequired: 36,
      status: 'On Track'
    },
    {
      code: 'ME304',
      name: 'Thermodynamics & Heat Engines',
      dept: 'Mechanical Engineering',
      faculty: 'Prof. Vikram Patil',
      progress: 66,
      targetProgress: 65,
      labHoursCompleted: 22,
      totalLabHoursRequired: 36,
      status: 'On Track'
    }
  ];

  const deadlines = [
    { title: 'Odd Semester Mid-Term Examination', date: '24–30 Sep 2026', type: 'High Priority', daysLeft: 3 },
    { title: 'Continuous Internal Evaluation (CIE) Marks Submission', date: '08 Oct 2026', type: 'Compliance', daysLeft: 17 },
    { title: 'Final Year Major Project Synopsis Review', date: '15 Oct 2026', type: 'Academic', daysLeft: 24 }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Academic & Curriculum Pacing
            </h1>
            <Badge variant="success" size="sm" withDot>
              99.2% UGC Syllabus Compliance
            </Badge>
          </div>
          <p className="text-sm text-slate-400">
            Syllabus completion velocities, mandatory 36-hour practical lab audits, and accreditation milestones.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => info('Accreditation Audit Verified', 'All course credit hours are aligned with NBA/NAAC criteria.')}
            className="text-xs border-slate-700 text-slate-300"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-1" />
            <span>Verify Accreditation</span>
          </Button>

          <Button
            variant="glow"
            size="sm"
            onClick={() => onSelectDecision('DEC-2026-092')}
            className="text-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Audit Lab Credit Rules</span>
          </Button>
        </div>
      </div>

      {/* Pacing Overview & Deadlines Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Courses Progress Table */}
        <Card className="lg:col-span-2 border-slate-800 bg-slate-900/80 p-5">
          <CardHeader className="p-0 pb-4 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-sm font-bold text-white">
                Course Syllabus Completion Velocity
              </CardTitle>
              <CardDescription className="text-xs text-slate-400">
                Pacing against academic calendar milestones (Semester 5 & 7)
              </CardDescription>
            </div>
            <Badge variant="primary" size="sm">
              Odd Semester
            </Badge>
          </CardHeader>
          <CardContent className="p-0 pt-2 space-y-3">
            {courses.map((course) => (
              <div
                key={course.code}
                className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 hover:border-slate-700 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-blue-400">{course.code}</span>
                      <span className="text-xs font-bold text-white">{course.name}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {course.faculty} • {course.dept}
                    </div>
                  </div>

                  <Badge
                    variant={course.status === 'On Track' ? 'success' : course.status === 'Ahead of Pace' ? 'primary' : 'warning'}
                    size="sm"
                  >
                    {course.status}
                  </Badge>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-400">Syllabus Progress: {course.progress}%</span>
                    <span className="text-slate-400">
                      Lab Hours: {course.labHoursCompleted}/{course.totalLabHoursRequired}h
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        course.progress >= course.targetProgress ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Right: Academic Deadlines & Circulars */}
        <Card className="border-slate-800 bg-slate-900/80 p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-400" />
                <span>Upcoming Academic Milestones</span>
              </CardTitle>
              <CardDescription className="text-xs text-slate-400">
                Critical deadlines tracked by Academic Agent
              </CardDescription>
            </div>

            <div className="space-y-3">
              {deadlines.map((d, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{d.title}</span>
                    <span className="text-[10px] font-bold text-blue-400 font-mono">
                      {d.daysLeft}d left
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{d.date}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onRouteChange('communications')}
              className="w-full text-xs border-slate-700 text-slate-300"
            >
              <span>View Department Circulars</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
