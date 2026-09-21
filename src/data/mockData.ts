export interface AgentInfo {
  id: string;
  name: string;
  role: string;
  specialization: string;
  status: 'active' | 'analyzing' | 'idle';
  lastActivity: string;
  precisionScore: number;
  watchedConstraints: string[];
  recentDecisionsCount: number;
  icon: string;
  description: string;
}

export interface DecisionConstraint {
  text: string;
  type: 'hard' | 'soft';
  status: 'met' | 'violated' | 'relaxed';
}

export interface EvidenceSource {
  title: string;
  updated: string;
  source: string;
  verified: boolean;
  recordCount: string;
  summary: string;
}

export interface AlternativeOption {
  id: string;
  name: string;
  isRecommended: boolean;
  action: string;
  impactLevel: 'Low Disruption' | 'Medium Disruption' | 'High Disruption';
  changesRequired: number;
  constraintViolations: number;
  facultyImpact: string;
  studentSatisfaction: string;
  pros: string[];
  cons: string[];
}

export interface DecisionItem {
  id: string;
  title: string;
  problem: string;
  status: 'Analyzing' | 'Ready for Review' | 'Approved' | 'Implemented';
  priority: 'High' | 'Medium' | 'Low';
  department: string;
  impactRisk: 'Low Risk' | 'Medium Risk' | 'High Risk';
  confidenceScore: number;
  createdDate: string;
  affectedScope: {
    sessions: number;
    students: number;
    faculty: number;
    alternativeRooms: number;
    availableLabs: number;
  };
  agentsInvolved: {
    id: string;
    name: string;
    icon: string;
    role: string;
    status: 'done' | 'processing';
  }[];
  workflowSteps: {
    step: number;
    name: string;
    status: 'completed' | 'in-progress' | 'pending';
    detail: string;
    agent: string;
  }[];
  constraints: string[];
  recommendedAction: {
    title: string;
    summary: string;
    confidence: number;
    expectedImpact: string[];
    whyExplanation: string[];
    evidenceSources: EvidenceSource[];
  };
  alternatives: AlternativeOption[];
}

export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  department: string;
  totalHours: number;
  teachingHours: number;
  labHours: number;
  adminHours: number;
  maxThreshold: number;
  status: 'Healthy' | 'Warning' | 'Overloaded';
  specialization: string[];
  courses: string[];
  email: string;
  phone: string;
  leaveDays: number;
}

export interface RoomItem {
  id: string;
  code: string;
  name: string;
  building: string;
  floor: string;
  type: 'Computer Lab' | 'Hardware Lab' | 'Lecture Hall' | 'Smart Classroom' | 'Amphitheatre';
  capacity: number;
  utilizationRate: number;
  hasAC: boolean;
  hasProjector: boolean;
  workstations?: number;
  status: 'Available' | 'In Use' | 'Maintenance' | 'Conflict';
  currentClass?: string;
}

export interface ExamItem {
  id: string;
  courseCode: string;
  courseName: string;
  department: string;
  date: string;
  timeSlot: string;
  roomCode: string;
  capacity: number;
  enrolledStudents: number;
  invigilator: string;
  status: 'Confirmed' | 'Capacity Warning' | 'Invigilator Needed';
}

export interface PlacementDrive {
  id: string;
  company: string;
  packageLPA: number;
  role: string;
  eligibilityCGPA: number;
  maxBacklogs: number;
  targetBranches: string[];
  driveDate: string;
  eligibleStudentsCount: number;
  registeredCount: number;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
}

export interface NotificationItem {
  id: string;
  type: 'high' | 'medium' | 'info';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  category: 'Timetable' | 'Faculty' | 'Exam' | 'Placement' | 'System';
  actionPath?: string;
  decisionId?: string;
}

// ----------------------------------------------------
// MOCK DATA STORE
// ----------------------------------------------------

export const CAMPUS_AGENTS: AgentInfo[] = [
  {
    id: 'academic',
    name: 'Academic Agent',
    role: 'Course Progression & Curriculum Rules',
    specialization: 'Audits course syllabus pace, minimum lab hours, accreditation mandates, and prerequisite chains.',
    status: 'active',
    lastActivity: '2 mins ago',
    precisionScore: 99.2,
    watchedConstraints: ['Min 36h Lab/Sem', 'Credit load limits', 'Prerequisite verification'],
    recentDecisionsCount: 14,
    icon: 'GraduationCap',
    description: 'Tracks course syllabus completion velocity and credit compliance across all 6 departments.'
  },
  {
    id: 'faculty',
    name: 'Faculty Agent',
    role: 'Workload & Availability Optimization',
    specialization: 'Monitors teaching hours, research buffer, subject expertise matrix, and leaves.',
    status: 'active',
    lastActivity: '4 mins ago',
    precisionScore: 98.7,
    watchedConstraints: ['Max 18 teaching hrs/wk', 'Consecutive slot buffer', 'Domain expertise match'],
    recentDecisionsCount: 19,
    icon: 'Users',
    description: 'Prevents faculty burnout and matches faculty subject specializations to lecture assignments.'
  },
  {
    id: 'timetable',
    name: 'Timetable Agent',
    role: 'Clash Detection & Dynamic Rescheduling',
    specialization: 'Continuously searches for slot collisions, room overbookings, and optimal swap paths.',
    status: 'active',
    lastActivity: '1 min ago',
    precisionScore: 99.8,
    watchedConstraints: ['Zero student overlaps', 'Room travel time buffer', 'Balanced daily spread'],
    recentDecisionsCount: 28,
    icon: 'Calendar',
    description: 'Scans 320 weekly class slots in real time to prevent collisions and resolve sudden room closures.'
  },
  {
    id: 'infra',
    name: 'Infrastructure Agent',
    role: 'Facility Capacity & Maintenance Sentinel',
    specialization: 'Tracks lab hardware health, software environments, seating capacity, and HVAC load.',
    status: 'active',
    lastActivity: '3 mins ago',
    precisionScore: 97.9,
    watchedConstraints: ['Capacity >= class size', 'Hardware GPU/RAM profile', 'Maintenance outage schedules'],
    recentDecisionsCount: 12,
    icon: 'Building2',
    description: 'Guarantees that rooms assigned have sufficient working workstations and instructional AV gear.'
  },
  {
    id: 'exam',
    name: 'Examination Agent',
    role: 'Seating Planning & Invigilation Audit',
    specialization: 'Manages hall ticket seating rosters, invigilation duty distribution, and conflict prevention.',
    status: 'active',
    lastActivity: '6 mins ago',
    precisionScore: 99.4,
    watchedConstraints: ['1 student per bench spacing', 'No department invigilation bias', 'Zero paper clash'],
    recentDecisionsCount: 9,
    icon: 'FileSpreadsheet',
    description: 'Automates mid-term and end-term exam seating charts with fair invigilator rotations.'
  },
  {
    id: 'placement',
    name: 'Placement Agent',
    role: 'Eligibility Audit & Drive Preparedness',
    specialization: 'Evaluates candidate student pools against company cutoffs, CGPA rules, and coding readiness.',
    status: 'active',
    lastActivity: '8 mins ago',
    precisionScore: 98.1,
    watchedConstraints: ['CGPA cutoffs', 'Active backlog filter', 'Branch eligibility rules'],
    recentDecisionsCount: 7,
    icon: 'Briefcase',
    description: 'Screens eligible students for top recruitment drives and flags skill preparation gaps.'
  },
  {
    id: 'communication',
    name: 'Communication Agent',
    role: 'Multi-Channel Circulars & Dispatch',
    specialization: 'Generates concise circulars, sends SMS/Email alerts for critical timetable shifts and exams.',
    status: 'active',
    lastActivity: '11 mins ago',
    precisionScore: 99.0,
    watchedConstraints: ['Target audience verification', 'Emergency dispatch SLA < 5m', 'Approval audit log'],
    recentDecisionsCount: 16,
    icon: 'Megaphone',
    description: 'Ensures zero communication breakdown between administration, faculty, and students.'
  },
  {
    id: 'orchestrator',
    name: 'Multi-Agent Orchestrator',
    role: 'Cross-Domain Constraint Solver & Decision Engine',
    specialization: 'Synthesizes competing constraints from all agents to recommend Pareto-optimal actions.',
    status: 'active',
    lastActivity: '30 secs ago',
    precisionScore: 99.6,
    watchedConstraints: ['Global Pareto optimality', 'Minimum operational disruption', 'Full audit trail'],
    recentDecisionsCount: 42,
    icon: 'Cpu',
    description: 'The master reasoning engine combining data, constraints, and alternatives into clear recommendations.'
  }
];

export const MOCK_DECISIONS: DecisionItem[] = [
  {
    id: 'DEC-2026-092',
    title: 'Reschedule CS-A after Lab 2 closure',
    problem: 'Lab 2 will be unavailable from 20–24 September due to critical UPS maintenance and switch replacement, affecting 6 scheduled practical sessions for 42 students.',
    status: 'Ready for Review',
    priority: 'High',
    department: 'Computer Engineering',
    impactRisk: 'Low Risk',
    confidenceScore: 91,
    createdDate: '20 Sep 2026',
    affectedScope: {
      sessions: 6,
      students: 42,
      faculty: 3,
      alternativeRooms: 4,
      availableLabs: 2
    },
    agentsInvolved: [
      { id: 'academic', name: 'Academic Agent', icon: 'GraduationCap', role: 'Verified mandatory 36h lab syllabus compliance', status: 'done' },
      { id: 'timetable', name: 'Timetable Agent', icon: 'Calendar', role: 'Analyzed 48 candidate time slots & collision matrices', status: 'done' },
      { id: 'faculty', name: 'Faculty Agent', icon: 'Users', role: 'Verified Dr. Mehta & Prof. Sharma availability window', status: 'done' },
      { id: 'infra', name: 'Infrastructure Agent', icon: 'Building2', role: 'Audited Lab 4 & Lab 5 hardware specs & software stack', status: 'done' }
    ],
    workflowSteps: [
      { step: 1, name: 'Problem Ingested', status: 'completed', detail: 'Lab 2 marked OFFLINE (20-24 Sep) for maintenance', agent: 'Infrastructure Agent' },
      { step: 2, name: 'Context Gathered', status: 'completed', detail: 'Extracted CS-A Database Systems, 42 enrolled students, Dr. Amit Mehta', agent: 'Academic Agent' },
      { step: 3, name: 'Timetable Analysis', status: 'completed', detail: 'Scanned 48 candidate slots across Tue-Fri without collisions', agent: 'Timetable Agent' },
      { step: 4, name: 'Infrastructure Constraints', status: 'completed', detail: 'Filtered for Lab capacity >= 42 and Oracle/PostgreSQL environment', agent: 'Infrastructure Agent' },
      { step: 5, name: 'Faculty Availability', status: 'completed', detail: 'Checked Dr. Mehta weekly load limit (<18h threshold)', agent: 'Faculty Agent' },
      { step: 6, name: 'Validation & Ranking', status: 'completed', detail: 'Ranked 3 alternative candidate solutions based on disruption impact', agent: 'Multi-Agent Orchestrator' },
      { step: 7, name: 'Recommendation Ready', status: 'completed', detail: 'Synthesized Option A with 91% confidence score and verified evidence', agent: 'Multi-Agent Orchestrator' }
    ],
    constraints: [
      'No faculty timetable overlap for Dr. Amit Mehta',
      'Room workstation capacity ≥ 40 active seats',
      'DBMS software stack (PostgreSQL + Oracle Client) pre-installed',
      'Maintain required 4 credits weekly academic hours without syllabus lag',
      'Zero clash with CS-A elective courses (Machine Learning, Cloud Computing)'
    ],
    recommendedAction: {
      title: 'Move CS-A Database Systems from Lab 2 → Lab 4 on Tuesday 10:00–12:00 and shift the existing Lab 4 session to Thursday 2:00–4:00.',
      summary: 'Relocates the 6 sessions to underutilized Lab 4 slot with 1 minor secondary swap, preserving student and faculty schedules with zero violations.',
      confidence: 91,
      expectedImpact: [
        'Zero student timetable conflicts across all 42 enrolled students',
        'Zero faculty conflicts (Dr. Amit Mehta workload remains within limits)',
        'Workstation capacity maintained (Lab 4 has 48 high-spec terminals)',
        'Minimal campus schedule disruption (only 2 total timetable slot shifts)'
      ],
      whyExplanation: [
        'Lab 4 is completely idle on Tuesday 10:00–12:00 and already has PostgreSQL & Oracle clients installed.',
        'Lab 4 capacity (48 workstations) comfortably accommodates the 42 students of CS-A.',
        'Dr. Amit Mehta has no prior teaching, lab, or committee commitment during this slot.',
        'Only two timetable adjustments are required across the entire engineering timetable.'
      ],
      evidenceSources: [
        {
          title: 'Timetable Master Database',
          updated: 'Today 09:32 AM',
          source: 'CampusOS Timetable Engine v4.2',
          verified: true,
          recordCount: '320 active slots scanned',
          summary: 'Verified 0 slot overlaps for Batch CS-A on Tuesday 10:00-12:00 slot.'
        },
        {
          title: 'Room & Lab Availability Registry',
          updated: 'Today 09:28 AM',
          source: 'Infrastructure IoT / Smart Booking Grid',
          verified: true,
          recordCount: 'Lab 4 verified vacant',
          summary: 'Lab 4 occupancy sensor indicates 0% reservation during target window.'
        },
        {
          title: 'Faculty Availability & Workload Log',
          updated: 'Today 09:15 AM',
          source: 'Faculty Information System',
          verified: true,
          recordCount: 'Dr. Mehta: 0 overlaps',
          summary: 'Confirmed Dr. Mehta has 2h preparation buffer preceding this slot.'
        },
        {
          title: 'Academic Calendar & Credit Directives',
          updated: 'Academic Year 2026–27',
          source: 'Dean Academic Affairs Regulations',
          verified: true,
          recordCount: 'Mandatory 36h lab mandate',
          summary: 'Accreditation minimum contact hours upheld without weekend makeup sessions.'
        }
      ]
    },
    alternatives: [
      {
        id: 'opt-a',
        name: 'Option A — Recommended',
        isRecommended: true,
        action: 'Move CS-A to Lab 4 (Tuesday 10:00–12:00)',
        impactLevel: 'Low Disruption',
        changesRequired: 2,
        constraintViolations: 0,
        facultyImpact: '0 hours change in weekly load',
        studentSatisfaction: '98%',
        pros: ['Zero timetable conflicts', 'Identical lab hardware profile', 'No weekend classes needed'],
        cons: ['Shifts 1 junior batch lab session to Thursday afternoon']
      },
      {
        id: 'opt-b',
        name: 'Option B',
        isRecommended: false,
        action: 'Move CS-A to Lab 5 (Wednesday 14:00–16:00)',
        impactLevel: 'Medium Disruption',
        changesRequired: 4,
        constraintViolations: 0,
        facultyImpact: '+2 consecutive teaching hours for Dr. Mehta',
        studentSatisfaction: '84%',
        pros: ['Leaves Lab 4 schedule untouched for junior years'],
        cons: ['Requires 4 cascading class shifts', 'Dr. Mehta has 4 hours consecutive lab load']
      },
      {
        id: 'opt-c',
        name: 'Option C',
        isRecommended: false,
        action: 'Move practical session to Online Virtual Lab',
        impactLevel: 'High Disruption',
        changesRequired: 1,
        constraintViolations: 1,
        facultyImpact: 'Additional virtual sandbox configuration required',
        studentSatisfaction: '62%',
        pros: ['No physical room booking needed'],
        cons: ['Violates Dean Academic in-person accreditation lab guidelines (1 violation)', 'Reduced hands-on hardware exposure']
      }
    ]
  },
  {
    id: 'DEC-2026-089',
    title: 'Redistribute Faculty Workload for Semester 5',
    problem: 'Dr. Amit Mehta (24h) and Prof. Neha Kulkarni (22h) exceed the institute 18-hour weekly teaching ceiling, while two junior assistant professors have spare capacity.',
    status: 'Ready for Review',
    priority: 'Medium',
    department: 'Computer Engineering',
    impactRisk: 'Low Risk',
    confidenceScore: 88,
    createdDate: '19 Sep 2026',
    affectedScope: {
      sessions: 4,
      students: 120,
      faculty: 4,
      alternativeRooms: 2,
      availableLabs: 3
    },
    agentsInvolved: [
      { id: 'faculty', name: 'Faculty Agent', icon: 'Users', role: 'Audited weekly teaching hours & research leaves', status: 'done' },
      { id: 'academic', name: 'Academic Agent', icon: 'GraduationCap', role: 'Matched syllabus requirements with professor domains', status: 'done' }
    ],
    workflowSteps: [
      { step: 1, name: 'Overload Flagged', status: 'completed', detail: 'Dr. Mehta (24h) and Prof. Kulkarni (22h) detected above 18h ceiling', agent: 'Faculty Agent' },
      { step: 2, name: 'Expertise Matching', status: 'completed', detail: 'Identified Prof. Priya Sharma as qualified for DBMS Lab (4h)', agent: 'Academic Agent' },
      { step: 3, name: 'Rebalance Optimization', status: 'completed', detail: 'Generated balanced distribution: Dr. Mehta 18h, Prof. Sharma 18h', agent: 'Multi-Agent Orchestrator' }
    ],
    constraints: [
      'Maintain maximum 18 hours per faculty per week',
      'Instructor must have approved subject specialization domain',
      'No disruption to student course registration'
    ],
    recommendedAction: {
      title: 'Transfer CS-A DBMS Lab (4h) to Prof. Priya Sharma and reallocate Cloud Computing tutorial (2h) to Prof. Rahul Joshi.',
      summary: 'Brings Dr. Mehta to exactly 18h and Prof. Kulkarni to 18h while optimizing junior faculty teaching portfolio.',
      confidence: 88,
      expectedImpact: [
        'Dr. Mehta load reduced from 24h -> 18h (100% compliant with UGC guidelines)',
        'Prof. Kulkarni load reduced from 22h -> 18h',
        'Prof. Sharma teaching portfolio enriched with DBMS accreditation credit'
      ],
      whyExplanation: [
        'Prof. Priya Sharma has 4 years of verified DBMS teaching experience and 4 available hours.',
        'Zero timetable changes required for students (same slots, verified instructor substitution).',
        'Restores research and PhD guidance buffer for senior faculty.'
      ],
      evidenceSources: [
        { title: 'Faculty Workload Ledger', updated: 'Today 08:45 AM', source: 'ERP Faculty Module', verified: true, recordCount: '8 professors analyzed', summary: 'Overload violation confirmed for 2 professors.' },
        { title: 'Subject Competency Matrix', updated: '15 Aug 2026', source: 'Academic Board Records', verified: true, recordCount: 'Domain match verified', summary: 'Prof. Sharma holds Master of Engg in Database Systems.' }
      ]
    },
    alternatives: [
      {
        id: 'opt-w1',
        name: 'Option A — Recommended',
        isRecommended: true,
        action: 'Reallocate 4h DBMS Lab to Prof. Priya Sharma',
        impactLevel: 'Low Disruption',
        changesRequired: 1,
        constraintViolations: 0,
        facultyImpact: 'Perfect balance across 4 faculty',
        studentSatisfaction: '95%',
        pros: ['Zero student schedule change', 'Full UGC compliance'],
        cons: ['Prof. Sharma takes on additional lab grading load']
      },
      {
        id: 'opt-w2',
        name: 'Option B',
        isRecommended: false,
        action: 'Hire External Guest Lecturer for 6 hours',
        impactLevel: 'Medium Disruption',
        changesRequired: 2,
        constraintViolations: 0,
        facultyImpact: 'No load for internal faculty',
        studentSatisfaction: '78%',
        pros: ['Leaves internal faculty loads light'],
        cons: ['Additional departmental budget expenditure', 'Onboarding delay of 10 days']
      }
    ]
  },
  {
    id: 'DEC-2026-085',
    title: 'Resolve Exam Seating Overflow in Hall B204',
    problem: 'Mid-Term CS301 examination in Hall B204 has 68 registered examinees against a 60-seat capacity limit (8 student overflow).',
    status: 'Ready for Review',
    priority: 'High',
    department: 'Examination Cell',
    impactRisk: 'Medium Risk',
    confidenceScore: 94,
    createdDate: '18 Sep 2026',
    affectedScope: {
      sessions: 1,
      students: 68,
      faculty: 2,
      alternativeRooms: 3,
      availableLabs: 1
    },
    agentsInvolved: [
      { id: 'exam', name: 'Examination Agent', icon: 'FileSpreadsheet', role: 'Identified 8-seat overflow in Hall B204', status: 'done' },
      { id: 'infra', name: 'Infrastructure Agent', icon: 'Building2', role: 'Located available Hall A101 (capacity 120)', status: 'done' }
    ],
    workflowSteps: [
      { step: 1, name: 'Overflow Detected', status: 'completed', detail: '68 examinees assigned to 60-seat Hall B204', agent: 'Examination Agent' },
      { step: 2, name: 'Room Query', status: 'completed', detail: 'Queried vacant halls with capacity >= 70 on Sep 24 10:00 AM', agent: 'Infrastructure Agent' },
      { step: 3, name: 'Recommendation Synthesized', status: 'completed', detail: 'Move CS301 to Hall A101 with single invigilator adjustment', agent: 'Multi-Agent Orchestrator' }
    ],
    constraints: [
      'Maintain 1-student per desk anti-cheating distance',
      'Assigned room must be in same academic block to prevent student confusion',
      'Invigilator duty must be notified 48h prior'
    ],
    recommendedAction: {
      title: 'Move Mid-Term CS301 exam from Hall B204 to Main Amphitheatre Hall A101 (Capacity: 120).',
      summary: 'Accommodates all 68 students in a single spacious hall with 1.5m spacing, eliminating split-hall invigilation overhead.',
      confidence: 94,
      expectedImpact: [
        '100% seating compliance with anti-cheating distance standard',
        'Single room invigilation avoids assigning a 2nd extra faculty invigilator',
        'Adjacent location (Block A Ground Floor) minimizes student transit'
      ],
      whyExplanation: [
        'Hall A101 is completely free on 24 Sep 10:00–12:30.',
        'Spacious 120 capacity allows alternate desk seating for all 68 candidates.',
        'Existing invigilator Prof. Priya Sharma confirmed available.'
      ],
      evidenceSources: [
        { title: 'Exam Cell Enrollment Roster', updated: 'Today 09:00 AM', source: 'Controller of Examinations', verified: true, recordCount: '68 students enrolled', summary: 'Confirmed candidate count for CS301.' },
        { title: 'Hall A101 Booking Log', updated: 'Today 09:10 AM', source: 'Campus Facility DB', verified: true, recordCount: 'Hall A101 is vacant', summary: 'No conflicting events scheduled.' }
      ]
    },
    alternatives: [
      {
        id: 'opt-e1',
        name: 'Option A — Recommended',
        isRecommended: true,
        action: 'Relocate entire batch to Hall A101 (120 seats)',
        impactLevel: 'Low Disruption',
        changesRequired: 1,
        constraintViolations: 0,
        facultyImpact: '1 Invigilator retained',
        studentSatisfaction: '99%',
        pros: ['All students together', 'Ideal spacing', 'Single notice needed'],
        cons: ['Requires unlocking Main Amphitheatre AV console']
      },
      {
        id: 'opt-e2',
        name: 'Option B',
        isRecommended: false,
        action: 'Split batch: 60 in B204 + 8 in C302',
        impactLevel: 'High Disruption',
        changesRequired: 2,
        constraintViolations: 0,
        facultyImpact: '+1 Additional faculty invigilator required',
        studentSatisfaction: '65%',
        pros: ['Keeps majority in original room'],
        cons: ['Requires duplicate exam paper packets', 'Wastes 1 faculty invigilator on just 8 students']
      }
    ]
  },
  {
    id: 'DEC-2026-074',
    title: 'Lab 2 Closure Scheduling & Electrical Upgrade',
    problem: 'Planned 5-day electrical rewiring and high-speed network switch deployment required closing Lab 2 without losing practical contact hours.',
    status: 'Implemented',
    priority: 'High',
    department: 'Infrastructure & CS',
    impactRisk: 'Low Risk',
    confidenceScore: 96,
    createdDate: '18 Sep 2026',
    affectedScope: {
      sessions: 6,
      students: 84,
      faculty: 4,
      alternativeRooms: 2,
      availableLabs: 2
    },
    agentsInvolved: [
      { id: 'infra', name: 'Infrastructure Agent', icon: 'Building2', role: 'Planned maintenance timeline', status: 'done' },
      { id: 'timetable', name: 'Timetable Agent', icon: 'Calendar', role: 'Routed 6 sessions through buffer lab slots', status: 'done' }
    ],
    workflowSteps: [
      { step: 1, name: 'Maintenance Logged', status: 'completed', detail: 'Work order #ENG-4821 approved', agent: 'Infrastructure Agent' },
      { step: 2, name: 'Automated Routing', status: 'completed', detail: 'Executed pre-emptive rebooking into Lab 4 & Lab 5', agent: 'Timetable Agent' },
      { step: 3, name: 'Implemented', status: 'completed', detail: 'All 6 sessions executed successfully with zero lost lab hours', agent: 'Multi-Agent Orchestrator' }
    ],
    constraints: ['No cancellation of lab credits', 'Hardware parity in destination labs'],
    recommendedAction: {
      title: 'Executed phased 5-day closure with automated routing to Lab 4 & Lab 5.',
      summary: 'Completed without academic loss.',
      confidence: 96,
      expectedImpact: ['100% lab syllabus completed on schedule'],
      whyExplanation: ['Buffer slots in Lab 4 utilized with zero collision.'],
      evidenceSources: []
    },
    alternatives: []
  },
  {
    id: 'DEC-2026-068',
    title: 'TCS Prime Placement Drive Classroom Re-allocation',
    problem: 'TCS campus recruitment team requested 180 networked computer terminals simultaneously for online aptitude and coding round on Sep 15.',
    status: 'Implemented',
    priority: 'High',
    department: 'Placement Cell & Infrastructure',
    impactRisk: 'Low Risk',
    confidenceScore: 93,
    createdDate: '15 Sep 2026',
    affectedScope: {
      sessions: 3,
      students: 180,
      faculty: 6,
      alternativeRooms: 4,
      availableLabs: 4
    },
    agentsInvolved: [
      { id: 'placement', name: 'Placement Agent', icon: 'Briefcase', role: 'Verified 180 eligible students', status: 'done' },
      { id: 'infra', name: 'Infrastructure Agent', icon: 'Building2', role: 'Synchronized Labs 1, 3, 4, 5 for 3-hour drive window', status: 'done' }
    ],
    workflowSteps: [
      { step: 1, name: 'Drive Requested', status: 'completed', detail: '180 terminals required for 09:00 - 12:00 slot', agent: 'Placement Agent' },
      { step: 2, name: 'Buffer Rescheduling', status: 'completed', detail: 'Shifted 3 regular lab classes to afternoon slots', agent: 'Timetable Agent' },
      { step: 3, name: 'Drive Executed', status: 'completed', detail: '180 students tested, 42 shortlisted for technical interviews', agent: 'Multi-Agent Orchestrator' }
    ],
    constraints: ['180 operational LAN-connected terminals', 'Strict proctoring camera connectivity'],
    recommendedAction: {
      title: 'Allocated Labs 1, 3, 4, and 5 simultaneously with minor afternoon class shift.',
      summary: 'Drive concluded with 42 student shortlists.',
      confidence: 93,
      expectedImpact: ['Successful recruitment drive without academic cancellation'],
      whyExplanation: ['Afternoon buffer capacity absorbed shifted labs cleanly.'],
      evidenceSources: []
    },
    alternatives: []
  }
];

export const MOCK_FACULTY: FacultyMember[] = [
  {
    id: 'fac-1',
    name: 'Dr. Amit Mehta',
    designation: 'Professor & Head of Dept',
    department: 'Computer Engineering',
    totalHours: 24,
    teachingHours: 14,
    labHours: 6,
    adminHours: 4,
    maxThreshold: 18,
    status: 'Overloaded',
    specialization: ['Database Systems', 'Distributed Systems', 'Big Data Architecture'],
    courses: ['CS301 Database Systems', 'CS502 Distributed Computing', 'CS-A DBMS Lab'],
    email: 'amit.mehta@campusos.edu',
    phone: '+91 98230 11234',
    leaveDays: 1
  },
  {
    id: 'fac-2',
    name: 'Prof. Neha Kulkarni',
    designation: 'Associate Professor',
    department: 'Computer Engineering',
    totalHours: 22,
    teachingHours: 12,
    labHours: 8,
    adminHours: 2,
    maxThreshold: 18,
    status: 'Warning',
    specialization: ['Machine Learning', 'Artificial Intelligence', 'Python for Data Science'],
    courses: ['CS401 Machine Learning', 'CS402 AI Lab', 'CS-B Python Programming'],
    email: 'neha.kulkarni@campusos.edu',
    phone: '+91 98230 22345',
    leaveDays: 0
  },
  {
    id: 'fac-3',
    name: 'Dr. Rahul Joshi',
    designation: 'Professor & Dean R&D',
    department: 'Information Technology',
    totalHours: 16,
    teachingHours: 8,
    labHours: 4,
    adminHours: 4,
    maxThreshold: 18,
    status: 'Healthy',
    specialization: ['Cloud Computing', 'DevOps & Microservices', 'Cybersecurity'],
    courses: ['IT403 Cloud Architecture', 'IT404 DevOps Lab'],
    email: 'rahul.joshi@campusos.edu',
    phone: '+91 98230 33456',
    leaveDays: 2
  },
  {
    id: 'fac-4',
    name: 'Prof. Priya Sharma',
    designation: 'Assistant Professor',
    department: 'Computer Engineering',
    totalHours: 14,
    teachingHours: 8,
    labHours: 4,
    adminHours: 2,
    maxThreshold: 18,
    status: 'Healthy',
    specialization: ['Database Systems', 'Operating Systems', 'Web Full-Stack Development'],
    courses: ['CS202 Operating Systems', 'CS204 Web Tech Lab'],
    email: 'priya.sharma@campusos.edu',
    phone: '+91 98230 44567',
    leaveDays: 0
  },
  {
    id: 'fac-5',
    name: 'Prof. Rajesh Iyer',
    designation: 'Associate Professor',
    department: 'Electronics & Telecomm',
    totalHours: 17,
    teachingHours: 10,
    labHours: 5,
    adminHours: 2,
    maxThreshold: 18,
    status: 'Healthy',
    specialization: ['Embedded Systems', 'IoT Architectures', 'VLSI Design'],
    courses: ['EC302 Digital Signal Processing', 'EC304 Embedded Systems Lab'],
    email: 'rajesh.iyer@campusos.edu',
    phone: '+91 98230 55678',
    leaveDays: 0
  },
  {
    id: 'fac-6',
    name: 'Dr. Sunita Deshmukh',
    designation: 'Professor & Dean Academics',
    department: 'Computer Engineering',
    totalHours: 12,
    teachingHours: 4,
    labHours: 0,
    adminHours: 8,
    maxThreshold: 18,
    status: 'Healthy',
    specialization: ['Data Science & Analytics', 'Curriculum Design', 'Higher Ed Policy'],
    courses: ['CS601 Advanced Data Mining Seminar'],
    email: 'sunita.deshmukh@campusos.edu',
    phone: '+91 98230 66789',
    leaveDays: 0
  },
  {
    id: 'fac-7',
    name: 'Prof. Vikram Patil',
    designation: 'Assistant Professor',
    department: 'Mechanical Engineering',
    totalHours: 15,
    teachingHours: 8,
    labHours: 5,
    adminHours: 2,
    maxThreshold: 18,
    status: 'Healthy',
    specialization: ['CAD/CAM & Simulation', 'Robotics & Automation', 'Thermodynamics'],
    courses: ['ME304 Thermodynamics', 'ME306 CAD Design Lab'],
    email: 'vikram.patil@campusos.edu',
    phone: '+91 98230 77890',
    leaveDays: 1
  },
  {
    id: 'fac-8',
    name: 'Prof. Ananya Roy',
    designation: 'Assistant Professor',
    department: 'Civil Engineering',
    totalHours: 14,
    teachingHours: 8,
    labHours: 4,
    adminHours: 2,
    maxThreshold: 18,
    status: 'Healthy',
    specialization: ['Structural Analysis', 'Environmental Engineering', 'GIS Mapping'],
    courses: ['CE301 Structural Mechanics', 'CE303 Concrete Tech Lab'],
    email: 'ananya.roy@campusos.edu',
    phone: '+91 98230 88901',
    leaveDays: 0
  }
];

export const MOCK_ROOMS: RoomItem[] = [
  {
    id: 'room-1',
    code: 'Lab 1',
    name: 'IoT & Network Systems Lab',
    building: 'CS Block',
    floor: '1st Floor',
    type: 'Computer Lab',
    capacity: 45,
    utilizationRate: 88,
    hasAC: true,
    hasProjector: true,
    workstations: 45,
    status: 'In Use',
    currentClass: 'EC304 IoT Lab'
  },
  {
    id: 'room-2',
    code: 'Lab 2',
    name: 'Software Engineering & DBMS Lab',
    building: 'CS Block',
    floor: '1st Floor',
    type: 'Computer Lab',
    capacity: 50,
    utilizationRate: 0,
    hasAC: true,
    hasProjector: true,
    workstations: 50,
    status: 'Maintenance',
    currentClass: 'Maintenance (UPS Upgrade)'
  },
  {
    id: 'room-3',
    code: 'Lab 3',
    name: 'Advanced Computing & AI Lab',
    building: 'CS Block',
    floor: '2nd Floor',
    type: 'Computer Lab',
    capacity: 42,
    utilizationRate: 92,
    hasAC: true,
    hasProjector: true,
    workstations: 42,
    status: 'Conflict',
    currentClass: 'Double Booking: CS-A vs CS-B'
  },
  {
    id: 'room-4',
    code: 'Lab 4',
    name: 'Database & Cloud Systems Lab',
    building: 'CS Block',
    floor: '2nd Floor',
    type: 'Computer Lab',
    capacity: 48,
    utilizationRate: 64,
    hasAC: true,
    hasProjector: true,
    workstations: 48,
    status: 'Available',
    currentClass: 'Available for CS-A Relocation'
  },
  {
    id: 'room-5',
    code: 'Lab 5',
    name: 'Hardware & Microcontroller Lab',
    building: 'ECE Block',
    floor: 'Ground Floor',
    type: 'Hardware Lab',
    capacity: 40,
    utilizationRate: 58,
    hasAC: true,
    hasProjector: true,
    workstations: 40,
    status: 'Available',
    currentClass: 'Idle buffer slot'
  },
  {
    id: 'hall-1',
    code: 'Hall A101',
    name: 'Main Amphitheatre Hall',
    building: 'Main Administrative Block',
    floor: 'Ground Floor',
    type: 'Amphitheatre',
    capacity: 120,
    utilizationRate: 76,
    hasAC: true,
    hasProjector: true,
    status: 'Available',
    currentClass: 'Open for CS301 Exam Overflow'
  },
  {
    id: 'hall-2',
    code: 'Hall B204',
    name: 'Senior Lecture Theatre',
    building: 'Academic Block B',
    floor: '2nd Floor',
    type: 'Lecture Hall',
    capacity: 60,
    utilizationRate: 95,
    hasAC: true,
    hasProjector: true,
    status: 'Conflict',
    currentClass: '68 Examinees booked (Capacity 60)'
  },
  {
    id: 'hall-3',
    code: 'Hall C302',
    name: 'Department Seminar Hall',
    building: 'Academic Block C',
    floor: '3rd Floor',
    type: 'Smart Classroom',
    capacity: 80,
    utilizationRate: 42,
    hasAC: true,
    hasProjector: true,
    status: 'Available',
    currentClass: 'Underutilized (Friday 22% load)'
  },
  {
    id: 'hall-4',
    code: 'Hall D105',
    name: 'Smart Interactive Classroom',
    building: 'Academic Block D',
    floor: '1st Floor',
    type: 'Smart Classroom',
    capacity: 70,
    utilizationRate: 82,
    hasAC: true,
    hasProjector: true,
    status: 'In Use',
    currentClass: 'ME304 Thermodynamics'
  }
];

export const MOCK_EXAMS: ExamItem[] = [
  {
    id: 'exam-1',
    courseCode: 'CS301',
    courseName: 'Database Management Systems',
    department: 'Computer Engineering',
    date: '24 Sep 2026',
    timeSlot: '10:00 AM – 12:30 PM',
    roomCode: 'Hall B204',
    capacity: 60,
    enrolledStudents: 68,
    invigilator: 'Prof. Priya Sharma',
    status: 'Capacity Warning'
  },
  {
    id: 'exam-2',
    courseCode: 'CS303',
    courseName: 'Operating Systems & Concurrency',
    department: 'Computer Engineering',
    date: '26 Sep 2026',
    timeSlot: '10:00 AM – 12:30 PM',
    roomCode: 'Hall A101',
    capacity: 120,
    enrolledStudents: 115,
    invigilator: 'Dr. Rahul Joshi',
    status: 'Confirmed'
  },
  {
    id: 'exam-3',
    courseCode: 'EC302',
    courseName: 'Digital Signal Processing',
    department: 'Electronics & Telecomm',
    date: '27 Sep 2026',
    timeSlot: '02:00 PM – 04:30 PM',
    roomCode: 'Hall D105',
    capacity: 70,
    enrolledStudents: 62,
    invigilator: 'Prof. Rajesh Iyer',
    status: 'Confirmed'
  },
  {
    id: 'exam-4',
    courseCode: 'ME304',
    courseName: 'Thermodynamics & Heat Transfer',
    department: 'Mechanical Engineering',
    date: '29 Sep 2026',
    timeSlot: '10:00 AM – 12:30 PM',
    roomCode: 'Hall C302',
    capacity: 80,
    enrolledStudents: 54,
    invigilator: 'Prof. Vikram Patil',
    status: 'Confirmed'
  }
];

export const MOCK_DRIVES: PlacementDrive[] = [
  {
    id: 'drive-1',
    company: 'TCS Prime & Digital',
    packageLPA: 9.0,
    role: 'Systems Engineer & AI Specialist',
    eligibilityCGPA: 7.5,
    maxBacklogs: 0,
    targetBranches: ['Computer Engineering', 'Information Technology'],
    driveDate: '28 Sep 2026',
    eligibleStudentsCount: 67,
    registeredCount: 64,
    status: 'Upcoming'
  },
  {
    id: 'drive-2',
    company: 'Infosys Specialist Programmer',
    packageLPA: 6.5,
    role: 'Full Stack Software Engineer',
    eligibilityCGPA: 7.0,
    maxBacklogs: 0,
    targetBranches: ['Computer Engineering', 'Information Technology', 'Electronics'],
    driveDate: '05 Oct 2026',
    eligibleStudentsCount: 142,
    registeredCount: 138,
    status: 'Upcoming'
  },
  {
    id: 'drive-3',
    company: 'Microsoft IDC Campus Program',
    packageLPA: 28.5,
    role: 'Software Development Engineer I',
    eligibilityCGPA: 8.5,
    maxBacklogs: 0,
    targetBranches: ['Computer Engineering', 'Information Technology'],
    driveDate: '14 Oct 2026',
    eligibleStudentsCount: 29,
    registeredCount: 29,
    status: 'Upcoming'
  },
  {
    id: 'drive-4',
    company: 'L&T Technology Services',
    packageLPA: 5.5,
    role: 'Embedded Software / Core Engineer',
    eligibilityCGPA: 6.8,
    maxBacklogs: 1,
    targetBranches: ['Electronics', 'Mechanical', 'Civil'],
    driveDate: '20 Oct 2026',
    eligibleStudentsCount: 98,
    registeredCount: 91,
    status: 'Upcoming'
  }
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'high',
    title: 'Exam Seating Capacity Conflict',
    message: 'Hall B204 has 68 students scheduled for CS301 (exceeds capacity by 8).',
    timestamp: '10 mins ago',
    read: false,
    category: 'Exam',
    decisionId: 'DEC-2026-085',
    actionPath: '/decisions/DEC-2026-085'
  },
  {
    id: 'notif-2',
    type: 'high',
    title: 'Timetable Double Booking in Lab 3',
    message: 'CS-A and CS-B both scheduled for Lab 3 on Thursday 10:00 AM.',
    timestamp: '25 mins ago',
    read: false,
    category: 'Timetable',
    decisionId: 'DEC-2026-092',
    actionPath: '/decisions/DEC-2026-092'
  },
  {
    id: 'notif-3',
    type: 'medium',
    title: 'Faculty Workload Exceeds Threshold',
    message: 'Dr. Amit Mehta is assigned 24 teaching hours this week (Limit: 18h).',
    timestamp: '1 hour ago',
    read: false,
    category: 'Faculty',
    decisionId: 'DEC-2026-089',
    actionPath: '/decisions/DEC-2026-089'
  },
  {
    id: 'notif-4',
    type: 'info',
    title: 'Placement Drive Eligibility Analyzed',
    message: '67 students verified eligible for TCS Prime 9 LPA recruitment drive.',
    timestamp: '2 hours ago',
    read: true,
    category: 'Placement',
    actionPath: '/placements'
  },
  {
    id: 'notif-5',
    type: 'info',
    title: 'Academic Accreditation Audit Passed',
    message: 'Semester 5 curriculum pacing index verified at 99.2% compliance.',
    timestamp: 'Yesterday',
    read: true,
    category: 'System',
    actionPath: '/academic'
  }
];

// ----------------------------------------------------
// CHART DATASETS
// ----------------------------------------------------

export const ROOM_UTILIZATION_CHART_DATA = [
  { day: 'Mon', 'Morning (8-11)': 86, 'Mid-day (11-2)': 94, 'Afternoon (2-5)': 72 },
  { day: 'Tue', 'Morning (8-11)': 90, 'Mid-day (11-2)': 88, 'Afternoon (2-5)': 68 },
  { day: 'Wed', 'Morning (8-11)': 92, 'Mid-day (11-2)': 96, 'Afternoon (2-5)': 75 },
  { day: 'Thu', 'Morning (8-11)': 88, 'Mid-day (11-2)': 90, 'Afternoon (2-5)': 70 },
  { day: 'Fri', 'Morning (8-11)': 82, 'Mid-day (11-2)': 78, 'Afternoon (2-5)': 42 }, // noticeable underutilization
  { day: 'Sat', 'Morning (8-11)': 55, 'Mid-day (11-2)': 40, 'Afternoon (2-5)': 15 }
];

export const FACULTY_WORKLOAD_CHART_DATA = [
  { name: 'Dr. Mehta', teaching: 14, lab: 6, admin: 4, limit: 18 },
  { name: 'Prof. Kulkarni', teaching: 12, lab: 8, admin: 2, limit: 18 },
  { name: 'Prof. Iyer', teaching: 10, lab: 5, admin: 2, limit: 18 },
  { name: 'Dr. Joshi', teaching: 8, lab: 4, admin: 4, limit: 18 },
  { name: 'Prof. Patil', teaching: 8, lab: 5, admin: 2, limit: 18 },
  { name: 'Prof. Sharma', teaching: 8, lab: 4, admin: 2, limit: 18 },
  { name: 'Prof. Roy', teaching: 8, lab: 4, admin: 2, limit: 18 },
  { name: 'Dr. Deshmukh', teaching: 4, lab: 0, admin: 8, limit: 18 }
];

export const EXAM_SCHEDULE_LOAD_DATA = [
  { date: '20 Sep', exams: 2, students: 140, hallsUsed: 2, capacityEfficiency: 92 },
  { date: '22 Sep', exams: 3, students: 210, hallsUsed: 3, capacityEfficiency: 89 },
  { date: '24 Sep', exams: 4, students: 288, hallsUsed: 4, capacityEfficiency: 96 },
  { date: '26 Sep', exams: 2, students: 165, hallsUsed: 2, capacityEfficiency: 94 },
  { date: '28 Sep', exams: 3, students: 195, hallsUsed: 3, capacityEfficiency: 88 },
  { date: '30 Sep', exams: 1, students: 60, hallsUsed: 1, capacityEfficiency: 85 }
];

export const WHAT_IF_PRESETS = [
  {
    id: 'scenario-lab3-closure',
    title: 'What happens if Lab 3 is unavailable for one week?',
    description: 'Simulates scheduled renovation or electrical outage in Lab 3 from 20–24 September.',
    resource: 'Lab 3 (Advanced Computing Lab)',
    duration: '20–24 Sep (5 Days)',
    departments: ['Computer Engineering', 'Information Technology'],
    results: {
      affectedClasses: 12,
      affectedStudents: 284,
      affectedFaculty: 7,
      roomsRequired: 3,
      conflictsDetected: [
        '4 Timetable slot collisions in CS-A and IT-B morning schedules',
        '1 Faculty availability constraint breach (Dr. Mehta consecutive load)'
      ],
      recommendedAdjustments: [
        'Move 3 practical sessions to Lab 4 (vacant slots Tue/Thu 10:00-12:00)',
        'Move 1 session to Lab 5 (Wednesday 14:00-16:00)',
        'Shift 2 tutorial slots to Smart Classroom C302'
      ],
      beforeAfterData: [
        { label: 'Lab 1', before: 88, after: 90 },
        { label: 'Lab 2', before: 0, after: 0 },
        { label: 'Lab 3 (Target)', before: 92, after: 0 },
        { label: 'Lab 4 (Absorber)', before: 64, after: 92 },
        { label: 'Lab 5 (Absorber)', before: 58, after: 78 }
      ]
    }
  },
  {
    id: 'scenario-faculty-leave',
    title: 'What if 2 key faculty members are unavailable next week?',
    description: 'Simulates medical / conference leave for Dr. Amit Mehta and Prof. Neha Kulkarni.',
    resource: 'Dr. Amit Mehta & Prof. Neha Kulkarni',
    duration: '22–26 Sep (1 Week)',
    departments: ['Computer Engineering'],
    results: {
      affectedClasses: 14,
      affectedStudents: 310,
      affectedFaculty: 2,
      roomsRequired: 0,
      conflictsDetected: [
        '6 unassigned lecture hours for CS301 Database Systems',
        '8 unassigned lab hours for CS402 AI & Machine Learning Lab'
      ],
      recommendedAdjustments: [
        'Assign DBMS lectures to Prof. Priya Sharma (has 4 available hours)',
        'Substitute AI lab sessions with Prof. Rahul Joshi & Guest TA',
        'Reschedule 2 research seminars to following week'
      ],
      beforeAfterData: [
        { label: 'Dr. Mehta', before: 24, after: 0 },
        { label: 'Prof. Kulkarni', before: 22, after: 0 },
        { label: 'Prof. Sharma', before: 14, after: 18 },
        { label: 'Dr. Joshi', before: 16, after: 18 },
        { label: 'Prof. Iyer', before: 17, after: 17 }
      ]
    }
  },
  {
    id: 'scenario-batch-expansion',
    title: 'What if CS batch size expands by 15% next semester?',
    description: 'Simulates student intake increase from 120 -> 138 students in CSE 2nd year.',
    resource: 'Batch Intake Capacity',
    duration: 'Spring Semester 2027',
    departments: ['Computer Engineering', 'Academic Board'],
    results: {
      affectedClasses: 8,
      affectedStudents: 138,
      affectedFaculty: 4,
      roomsRequired: 2,
      conflictsDetected: [
        'Lab 3 & Lab 4 capacity (42 & 48) cannot accommodate 3rd division without split',
        'Hall B204 capacity (60) will overflow by 9 students'
      ],
      recommendedAdjustments: [
        'Create 3rd lab batch CS-C with dedicated Friday slots',
        'Relocate core lectures from Hall B204 to Main Amphitheatre Hall A101',
        'Induct 1 Assistant Professor for practical supervision'
      ],
      beforeAfterData: [
        { label: 'Hall A101', before: 76, after: 88 },
        { label: 'Hall B204', before: 95, after: 60 },
        { label: 'Hall C302', before: 42, after: 68 },
        { label: 'Lab 4', before: 64, after: 85 },
        { label: 'Lab 1', before: 88, after: 94 }
      ]
    }
  }
];

export const TIMETABLE_SLOTS = [
  { day: 'Monday', time: '09:00 - 10:00', batch: 'CS-A', subject: 'CS301 DBMS', room: 'Hall B204', faculty: 'Dr. Amit Mehta', hasConflict: false },
  { day: 'Monday', time: '10:00 - 12:00', batch: 'CS-A', subject: 'DBMS Lab (Batch 1)', room: 'Lab 2', faculty: 'Dr. Amit Mehta', hasConflict: true, conflictReason: 'Lab 2 Closed for Maintenance' },
  { day: 'Monday', time: '13:00 - 14:00', batch: 'CS-A', subject: 'CS202 Operating Systems', room: 'Hall B204', faculty: 'Prof. Priya Sharma', hasConflict: false },
  { day: 'Monday', time: '14:00 - 16:00', batch: 'CS-B', subject: 'Machine Learning Lab', room: 'Lab 3', faculty: 'Prof. Neha Kulkarni', hasConflict: false },

  { day: 'Tuesday', time: '09:00 - 10:00', batch: 'CS-A', subject: 'CS401 Machine Learning', room: 'Hall B204', faculty: 'Prof. Neha Kulkarni', hasConflict: false },
  { day: 'Tuesday', time: '10:00 - 12:00', batch: 'CS-A', subject: 'CS-A Database Lab (Proposed)', room: 'Lab 4', faculty: 'Dr. Amit Mehta', hasConflict: false, isRecommendationTarget: true },
  { day: 'Tuesday', time: '13:00 - 14:00', batch: 'EC-A', subject: 'Digital Signal Processing', room: 'Hall D105', faculty: 'Prof. Rajesh Iyer', hasConflict: false },

  { day: 'Wednesday', time: '09:00 - 10:00', batch: 'CS-A', subject: 'CS301 DBMS Lecture', room: 'Hall B204', faculty: 'Dr. Amit Mehta', hasConflict: false },
  { day: 'Wednesday', time: '10:00 - 12:00', batch: 'CS-B', subject: 'Web Technologies Lab', room: 'Lab 1', faculty: 'Prof. Priya Sharma', hasConflict: false },
  { day: 'Wednesday', time: '14:00 - 16:00', batch: 'IT-A', subject: 'Cloud Computing Lab', room: 'Lab 4', faculty: 'Dr. Rahul Joshi', hasConflict: false },

  { day: 'Thursday', time: '09:00 - 10:00', batch: 'CS-A', subject: 'CS202 Operating Systems', room: 'Hall B204', faculty: 'Prof. Priya Sharma', hasConflict: false },
  { day: 'Thursday', time: '10:00 - 12:00', batch: 'CS-A', subject: 'CS-A vs CS-B Double Booking', room: 'Lab 3', faculty: 'Dr. Amit Mehta', hasConflict: true, conflictReason: 'Double Booking Collision with CS-B' },
  { day: 'Thursday', time: '14:00 - 16:00', batch: 'CS-B', subject: 'Database Lab (Shifted)', room: 'Lab 4', faculty: 'Prof. Priya Sharma', hasConflict: false, isRecommendationTarget: true },

  { day: 'Friday', time: '09:00 - 11:00', batch: 'CS-A', subject: 'Open Elective (AI/Robotics)', room: 'Hall A101', faculty: 'Prof. Vikram Patil', hasConflict: false },
  { day: 'Friday', time: '11:00 - 13:00', batch: 'CS-A', subject: 'Soft Skills & Placement Prep', room: 'Hall C302', faculty: 'Placement Cell', hasConflict: false },
  { day: 'Friday', time: '14:00 - 17:00', batch: 'ALL', subject: 'Unassigned / Extra-Curricular Buffer', room: 'Hall C302', faculty: 'Open Buffer', hasConflict: false, isUnderutilized: true }
];

export const MOCK_NOTICES = [
  {
    id: 'notice-1',
    title: 'Lab 2 Scheduled Electrical & Network Upgrade (Sep 20–24)',
    category: 'Infrastructure',
    date: '19 Sep 2026',
    author: 'Chief Engineer & IT Admin',
    priority: 'High',
    content: 'All practical sessions scheduled for Lab 2 during 20–24 Sep are rerouted via Campus OS automated timetable optimization to Lab 4 and Lab 5. Please refer to your updated schedule in the Timetable module.',
    target: 'All CS & IT Faculty + Students'
  },
  {
    id: 'notice-2',
    title: 'Mid-Term Examination Seating Plan Released',
    category: 'Examinations',
    date: '18 Sep 2026',
    author: 'Controller of Examinations',
    priority: 'High',
    content: 'Exam seating charts for Odd Semester Mid-Terms have been synchronized. Note that CS301 DBMS Mid-term has been shifted to Main Amphitheatre Hall A101 to ensure optimal spacing.',
    target: 'All 2nd & 3rd Year Students'
  },
  {
    id: 'notice-3',
    title: 'TCS Prime 9 LPA Recruitment Drive Registration Deadline',
    category: 'Placements',
    date: '17 Sep 2026',
    author: 'Head, Training & Placement Cell',
    priority: 'Medium',
    content: 'Eligible candidates (CGPA >= 7.5, zero active backlogs) must confirm registration by 23 Sep. 67 candidates have been pre-screened by the Placement Agent.',
    target: 'Final Year CSE / IT'
  }
];

export const MOCK_REPORTS = [
  {
    id: 'rep-1',
    title: 'Faculty Workload & UGC Compliance Audit',
    description: 'Comprehensive analysis of teaching, practical, and administrative hour distributions across all 84 faculty members with overload alerts.',
    period: 'Odd Semester 2026–27',
    category: 'Faculty',
    lastGenerated: 'Today, 08:30 AM',
    fileSize: '1.8 MB',
    metrics: { compliantFaculty: '94%', overloadedCount: 2, averageLoad: '15.4 hrs/wk' }
  },
  {
    id: 'rep-2',
    title: 'Classroom & Computer Lab Utilization Efficiency',
    description: 'Hourly space utilization metrics across 48 physical facilities, highlighting Friday afternoon low-occupancy opportunities.',
    period: 'Past 30 Days',
    category: 'Infrastructure',
    lastGenerated: 'Today, 09:15 AM',
    fileSize: '2.4 MB',
    metrics: { peakUtilization: '94% (Wed 11am)', lowestUtilization: '42% (Fri 3pm)', spaceSaved: '14.2 hrs/wk' }
  },
  {
    id: 'rep-3',
    title: 'Timetable Conflict & Dynamic Resolution Log',
    description: 'Historical register of all 42 automated conflict resolutions and room swaps generated by the Multi-Agent Orchestrator.',
    period: 'Academic Year 2026–27',
    category: 'Timetable',
    lastGenerated: '19 Sep 2026',
    fileSize: '3.1 MB',
    metrics: { totalConflictsResolved: 42, avgResolutionTime: '< 3 seconds', zeroLostCredits: '100%' }
  },
  {
    id: 'rep-4',
    title: 'Examination Seating & Invigilation Fairness Report',
    description: 'Desk density mapping, anti-cheating distance adherence, and balanced faculty invigilation duty distribution.',
    period: 'Mid-Term Autumn 2026',
    category: 'Examinations',
    lastGenerated: '18 Sep 2026',
    fileSize: '1.2 MB',
    metrics: { totalHalls: 12, invigilatorFairnessIndex: '99.4%', overflowAlertsResolved: 1 }
  },
  {
    id: 'rep-5',
    title: 'Placement Readiness & Corporate Eligibility Roster',
    description: 'Branch-wise breakdown of student eligibility, average CGPA distribution, and mock technical test scores.',
    period: 'Placement Season 2026–27',
    category: 'Placements',
    lastGenerated: '17 Sep 2026',
    fileSize: '2.9 MB',
    metrics: { totalEligible: 336, targetCompanies: 18, avgPackageOffer: '8.4 LPA' }
  }
];

export const PREBAKED_NL_QUERIES = [
  {
    query: 'Which classrooms are underutilized this week?',
    answer: 'Analysis across 48 campus spaces shows 3 rooms have substantial underutilization, especially during Friday afternoons.',
    data: [
      { name: 'Room C302 (Seminar Hall)', utilization: '22% utilization on Friday afternoons', note: 'Capacity: 80 | Vacant for 6 hours' },
      { name: 'Room B102 (Junior Hall)', utilization: '31% utilization on Friday afternoons', note: 'Capacity: 50 | Vacant for 4 hours' },
      { name: 'Room A201 (Tutorial Room)', utilization: '28% utilization on Friday afternoons', note: 'Capacity: 40 | Vacant for 5 hours' }
    ],
    agents: ['Infrastructure Agent', 'Timetable Agent'],
    evidence: 'Timetable Slot Registry & Room IoT Sensors (Audited: Today 09:28 AM)',
    recommendedActionText: 'Would you like to simulate consolidating Friday afternoon tutorial classes into Room C302 to save HVAC power?'
  },
  {
    query: 'Who is overloaded this semester?',
    answer: '2 faculty members currently exceed the institute 18-hour teaching guideline, risking accreditation compliance penalties.',
    data: [
      { name: 'Dr. Amit Mehta (HOD, CSE)', utilization: '24 teaching hours / week (+6h over limit)', note: 'Decision DEC-2026-089 ready for review' },
      { name: 'Prof. Neha Kulkarni (Assoc Prof, CSE)', utilization: '22 teaching hours / week (+4h over limit)', note: 'Can offload 4h AI lab to junior faculty' }
    ],
    agents: ['Faculty Agent', 'Academic Agent'],
    evidence: 'Faculty Workload Ledger (Updated: Today 08:45 AM)',
    recommendedActionText: 'Open Decision Center to review the auto-balanced workload redistribution plan for Dr. Mehta and Prof. Kulkarni.'
  },
  {
    query: 'Show conflicts in next week\'s timetable.',
    answer: 'The Timetable Agent detected 2 active collisions requiring administrative decision review.',
    data: [
      { name: 'Lab 2 Outage vs CS-A DBMS Lab', utilization: 'High Severity | 6 sessions affected', note: 'Decision DEC-2026-092 (Recommendation Ready: 91% match to Lab 4)' },
      { name: 'Lab 3 Double Booking (Thu 10am)', utilization: 'High Severity | 42 students affected', note: 'Collision between CS-A and CS-B' }
    ],
    agents: ['Timetable Agent', 'Infrastructure Agent'],
    evidence: 'CampusOS Timetable Engine v4.2 (Scanned 320 slots)',
    recommendedActionText: 'Review Decision DEC-2026-092 in the Decision Workspace to approve moving CS-A to Lab 4.'
  },
  {
    query: 'Which students are eligible for the upcoming placement drive?',
    answer: 'For the upcoming TCS Prime (9 LPA) recruitment drive on 28 Sep, 67 students meet all eligibility criteria (CGPA >= 7.5, zero backlogs).',
    data: [
      { name: 'Computer Engineering', utilization: '44 eligible students (68% batch pass rate)', note: 'Average CGPA: 8.42' },
      { name: 'Information Technology', utilization: '23 eligible students (72% batch pass rate)', note: 'Average CGPA: 8.21' }
    ],
    agents: ['Placement Agent', 'Academic Agent'],
    evidence: 'Student Master Records & Examination Grade Register',
    recommendedActionText: 'Send automated eligibility confirmation circular and coding test roster to all 67 students.'
  }
];
