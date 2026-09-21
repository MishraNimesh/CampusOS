import React, { useState } from 'react';
import {
  BarChart3,
  Download,
  FileText,
  FileSpreadsheet,
  Eye,
  CheckCircle2,
  Calendar,
  Filter,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/ToastContext';
import { MOCK_REPORTS } from '@/data/mockData';

interface ReportsProps {
  onRouteChange: (route: string) => void;
}

export const Reports: React.FC<ReportsProps> = ({ onRouteChange }) => {
  const { success, info } = useToast();
  const [reports, setReports] = useState(MOCK_REPORTS);
  const [selectedReport, setSelectedReport] = useState<typeof MOCK_REPORTS[0] | null>(null);

  const handleExportPDF = (reportTitle: string) => {
    success('Report Export Prepared', `Generated high-resolution PDF for "${reportTitle}". Ready for download.`);
  };

  const handleExportExcel = (reportTitle: string) => {
    info('Excel Spreadsheet Generated', `Exported raw tabular metrics for "${reportTitle}" (XLSX).`);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Reports & Executive Analytics
            </h1>
            <Badge variant="primary" size="sm">
              Automated Audit Generation
            </Badge>
          </div>
          <p className="text-sm text-slate-400">
            Generate and export accredited compliance reports, space efficiency audits, and placement rosters.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="glow"
            size="sm"
            onClick={() => success('Executive Brief Compiled', 'Compiled unified 12-page executive summary for Board of Governors.')}
            className="text-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Generate Executive Brief</span>
          </Button>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {reports.map((report) => (
          <Card
            key={report.id}
            className="p-5 sm:p-6 border-slate-800 bg-slate-900/80 flex flex-col justify-between hover:border-slate-700 transition-all space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="primary" size="sm">
                  {report.category}
                </Badge>
                <span className="text-[11px] text-slate-400 font-mono">{report.fileSize}</span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white">{report.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mt-1">
                  {report.description}
                </p>
              </div>

              {/* Metrics Highlights Box */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1 text-xs font-mono">
                {Object.entries(report.metrics).map(([key, val], idx) => (
                  <div key={idx} className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                    <span className="text-blue-400 font-bold">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-800/80 space-y-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedReport(report)}
                className="w-full text-xs border-slate-700 text-slate-200 hover:text-white"
              >
                <Eye className="w-3.5 h-3.5 mr-1" />
                <span>Preview Report</span>
              </Button>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleExportPDF(report.title)}
                  className="text-xs border-slate-700 text-slate-300"
                >
                  <FileText className="w-3.5 h-3.5 text-rose-400 mr-1" />
                  <span>PDF</span>
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleExportExcel(report.title)}
                  className="text-xs border-slate-700 text-slate-300"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400 mr-1" />
                  <span>Excel</span>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Report Preview Modal */}
      {selectedReport && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedReport(null)}
          title={selectedReport.title}
          description={`${selectedReport.period} • Generated ${selectedReport.lastGenerated}`}
          size="lg"
        >
          <div className="space-y-5">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Executive Audit Summary
              </span>
              <p className="text-sm text-slate-200 leading-relaxed">
                {selectedReport.description}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Verified Key Performance Indicators
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {Object.entries(selectedReport.metrics).map(([k, v], i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                      {k.replace(/([A-Z])/g, ' $1')}
                    </span>
                    <span className="text-lg font-bold text-white font-mono">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <Button variant="outline" size="sm" onClick={() => setSelectedReport(null)}>
                Close Preview
              </Button>
              <Button
                variant="glow"
                size="sm"
                onClick={() => {
                  handleExportPDF(selectedReport.title);
                  setSelectedReport(null);
                }}
              >
                <Download className="w-3.5 h-3.5 mr-1" />
                <span>Download Verified PDF</span>
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
