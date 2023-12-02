"use client";
import { Conversation, User } from "@prisma/client";
import React, { useMemo, useState } from "react";
import useOtherUser from "../../../../hooks/useOtherUser";
import Link from "next/link";
import { HiChevronLeft } from "react-icons/hi";
import Avatar from "../../../../components/avatar";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import ProfileDrawer from "./ProfileDrawer";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return "Active";
  }, [conversation]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <>
    <ProfileDrawer
      data={conversation}
      isOpen ={drawerOpen}
      onClose={() => setDrawerOpen(false)}
    />
    <div className="w-full flex border-b-[1px] sm:px-4 py-3 lg:px-6 justify-between items-center shadow-sm">
      <div className="flex gap-3 items-center">
        <Link
          href={"/conversations"}
          className="lg:hidden block text-sky-500 hover:text-sky-600 transition-colors cursor-pointer hover:bg-white rounded-full p-1"
        >
          <HiChevronLeft size={25} />
        </Link>
        <Avatar user={otherUser} />
        <div className="flex flex-col justify-start items-start">
          <div>
            <h2 className="text-[18px] font-medium">
              {conversation.name || otherUser.name}
            </h2>
          </div>
          <p className="text-blue-500 font-light text-[12px]">{statusText}</p>
        </div>
      </div>
      <HiEllipsisHorizontal size={30} onClick={() => setDrawerOpen(true)} className="text-sky-500 cursor-pointer hovertext-sky-600 transition"/>
      
    </div>
    </>
  );
};

export default Header;
