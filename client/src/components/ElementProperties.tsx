import { useCertificateStore } from '@/store/certificateStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Trash2, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

export function ElementProperties() {
  const selectedElementId = useCertificateStore((state) => state.selectedElementId);
  const currentPage = useCertificateStore((state) => state.getCurrentPage());
  const updateElement = useCertificateStore((state) => state.updateElement);
  const deleteElement = useCertificateStore((state) => state.deleteElement);

  if (!selectedElementId || !currentPage) {
    return (
      <Card className="p-4 text-center text-muted-foreground">
        Select an element to edit properties
      </Card>
    );
  }

  const element = currentPage.elements.find((e) => e.id === selectedElementId);
  if (!element) return null;

  const handleContentChange = (value: string) => {
    updateElement(selectedElementId, { content: value });
  };

  const handleFontSizeChange = (value: number[]) => {
    updateElement(selectedElementId, { fontSize: value[0] });
  };

  const handleTextAlignChange = (align: 'left' | 'center' | 'right') => {
    updateElement(selectedElementId, { textAlign: align });
  };

  const handleColorChange = (value: string) => {
    updateElement(selectedElementId, { color: value });
  };

  const handleDelete = () => {
    deleteElement(selectedElementId);
  };

  return (
    <Card className="p-4 space-y-4">
      <div>
        <Label className="text-xs font-semibold text-muted-foreground">ELEMENT TYPE</Label>
        <p className="text-sm font-medium capitalize mt-1">{element.type.replace('-', ' ')}</p>
      </div>

      {element.type !== 'signature-box' && (
        <div className="space-y-2">
          <Label htmlFor="content">Content</Label>
          <Input
            id="content"
            value={element.content}
            onChange={(e) => handleContentChange(e.target.value)}
            placeholder="Enter text"
          />
        </div>
      )}

      <div className="space-y-2">
        <Label>Font Size: {element.fontSize}px</Label>
        <Slider
          value={[element.fontSize]}
          onValueChange={handleFontSizeChange}
          min={8}
          max={72}
          step={1}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label>Text Alignment</Label>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={element.textAlign === 'left' ? 'default' : 'outline'}
            onClick={() => handleTextAlignChange('left')}
          >
            <AlignLeft className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant={element.textAlign === 'center' ? 'default' : 'outline'}
            onClick={() => handleTextAlignChange('center')}
          >
            <AlignCenter className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant={element.textAlign === 'right' ? 'default' : 'outline'}
            onClick={() => handleTextAlignChange('right')}
          >
            <AlignRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="color">Color</Label>
        <div className="flex gap-2">
          <Input
            id="color"
            type="color"
            value={element.color || '#000000'}
            onChange={(e) => handleColorChange(e.target.value)}
            className="w-12 h-10 p-1"
          />
          <Input
            type="text"
            value={element.color || '#000000'}
            onChange={(e) => handleColorChange(e.target.value)}
            placeholder="#000000"
            className="flex-1"
          />
        </div>
      </div>

      <Button
        variant="destructive"
        size="sm"
        onClick={handleDelete}
        className="w-full gap-2"
      >
        <Trash2 className="w-4 h-4" />
        Delete Element
      </Button>
    </Card>
  );
}
