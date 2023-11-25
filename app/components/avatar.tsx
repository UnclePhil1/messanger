"use client";
import React from "react";
import Users, { User } from "@prisma/client";
import Image from "next/image";

interface Avatarprops {
  user?: User;
}

const Avatar: React.FC<Avatarprops> = ({ user }) => {
  return (
    <div className="relative">
      <div className="relative w-[40px] h-[40px] rounded-full border-2 border-primary overflow-hidden flex justify-center items-center self-center my-0 mx-auto">
        <Image
          src={user?.image || "/images/profile.jpg"}
          alt="Image of the Profile User"
          width={40}
          height={40}
          className="w-full h-full"
        />
      </div>
      <span className="w-2 h-2 top-0 right-[-8px] absolute bg-green-400 md:w-3 md:h-3 rounded-full border-2 border-white"></span>
    </div>
  );
};
export default Avatar;
