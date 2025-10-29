import React from "react";
import { CardProps } from "@/types/components";

export default function Card({
  children,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`bg-white/5 border border-white/10 rounded-2xl p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
