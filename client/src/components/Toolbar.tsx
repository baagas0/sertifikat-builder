import { Button } from '@/components/ui/button';
import { useCertificateStore } from '@/store/certificateStore';
import { Type, Square, User, Plus } from 'lucide-react';

export function Toolbar() {
  const addElement = useCertificateStore((state) => state.addElement);

  const handleDragStart = (e: React.DragEvent, elementType: 'text' | 'signature-box' | 'signature-name' | 'custom-text', content?: string) => {
    e.dataTransfer.setData('elementType', elementType);
    e.dataTransfer.setData('content', content || '');
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div className="flex gap-2 p-4 border-b bg-background">
      <Button
        variant="outline"
        size="sm"
        onClick={() => addElement('text', 'Jabatan')}
        draggable
        onDragStart={(e) => handleDragStart(e, 'text', 'Jabatan')}
        className="gap-2 cursor-move"
      >
        <Type className="w-4 h-4" />
        Jabatan
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => addElement('signature-box')}
        draggable
        onDragStart={(e) => handleDragStart(e, 'signature-box', '')}
        className="gap-2 cursor-move"
      >
        <Square className="w-4 h-4" />
        Signature Box
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => addElement('signature-name', 'Nama Penandatangan')}
        draggable
        onDragStart={(e) => handleDragStart(e, 'signature-name', 'Nama Penandatangan')}
        className="gap-2 cursor-move"
      >
        <User className="w-4 h-4" />
        Nama Penandatangan
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => addElement('custom-text', 'Custom Text')}
        draggable
        onDragStart={(e) => handleDragStart(e, 'custom-text', 'Custom Text')}
        className="gap-2 cursor-move"
      >
        <Plus className="w-4 h-4" />
        Custom Text
      </Button>
    </div>
  );
}
