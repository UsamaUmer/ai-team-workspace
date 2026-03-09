import { useAppStore } from "../app/store";

export function useToast() {
  const addToast = useAppStore((state) => state.addToast);

  return {
    success: (message: string) => addToast(message, "success"),
    error: (message: string) => addToast(message, "error"),
    warning: (message: string) => addToast(message, "warning"),
    info: (message: string) => addToast(message, "info"),
  };
}