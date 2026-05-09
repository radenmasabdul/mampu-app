import { type ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface AppButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function ButtonApp({
  children,
  className,
  onClick,
  type = "button",
  disabled,
}: AppButtonProps) {
  return (
    <Button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}
