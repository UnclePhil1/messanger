"use client";
import React, { useCallback, useMemo, useState } from "react";
import { Conversation, Message, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";
import Avatar from "../../../components/avatar";
import { FullConversationType } from "../../../types";
import clsx from "clsx";
import useOtherUser from "../../../hooks/useOtherUser";
import { useSession } from "next-auth/react";
import { format } from "date-fns";

interface ConversationBoxProps {
  data: FullConversationType;
  selected?: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
  data,
  selected,
}) => {
  const router = useRouter();
  const otherUser = useOtherUser(data);
  const session = useSession();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  const lastMessage = useMemo(() => {
    const messaages = data.messages || [];

    return messaages[messaages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArray = lastMessage.seen || [];
    if (!userEmail) {
      return false;
    }

    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Sent an Image";
    }

    if (lastMessage?.body) {
      return lastMessage.body;
    }

    return "Stated a Conversation";
  }, [lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        `
    w-full
    relative
    flex
    justify-start
    items-center
    space-x-3
    bg-white
    p-3
   hover:bg-neutral-100
    rounded-lg
    transition
    cursor-pointer
    `,
        selected ? "bg-neutral-100" : "bg-white"
      )}
    >
      <Avatar user={otherUser} />
      <div className="">
        <div>
          <p className="text-[16px] font-medium">
            {data.name || otherUser.name}
          </p>
          {lastMessage?.createdAt && (
            <p className="text-[12px] text-gray-400 font-light">
              {format(new Date(lastMessage.createdAt), "p")}
            </p>
          )}
        </div>
        <p
          className={clsx(
            `truncate text-[12px]`,
            hasSeen ? "text-gray-500" : "text-black font-medium"
          )}
        >
          {lastMessageText}
        </p>
      </div>
    </div>
  );
};

export default ConversationBox;
