let toastInstance: ((title: string, description?: string) => void) | null = null;

export const setToast = (fn: (title: string, description?: string) => void) => {
  toastInstance = fn;
};

export const showToast = (title: string, description?: string) => {
  if (toastInstance) toastInstance(title, description);
};
