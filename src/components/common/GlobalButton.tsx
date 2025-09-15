import React from "react";
import { Button } from "@heroui/react";

export type ButtonSize = "small" | "medium" | "large";
export type ButtonVariant =
  | "solid"
  | "bordered"
  | "light"
  | "flat"
  | "faded"
  | "shadow"
  | "ghost";
export type ButtonColor =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger";

interface GlobalButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
  color?: ButtonColor;
  className?: string;
  isLoading?: boolean;
}

const sizeMap: Record<ButtonSize, "sm" | "md" | "lg"> = {
  small: "sm",
  medium: "md",
  large: "lg",
};

const GlobalButton: React.FC<GlobalButtonProps> = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  size = "medium",
  variant = "flat",
  color = "primary",
  className,
  isLoading = false,
}) => {
  return (
    <Button
      onClick={onClick}
      type={type}
      disabled={disabled || isLoading}
      size={sizeMap[size]}
      variant={variant}
      color={color}
      className={className}
      isLoading={isLoading}
    >
      {children}
    </Button>
  );
};

export default GlobalButton;
