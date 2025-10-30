import { useRef } from 'react';
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

  if (!currentPage) return null;

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      selectElement(null);
    }
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
        className="flex-1 relative bg-gray-50 overflow-auto flex items-center justify-center p-8"
      >
        <div
          ref={innerRef} // Tambahkan ref ke inner div
          className="relative shadow-lg"
          style={{
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