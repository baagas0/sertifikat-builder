import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCertificateStore } from '@/store/certificateStore';
import { exportToPDF } from '@/lib/pdfExport';
import { Download, Loader2 } from 'lucide-react';

export function ExportButton() {
  const [isExporting, setIsExporting] = useState(false);
  const project = useCertificateStore((state) => state.project);

  const handleExport = async () => {
    if (!project) return;

    setIsExporting(true);
    try {
      await exportToPDF(project.pages, project.name);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      onClick={handleExport}
      disabled={isExporting}
      className="gap-2"
    >
      {isExporting ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Exporting...
        </>
      ) : (
        <>
          <Download className="w-4 h-4" />
          Export PDF
        </>
      )}
    </Button>
  );
}
