import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CertificatePage } from '@/types/certificate';

export async function exportToPDF(
  pages: CertificatePage[],
  projectName: string = 'certificate'
) {
  try {
    const pdf = new jsPDF({
      orientation: pages[0].width > pages[0].height ? 'landscape' : 'portrait',
      unit: 'px',
      format: [pages[0].width, pages[0].height],
    });

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      
      // Create a temporary container for the page
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.width = `${page.width}px`;
      container.style.height = `${page.height}px`;
      container.style.backgroundColor = '#ffffff';
      container.style.fontFamily = 'system-ui, -apple-system, sans-serif';
      
      if (page.backgroundImage) {
        container.style.backgroundImage = `url(${page.backgroundImage})`;
        container.style.backgroundSize = 'cover';
        container.style.backgroundPosition = 'center';
      }

      // Add elements to the container
      page.elements.forEach((element) => {
        const elementDiv = document.createElement('div');
        elementDiv.style.position = 'absolute';
        elementDiv.style.left = `${element.position.x}px`;
        elementDiv.style.top = `${element.position.y}px`;
        elementDiv.style.width = `${element.size.width}px`;
        elementDiv.style.height = `${element.size.height}px`;
        elementDiv.style.zIndex = `${element.zIndex}`;
        elementDiv.style.overflow = 'hidden';

        if (element.type === 'signature-box') {
          elementDiv.style.border = '2px dashed #999';
          elementDiv.style.display = 'flex';
          elementDiv.style.alignItems = 'center';
          elementDiv.style.justifyContent = 'center';
        } else {
          elementDiv.style.display = 'flex';
          elementDiv.style.alignItems = 'center';
          elementDiv.style.justifyContent = element.textAlign === 'left' ? 'flex-start' : element.textAlign === 'right' ? 'flex-end' : 'center';
          elementDiv.style.textAlign = element.textAlign;
          elementDiv.style.color = element.color || '#000000';
          elementDiv.style.fontSize = `${element.fontSize}px`;
          elementDiv.style.fontFamily = element.fontFamily || 'sans-serif';
          elementDiv.style.padding = '4px';
          elementDiv.style.wordWrap = 'break-word';
          elementDiv.style.whiteSpace = 'pre-wrap';
          elementDiv.textContent = element.content;
        }

        container.appendChild(elementDiv);
      });

      document.body.appendChild(container);

      try {
        const canvas = await html2canvas(container, {
          backgroundColor: '#ffffff',
          scale: 2,
          useCORS: true,
          allowTaint: true,
          logging: false,
          removeContainer: true,
        });

        const imgData = canvas.toDataURL('image/png');

        if (i > 0) {
          pdf.addPage([page.width, page.height]);
        }

        pdf.addImage(imgData, 'PNG', 0, 0, page.width, page.height);
      } finally {
        document.body.removeChild(container);
      }
    }

    pdf.save(`${projectName}.pdf`);
  } catch (error) {
    console.error('Failed to export PDF:', error);
    throw error;
  }
}
