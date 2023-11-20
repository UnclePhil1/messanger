"use client";
import React from "react";
import { IconType } from "react-icons";

interface AuthSocialProps {
  icon: IconType;
  onClick: () => void;
}

export const AuthButton:React.FC<AuthSocialProps> = ({
  icon: Icon,
  onClick
}) => {

  return (
   <div className="">
      <button
        type="button"
        onClick={onClick}
        className="py-2 w-[100px] md:w-[150px] ring-1 text-center self-center flex justify-center px-4 outline outline-gray-300 hover:bg-gray-100 text-gray-900 rounded-md"
      >
        <Icon />
      </button>
   </div>
  );
};
