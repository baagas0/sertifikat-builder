import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCertificateStore } from '@/store/certificateStore';
import { exportToPDF } from '@/lib/pdfExport';
import { exportProjectAsZip } from '@/lib/zipExport';
import { Download, Loader2, FileText, Archive } from 'lucide-react';

export function ExportMenu() {
  const [isExporting, setIsExporting] = useState(false);
  const project = useCertificateStore((state) => state.project);

  const handleExportPDF = async () => {
    if (!project) return;

    setIsExporting(true);
    try {
      await exportToPDF(project.pages, project.name);
    } catch (error) {
      console.error('PDF export failed:', error);
      alert('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportZip = async () => {
    if (!project) return;

    setIsExporting(true);
    try {
      await exportProjectAsZip(project);
    } catch (error) {
      console.error('ZIP export failed:', error);
      alert('Failed to export project. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button disabled={isExporting} className="gap-2">
          {isExporting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Exporting...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              Export
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleExportPDF} disabled={isExporting}>
          <FileText className="w-4 h-4 mr-2" />
          Export as PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportZip} disabled={isExporting}>
          <Archive className="w-4 h-4 mr-2" />
          Export as ZIP (Project)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
