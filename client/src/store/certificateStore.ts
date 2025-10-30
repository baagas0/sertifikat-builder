import { create } from 'zustand';
import { CertificateProject, CertificatePage, CertificateElement, DEFAULT_A4_WIDTH, DEFAULT_A4_HEIGHT } from '@/types/certificate';

interface CertificateStore {
  project: CertificateProject | null;
  selectedElementId: string | null;
  
  // Project actions
  initializeProject: (projectId?: string) => void;
  setProjectName: (name: string) => void;
  
  // Page actions
  addPage: () => void;
  deletePage: (pageId: string) => void;
  setCurrentPage: (pageId: string) => void;
  getCurrentPage: () => CertificatePage | null;
  
  // Element actions
  addElement: (type: 'text' | 'signature-box' | 'signature-name' | 'custom-text', content?: string, position?: { x: number; y: number }, size?: { width: number; height: number }) => void;
  updateElement: (elementId: string, updates: Partial<CertificateElement>) => void;
  deleteElement: (elementId: string) => void;
  selectElement: (elementId: string | null) => void;
  
  // Background actions
  setPageBackground: (pageId: string, imageUrl: string, width: number, height: number) => void;
  removePageBackground: (pageId: string) => void;
  
  // Persistence
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
}

const STORAGE_KEY = 'certificate-project';

export const useCertificateStore = create<CertificateStore>((set, get) => ({
  project: null,
  selectedElementId: null,

  initializeProject: (projectId = 'default') => {
    set({
      project: {
        id: projectId,
        name: 'Untitled Certificate',
        pages: [
          {
            id: 'page-1',
            elements: [],
            width: DEFAULT_A4_WIDTH,
            height: DEFAULT_A4_HEIGHT,
            order: 0,
          },
        ],
        currentPageId: 'page-1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  },

  setProjectName: (name: string) => {
    set((state) => {
      if (!state.project) return state;
      return {
        project: {
          ...state.project,
          name,
          updatedAt: new Date(),
        },
      };
    });
  },

  addPage: () => {
    set((state) => {
      if (!state.project) return state;
      const newPageId = `page-${Date.now()}`;
      const newPage: CertificatePage = {
        id: newPageId,
        elements: [],
        width: DEFAULT_A4_WIDTH,
        height: DEFAULT_A4_HEIGHT,
        order: state.project.pages.length,
      };
      return {
        project: {
          ...state.project,
          pages: [...state.project.pages, newPage],
          currentPageId: newPageId,
          updatedAt: new Date(),
        },
      };
    });
  },

  deletePage: (pageId: string) => {
    set((state) => {
      if (!state.project || state.project.pages.length <= 1) return state;
      const updatedPages = state.project.pages.filter((p) => p.id !== pageId);
      const newCurrentPageId = state.project.currentPageId === pageId ? updatedPages[0].id : state.project.currentPageId;
      return {
        project: {
          ...state.project,
          pages: updatedPages,
          currentPageId: newCurrentPageId,
          updatedAt: new Date(),
        },
      };
    });
  },

  setCurrentPage: (pageId: string) => {
    set((state) => {
      if (!state.project) return state;
      return {
        project: {
          ...state.project,
          currentPageId: pageId,
        },
      };
    });
  },

  getCurrentPage: () => {
    const state = get();
    if (!state.project) return null;
    return state.project.pages.find((p) => p.id === state.project!.currentPageId) || null;
  },

  addElement: (type, content = '', position, size) => {
    set((state) => {
      if (!state.project) return state;
      const currentPage = state.project.pages.find((p) => p.id === state.project!.currentPageId);
      if (!currentPage) return state;

      const elementDefaults = {
        'text': { content: 'Jabatan', width: 200, height: 40 },
        'signature-box': { content: '', width: 200, height: 80 },
        'signature-name': { content: 'Nama Penandatangan', width: 200, height: 40 },
        'custom-text': { content: 'Custom Text', width: 200, height: 40 }
      };

      const defaults = elementDefaults[type];

      const newElement: CertificateElement = {
        id: `element-${Date.now()}`,
        type,
        position: position || { x: 50, y: 50 },
        size: size || { width: defaults.width, height: defaults.height },
        content: content || defaults.content,
        fontSize: 16,
        textAlign: 'center',
        color: '#000000',
        zIndex: currentPage.elements.length,
      };

      const updatedPages = state.project.pages.map((p) =>
        p.id === state.project!.currentPageId ? { ...p, elements: [...p.elements, newElement] } : p
      );

      return {
        project: {
          ...state.project,
          pages: updatedPages,
          updatedAt: new Date(),
        },
        selectedElementId: newElement.id,
      };
    });
  },

  updateElement: (elementId: string, updates: Partial<CertificateElement>) => {
    set((state) => {
      if (!state.project) return state;
      const updatedPages = state.project.pages.map((p) =>
        p.id === state.project!.currentPageId
          ? {
              ...p,
              elements: p.elements.map((e) =>
                e.id === elementId ? { ...e, ...updates } : e
              ),
            }
          : p
      );
      return {
        project: {
          ...state.project,
          pages: updatedPages,
          updatedAt: new Date(),
        },
      };
    });
  },

  deleteElement: (elementId: string) => {
    set((state) => {
      if (!state.project) return state;
      const updatedPages = state.project.pages.map((p) =>
        p.id === state.project!.currentPageId
          ? {
              ...p,
              elements: p.elements.filter((e) => e.id !== elementId),
            }
          : p
      );
      return {
        project: {
          ...state.project,
          pages: updatedPages,
          updatedAt: new Date(),
        },
        selectedElementId: state.selectedElementId === elementId ? null : state.selectedElementId,
      };
    });
  },

  selectElement: (elementId: string | null) => {
    set({ selectedElementId: elementId });
  },

  setPageBackground: (pageId: string, imageUrl: string, width: number, height: number) => {
    set((state) => {
      if (!state.project) return state;
      const updatedPages = state.project.pages.map((p) =>
        p.id === pageId
          ? {
              ...p,
              backgroundImage: imageUrl,
              backgroundImageWidth: width,
              backgroundImageHeight: height,
              width: Math.round((width * 96) / 25.4), // Convert mm to pixels
              height: Math.round((height * 96) / 25.4),
            }
          : p
      );
      return {
        project: {
          ...state.project,
          pages: updatedPages,
          updatedAt: new Date(),
        },
      };
    });
  },

  removePageBackground: (pageId: string) => {
    set((state) => {
      if (!state.project) return state;
      const updatedPages = state.project.pages.map((p) =>
        p.id === pageId
          ? {
              ...p,
              backgroundImage: undefined,
              backgroundImageWidth: undefined,
              backgroundImageHeight: undefined,
              width: DEFAULT_A4_WIDTH,
              height: DEFAULT_A4_HEIGHT,
            }
          : p
      );
      return {
        project: {
          ...state.project,
          pages: updatedPages,
          updatedAt: new Date(),
        },
      };
    });
  },

  saveToLocalStorage: () => {
    const state = get();
    if (state.project) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.project));
    }
  },

  loadFromLocalStorage: () => {
    // Load project from localStorage
    console.log('===> certificateStore.ts:271 ~ LOAD PROJECT');
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const project = JSON.parse(stored);
        // Restore Date objects
        if (project.createdAt) {
          project.createdAt = new Date(project.createdAt);
        }
        if (project.updatedAt) {
          project.updatedAt = new Date(project.updatedAt);
        }
        console.log('===> certificateStore.ts:276 ~ project', project);
        set({ project });
      } catch (error) {
        console.error('Failed to load project from localStorage:', error);
      }
    }
  },
}));
