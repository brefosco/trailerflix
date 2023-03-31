import React, { HTMLAttributes } from "react";

type DarkBackgroundWrapperProps = {
  className?: string;
  children: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

function DarkBackgroundWrapper({
  className,
  children,
  ...props
}: DarkBackgroundWrapperProps) {
  return (
    <div
      className={`text-white min-h-screen bg-black ${className ?? ""}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default DarkBackgroundWrapper;
