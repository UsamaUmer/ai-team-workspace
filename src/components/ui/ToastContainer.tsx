import { useAppStore } from "../../app/store";

import ToastItem from "./ToastItem";

function ToastContainer() {
  const toasts = useAppStore((state) => state.toasts);

  return (
    <div style={containerStyle}>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
}

export default ToastContainer;

const containerStyle: React.CSSProperties = {
  position: "fixed",
  top: "20px",
  right: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  zIndex: 9999,
};
