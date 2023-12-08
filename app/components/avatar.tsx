"use client";
import React from "react";
import Users, { User } from "@prisma/client";
import Image from "next/image";
import useActiveList from "../hooks/useActiveList";

interface Avatarprops {
  user?: User;
}

const Avatar: React.FC<Avatarprops> = ({ user }) => {
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1;

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
      {isActive && (
        <span className="w-2 h-2 top-0 absolute bg-green-400 md:w-3 md:h-3 rounded-full border-2 border-white"></span>
      )}
    </div>
  );
};
export default Avatar;
