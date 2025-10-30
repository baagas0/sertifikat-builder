import { Rnd } from 'react-rnd';
import { CertificateElement } from '@/types/certificate';
import { useCertificateStore } from '@/store/certificateStore';
import { cn } from '@/lib/utils';

interface DraggableElementProps {
  element: CertificateElement;
  isSelected: boolean;
  onSelect: () => void;
}

export function DraggableElement({
  element,
  isSelected,
  onSelect,
}: DraggableElementProps) {
  const updateElement = useCertificateStore((state) => state.updateElement);

  const handleDragStop = (e: any, d: any) => {
    updateElement(element.id, {
      position: { x: d.x, y: d.y },
    });
  };

  const handleResizeStop = (e: any, direction: any, ref: any, delta: any, position: any) => {
    updateElement(element.id, {
      position,
      size: {
        width: ref.offsetWidth,
        height: ref.offsetHeight,
      },
    });
  };

  const getElementContent = () => {
    if (element.type === 'signature-box') {
      return (
        <div className="w-full h-full border-2 border-dashed border-gray-400 flex items-center justify-center">
          <span className="text-xs text-gray-400">Signature Box</span>
        </div>
      );
    }

    return (
      <div
        className="w-full h-full flex items-center justify-center overflow-hidden"
        style={{
          textAlign: element.textAlign,
          color: element.color,
          fontSize: `${element.fontSize}px`,
          fontFamily: element.fontFamily || 'sans-serif',
          padding: '4px',
          wordWrap: 'break-word',
          whiteSpace: 'pre-wrap',
        }}
      >
        {element.content}
      </div>
    );
  };

  return (
    <Rnd
      default={{
        x: element.position.x,
        y: element.position.y,
        width: element.size.width,
        height: element.size.height,
      }}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      onClick={onSelect}
      className={cn(
        'cursor-move bg-white transition-all',
        isSelected && 'ring-2 ring-blue-500'
      )}
      style={{
        zIndex: element.zIndex,
      }}
    >
      {getElementContent()}
    </Rnd>
  );
}
