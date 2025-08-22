import React, { useCallback, useEffect, useState } from 'react';
import { setToast } from './ToastManager';
import ErrorSvg from '../../assets/img/Error.svg';
import { Toast } from './ToastTypes';
import { ToastContext } from './ToastContext';

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = (id: number) => {
    setToasts(prev => prev.map(t => (t.id === id ? { ...t, isLeaving: true } : t)));
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 350);
  };

  const addToast = useCallback((title: string, description?: string) => {
    const id = Date.now();
    setToasts(prev => {
      const isDuplicate = prev.some(
        toast => toast.title === title && (toast.description ?? '') === (description ?? ''),
      );
      if (isDuplicate) return prev;

      return [
        {
          id,
          title,
          description,
          icon: ErrorSvg,
        },
        ...prev,
      ];
    });

    setTimeout(() => {
      removeToast(id);
    }, 1800);
  }, []);

  useEffect(() => {
    setToast(addToast); // 외부에서 접근 가능하게 함수를 등록
  }, [addToast]);

  return <ToastContext.Provider value={{ addToast, removeToast, toasts }}>{children}</ToastContext.Provider>;
};
