import { useAppStore } from "../../app/store";
import { useEffect } from "react";

import type { Toast } from "../../app/store";

interface ToastItemProps {
  toast: Toast;
}

function ToastItem({ toast }: ToastItemProps) {
  function getToastColor(type: string): React.CSSProperties {
    switch (type) {
      case "success":
        return { background: "#16a34a" };

      case "error":
        return { background: "#dc2626" };

      case "warning":
        return { background: "#f59e0b" };

      case "info":
        return { background: "#2563eb" };

      default:
        return { background: "#333" };
    }
  }
  const removeToast = useAppStore((state) => state.removeToast);

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast.id, removeToast]);

  return (
    <div style={{ ...toastStyle, ...getToastColor(toast.type) }}>
      {toast.message}
    </div>
  );
}

export default ToastItem;

const toastStyle: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: "6px",
  color: "#fff",
  fontSize: "14px",
  minWidth: "220px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
};
