import { Button } from '@/components/ui/button';
import { useCertificateStore } from '@/store/certificateStore';
import { Type, Square, User, Plus } from 'lucide-react';

export function Toolbar() {
  const addElement = useCertificateStore((state) => state.addElement);

  return (
    <div className="flex gap-2 p-4 border-b bg-background">
      <Button
        variant="outline"
        size="sm"
        onClick={() => addElement('text', 'Jabatan')}
        className="gap-2"
      >
        <Type className="w-4 h-4" />
        Jabatan
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => addElement('signature-box')}
        className="gap-2"
      >
        <Square className="w-4 h-4" />
        Signature Box
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => addElement('signature-name', 'Nama Penandatangan')}
        className="gap-2"
      >
        <User className="w-4 h-4" />
        Nama Penandatangan
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => addElement('custom-text', 'Custom Text')}
        className="gap-2"
      >
        <Plus className="w-4 h-4" />
        Custom Text
      </Button>
    </div>
  );
}
