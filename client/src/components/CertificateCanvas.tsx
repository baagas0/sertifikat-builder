import { useRef, useState } from 'react';
import { useCertificateStore } from '@/store/certificateStore';
import { DraggableElement } from './DraggableElement';
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';

export function CertificateCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null); // Ref untuk inner div tanpa padding
  const currentPage = useCertificateStore((state) => state.getCurrentPage());
  const selectedElementId = useCertificateStore((state) => state.selectedElementId);
  const selectElement = useCertificateStore((state) => state.selectElement);
  const addElement = useCertificateStore((state) => state.addElement);
  const updateElement = useCertificateStore((state) => state.updateElement);
  const [isDragOver, setIsDragOver] = useState(false);

  if (!currentPage) return null;

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      selectElement(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const elementType = e.dataTransfer.getData('elementType') as 'text' | 'signature-box' | 'signature-name' | 'custom-text';
    const content = e.dataTransfer.getData('content');

    if (!elementType) return;

    // Get drop position relative to the canvas
    const canvasRect = innerRef.current?.getBoundingClientRect();
    if (!canvasRect) return;

    const x = e.clientX - canvasRect.left;
    const y = e.clientY - canvasRect.top;

    // Create element at drop position
    const elementDefaults = {
      'text': { content: 'Jabatan', width: 200, height: 40 },
      'signature-box': { content: '', width: 200, height: 80 },
      'signature-name': { content: 'Nama Penandatangan', width: 200, height: 40 },
      'custom-text': { content: 'Custom Text', width: 200, height: 40 }
    };

    const defaults = elementDefaults[elementType];

    // Add the element at the drop position
    addElement(
      elementType,
      content || defaults.content,
      { x: Math.max(0, x - defaults.width / 2), y: Math.max(0, y - defaults.height / 2) },
      { width: defaults.width, height: defaults.height }
    );
  };

  const handleDownloadPdf = async () => {
    if (!innerRef.current) return; // Gunakan innerRef, bukan canvasRef

    const canvas1 = await html2canvas(innerRef.current, {
      backgroundColor: '#ffffff',
      useCORS: true,
      scale: 2,
    });

    const imgData1 = canvas1.toDataURL('image/png', 100);

    const canvasWidthPx = 1123;
    const canvasHeightPx = 794;
    
    const pxToMm = 0.264583;
    const pdfWidth = canvasWidthPx * pxToMm;
    const pdfHeight = canvasHeightPx * pxToMm;

    const pdf = new jsPDF('l', 'mm', [pdfWidth, pdfHeight]);
    pdf.addImage(imgData1, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('certificate.pdf');
  };

  return (
    <div className="flex flex-col">
      <button onClick={handleDownloadPdf}>TES Download</button>
      <div
        ref={canvasRef}
        onClick={handleCanvasClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex-1 relative bg-gray-50 overflow-auto flex items-center justify-center p-8 ${
          isDragOver ? 'bg-blue-50' : ''
        }`}
      >
        <div
          ref={innerRef} // Tambahkan ref ke inner div
          className={`relative shadow-lg bg-white transition-all duration-200 ${
            isDragOver ? 'ring-2 ring-blue-400 ring-opacity-50' : ''
          }`}
          style={{
            // height: `${currentPage.height}px`,
            // width: `${currentPage.width}px`,
            height: '794px',
            width: '1123px',
          }}
        >
          {currentPage.backgroundImage && (
            <img
              src={currentPage.backgroundImage}
              alt="background"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                pointerEvents: 'none',
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
    </div>
  );
}