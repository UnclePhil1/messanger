"use client";
import React from "react";
import clsx from "clsx";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  type,
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
  disabled,
}) => {
  return (
    <div>
      <button
        onClick={onClick}
        type={type}
        disabled={disabled}
        className={clsx(
          `
            my-4 
            py-2 
            px-4 
            border
            rounded-md
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-2
            `,
          disabled && "opacity-50 cursor-default",
          fullWidth && "w-full",
          secondary ? "text-gray-900" : "text-white",
          danger &&
            "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600",
          !secondary && !danger && "bg-primary focus-visible:outline-blue-600"
        )}
      >{children}</button>
    </div>
  );
};
