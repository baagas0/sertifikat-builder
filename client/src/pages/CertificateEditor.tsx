import { useEffect } from 'react';
import { useCertificateStore } from '@/store/certificateStore';
import { useAutosave } from '@/hooks/useAutosave';
import { Toolbar } from '@/components/Toolbar';
import { CertificateCanvas } from '@/components/CertificateCanvas';
import { ElementProperties } from '@/components/ElementProperties';
import { PageManager } from '@/components/PageManager';
import { BackgroundUpload } from '@/components/BackgroundUpload';
import { ExportMenu } from '@/components/ExportMenu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// import Toolbar from '@/components/Toolbar';

export default function CertificateEditor() {
  const initializeProject = useCertificateStore((state) => state.initializeProject);
  const loadFromLocalStorage = useCertificateStore((state) => state.loadFromLocalStorage);
  const project = useCertificateStore((state) => state.project);
  const setProjectName = useCertificateStore((state) => state.setProjectName);
  const currentPage = useCertificateStore((state) => state.getCurrentPage());

  // Initialize project on mount
  useEffect(() => {
    const stored = localStorage.getItem('certificate-project');
    if (stored) {
      loadFromLocalStorage();
    } else {
      initializeProject();
    }
  }, []);

  // Enable autosave
  useAutosave(5000);

  if (!project) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <Label htmlFor="project-name" className="text-xs text-muted-foreground">
              PROJECT NAME
            </Label>
            <Input
              id="project-name"
              value={project.name}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter project name"
              className="mt-1 text-lg font-semibold"
            />
          </div>
          <div className="flex gap-2">
            {currentPage && <BackgroundUpload pageId={currentPage.id} />}
            {/* <ExportMenu /> */}
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <Toolbar />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Properties */}
        <div className="w-80 border-r bg-background overflow-y-auto p-4 space-y-4">
          <PageManager />
          <ElementProperties />
        </div>

        {/* Canvas */}
        <CertificateCanvas />
      </div>
    </div>
  );
}
