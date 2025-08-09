export type Toast = {
  id: number;
  title: string;
  description?: string;
  icon?: string;
  isLeaving?: boolean;
};

export type ToastContextType = {
  addToast: (title: string, description?: string) => void;
  removeToast: (id: number) => void;
  toasts: Toast[];
};
