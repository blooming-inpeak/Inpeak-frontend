import { createContext } from 'react';
import { ToastContextType } from './ToastTypes';

export const ToastContext = createContext<ToastContextType | null>(null);
