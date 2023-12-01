"use client";
import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
  placeholder?: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const MessageInput: React.FC<MessageInputProps> = ({
  placeholder,
  id,
  type,
  register,
  required,
  errors,
}) => {
  return (
    <div className="overflow-x-hidden">
      <input
        id={id}
        type={type}
        autoComplete={id}
        {...register(id, { required })}
        placeholder={placeholder}
        className="text-black font-light bg-slate-200 py-2 px-4 rounded-full focus:outline-none text-[14px] w-[100%] md:w-[400px]"
      />
    </div>
  );
};

export default MessageInput;
