import React, { HTMLAttributes } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  variant?: string;
} & HTMLAttributes<HTMLButtonElement>;

function Button({ children, className, variant = "primary", ...props }: Props) {
  const primaryButtonClasses = "bg-[#0578FF] hover:bg-blue-700";
  const removeButtonClasses = "bg-red-600 hover:bg-red-800";

  return (
    <button
      className={`${
        variant === "primary"
          ? primaryButtonClasses
          : variant === "remove"
          ? removeButtonClasses
          : ""
      } rounded ${className ?? ""}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
