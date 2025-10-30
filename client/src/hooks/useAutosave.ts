import { useEffect } from 'react';
import { useCertificateStore } from '@/store/certificateStore';

export const useAutosave = (interval: number = 5000) => {
  const saveToLocalStorage = useCertificateStore((state) => state.saveToLocalStorage);
  const project = useCertificateStore((state) => state.project);

  useEffect(() => {
    const timer = setInterval(() => {
      if (project) {
        saveToLocalStorage();
        console.log('Project autosaved at', new Date().toLocaleTimeString());
      }
    }, interval);

    return () => clearInterval(timer);
  }, [saveToLocalStorage, project, interval]);

  // Also save on beforeunload
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (project) {
        saveToLocalStorage();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [saveToLocalStorage, project]);
};
