export type ElementType = 'text' | 'signature-box' | 'signature-name' | 'custom-text';

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface CertificateElement {
  id: string;
  type: ElementType;
  position: Position;
  size: Size;
  content: string;
  fontSize: number;
  textAlign: 'left' | 'center' | 'right';
  fontFamily?: string;
  color?: string;
  zIndex: number;
}

export interface CertificatePage {
  id: string;
  backgroundImage?: string;
  backgroundImageWidth?: number;
  backgroundImageHeight?: number;
  elements: CertificateElement[];
  width: number; // in pixels
  height: number; // in pixels
  order: number;
}

export interface CertificateProject {
  id: string;
  name: string;
  pages: CertificatePage[];
  currentPageId: string;
  createdAt: Date;
  updatedAt: Date;
}

export const DEFAULT_A4_WIDTH = 1123; // 297mm in pixels at 96dpi
export const DEFAULT_A4_HEIGHT = 794; // 210mm in pixels at 96dpi
