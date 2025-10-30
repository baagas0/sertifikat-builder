import JSZip from 'jszip';
import { CertificateProject } from '@/types/certificate';

export async function exportProjectAsZip(project: CertificateProject) {
  try {
    const zip = new JSZip();

    // Add project metadata
    const metadata = {
      name: project.name,
      id: project.id,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
      pageCount: project.pages.length,
    };

    zip.file('project.json', JSON.stringify(metadata, null, 2));

    // Add pages data
    const pagesData = project.pages.map((page, index) => ({
      pageNumber: index + 1,
      width: page.width,
      height: page.height,
      backgroundImage: page.backgroundImage ? `[Image URL: ${page.backgroundImage}]` : 'None',
      elementCount: page.elements.length,
      elements: page.elements.map((el) => ({
        id: el.id,
        type: el.type,
        content: el.content,
        position: el.position,
        size: el.size,
        fontSize: el.fontSize,
        textAlign: el.textAlign,
        color: el.color,
      })),
    }));

    zip.file('pages.json', JSON.stringify(pagesData, null, 2));

    // Generate and download zip
    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${project.name.replace(/\s+/g, '-')}-project.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Failed to export project as zip:', error);
    throw error;
  }
}
