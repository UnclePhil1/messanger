"use client";
import React from "react";
import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  id,
  type,
  required,
  register,
  errors,
  disabled,
}) => {
  return (
    <div className="my-2">
      <label htmlFor={id}>{label}</label>
      <div className="">
        <input
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          {...register(id, { required })}
          className={clsx(
            `form-input w-[100%] bg-transparent py-2 px-4 border rounded-md border-blue-100 focus:ring-primary placeholder:text-gray-500`, errors[id] && "focus:ring-rose-500", disabled && "opacity-50 cursor-default"
          )}
        />
      </div>
    </div>
  );
};
