import { useRef } from 'react';
import { useCertificateStore } from '@/store/certificateStore';
import { DraggableElement } from './DraggableElement';

export function CertificateCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const currentPage = useCertificateStore((state) => state.getCurrentPage());
  const selectedElementId = useCertificateStore((state) => state.selectedElementId);
  const selectElement = useCertificateStore((state) => state.selectElement);

  if (!currentPage) return null;

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      selectElement(null);
    }
  };

  return (
    <div
      ref={canvasRef}
      onClick={handleCanvasClick}
      className="flex-1 relative bg-gray-50 overflow-auto flex items-center justify-center p-8"
    >
      <div
        className="relative shadow-lg"
        style={{
          // width: `${currentPage.width}px`,
          // height: `${currentPage.height}px`,
          height: '794px',
          width: '1123px',
          // backgroundImage: currentPage.backgroundImage
          //   ? `url(${currentPage.backgroundImage})`
          //   : undefined,
          // backgroundSize: 'cover',
          // backgroundPosition: 'center',
        }}
      >
        {currentPage.backgroundImage && (
          <img
            src={currentPage.backgroundImage}
            alt="background"
            style={{
              position: 'absolute',
              // inset: 0,
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover', // or 'contain' if you prefer
              // supply a string like 'center', 'top left', '50% 20%' from your page data
              objectPosition: 'center',
              // zIndex: 10, // ensures image sits behind draggable elements
              pointerEvents: 'none', // allow clicks to pass through to canvas/elements
            }}
          />
        )}
        {currentPage.elements.map((element) => (
          <DraggableElement
            key={element.id}
            element={element}
            isSelected={selectedElementId === element.id}
            onSelect={() => selectElement(element.id)}
          />
        ))}
      </div>
    </div>
  );
}
