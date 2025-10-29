import React from "react";
import { ButtonProps } from "@/types/components";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  loading = false,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-accent text-black hover:bg-accent/90 focus:ring-accent",
    secondary:
      "bg-white/5 border border-white/20 text-white hover:bg-white/10 focus:ring-white/20",
    outline:
      "border-2 border-accent text-accent hover:bg-accent hover:text-black focus:ring-accent",
    ghost: "text-white hover:bg-white/10 focus:ring-white/20",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <span className="mr-2 animate-spin">⏳</span> : null}
      {children}
    </button>
  );
}
