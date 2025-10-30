import { useCertificateStore } from '@/store/certificateStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';

export function PageManager() {
  const project = useCertificateStore((state) => state.project);
  const currentPageId = useCertificateStore((state) => state.project?.currentPageId);
  const addPage = useCertificateStore((state) => state.addPage);
  const deletePage = useCertificateStore((state) => state.deletePage);
  const setCurrentPage = useCertificateStore((state) => state.setCurrentPage);

  if (!project) return null;

  return (
    <Card className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm">Pages ({project.pages.length})</h3>
        <Button
          size="sm"
          variant="outline"
          onClick={() => addPage()}
          className="gap-1"
        >
          <Plus className="w-3 h-3" />
          Add
        </Button>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {project.pages.map((page) => (
          <div
            key={page.id}
            className={`flex items-center justify-between p-2 rounded border cursor-pointer transition-colors ${
              currentPageId === page.id
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-background border-border hover:bg-accent'
            }`}
            onClick={() => setCurrentPage(page.id)}
          >
            <span className="text-sm font-medium">Page {page.order + 1}</span>
            {project.pages.length > 1 && (
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  deletePage(page.id);
                }}
                className="h-6 w-6 p-0"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
