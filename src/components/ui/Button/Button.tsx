import "./Button.css";

interface Props {
  children: React.ReactNode;
  variant?: "primary" | "danger" | "ghost";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

function Button({
  type = "button",
  children,
  variant = "primary",
  onClick,
}: Props) {
  return (
    <button className={`btn ${variant}`} onClick={onClick} type={type}>
      {children}
    </button>
  );
}

export default Button;
