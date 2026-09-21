import React, { useState, useEffect } from 'react';
import { ToastProvider } from '@/components/ui/ToastContext';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';
import { DemoGuideBanner } from '@/components/layout/DemoGuideBanner';
import { CommandPalette } from '@/components/layout/CommandPalette';

// Pages
import { Dashboard } from '@/pages/Dashboard';
import { DecisionCenter } from '@/pages/DecisionCenter';
import { DecisionWorkspace } from '@/pages/DecisionWorkspace';
import { WhatIfSimulator } from '@/pages/WhatIfSimulator';
import { AgentsOverview } from '@/pages/AgentsOverview';
import { AcademicModule } from '@/pages/AcademicModule';
import { FacultyModule } from '@/pages/FacultyModule';
import { TimetableModule } from '@/pages/TimetableModule';
import { InfrastructureModule } from '@/pages/InfrastructureModule';
import { ExaminationsModule } from '@/pages/ExaminationsModule';
import { PlacementsModule } from '@/pages/PlacementsModule';
import { CommunicationsModule } from '@/pages/CommunicationsModule';
import { Reports } from '@/pages/Reports';
import { DecisionHistory } from '@/pages/DecisionHistory';
import { SettingsPage } from '@/pages/SettingsPage';

export function App() {
  const [currentRoute, setCurrentRoute] = useState<string>('dashboard');
  const [selectedDecisionId, setSelectedDecisionId] = useState<string>('DEC-2026-092');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [academicTerm, setAcademicTerm] = useState<string>('AY 2026–27 • Odd Sem (Sem 5)');
  const [activeNlQuery, setActiveNlQuery] = useState<string>('');

  // Global shortcut ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (route: string) => {
    if (route.startsWith('decisions/')) {
      const id = route.split('/')[1];
      setSelectedDecisionId(id);
      setCurrentRoute(route);
    } else {
      setCurrentRoute(route);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDecision = (decisionId: string) => {
    setSelectedDecisionId(decisionId);
    setCurrentRoute(`decisions/${decisionId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectQueryFromPalette = (query: string) => {
    setActiveNlQuery(query);
    setCurrentRoute('dashboard');
  };

  const renderCurrentView = () => {
    if (currentRoute.startsWith('decisions/')) {
      return (
        <DecisionWorkspace
          decisionId={selectedDecisionId}
          onBack={() => handleNavigate('decision-center')}
          onRouteChange={handleNavigate}
        />
      );
    }

    switch (currentRoute) {
      case 'dashboard':
        return (
          <Dashboard
            onRouteChange={handleNavigate}
            onSelectDecision={handleSelectDecision}
            initialQuery={activeNlQuery}
          />
        );
      case 'decision-center':
        return (
          <DecisionCenter
            onSelectDecision={handleSelectDecision}
            onRouteChange={handleNavigate}
          />
        );
      case 'what-if':
        return (
          <WhatIfSimulator
            onRouteChange={handleNavigate}
            onSelectDecision={handleSelectDecision}
          />
        );
      case 'agents':
        return (
          <AgentsOverview
            onRouteChange={handleNavigate}
            onSelectDecision={handleSelectDecision}
          />
        );
      case 'academic':
        return (
          <AcademicModule
            onSelectDecision={handleSelectDecision}
            onRouteChange={handleNavigate}
          />
        );
      case 'faculty':
        return (
          <FacultyModule
            onSelectDecision={handleSelectDecision}
            onRouteChange={handleNavigate}
          />
        );
      case 'timetable':
        return (
          <TimetableModule
            onSelectDecision={handleSelectDecision}
            onRouteChange={handleNavigate}
          />
        );
      case 'infrastructure':
        return (
          <InfrastructureModule
            onSelectDecision={handleSelectDecision}
            onRouteChange={handleNavigate}
          />
        );
      case 'examinations':
        return (
          <ExaminationsModule
            onSelectDecision={handleSelectDecision}
            onRouteChange={handleNavigate}
          />
        );
      case 'placements':
        return <PlacementsModule onRouteChange={handleNavigate} />;
      case 'communications':
        return <CommunicationsModule onRouteChange={handleNavigate} />;
      case 'reports':
        return <Reports onRouteChange={handleNavigate} />;
      case 'decision-history':
        return (
          <DecisionHistory
            onSelectDecision={handleSelectDecision}
            onRouteChange={handleNavigate}
          />
        );
      case 'settings':
        return <SettingsPage onRouteChange={handleNavigate} />;
      default:
        return (
          <Dashboard
            onRouteChange={handleNavigate}
            onSelectDecision={handleSelectDecision}
          />
        );
    }
  };

  return (
    <ToastProvider>
      <div className="flex h-screen w-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
        {/* Left Navigation Sidebar */}
        <Sidebar
          currentRoute={currentRoute}
          onRouteChange={handleNavigate}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        {/* Main Content Area */}
        <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden bg-slate-950">
          {/* Top Demo Flow Guide Bar */}
          <DemoGuideBanner
            currentRoute={currentRoute}
            onRouteChange={handleNavigate}
            onSelectDecision={handleSelectDecision}
          />

          {/* Top Bar with Search & Notifications */}
          <TopBar
            onOpenSearch={() => setIsSearchOpen(true)}
            onRouteChange={handleNavigate}
            academicTerm={academicTerm}
            onTermChange={setAcademicTerm}
          />

          {/* Page Scrollable Viewport */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#0b0f19] gradient-mesh">
            <div className="max-w-7xl mx-auto">{renderCurrentView()}</div>
          </main>
        </div>

        {/* Global Command Palette Modal (⌘K) */}
        <CommandPalette
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onRouteChange={handleNavigate}
          onSelectDecision={handleSelectDecision}
          onSelectQuery={handleSelectQueryFromPalette}
        />
      </div>
    </ToastProvider>
  );
}

export default App;
