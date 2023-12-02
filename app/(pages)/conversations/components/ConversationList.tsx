"use client";
import React, { useState } from "react";
import { FullConversationType } from "../../../types";
import { useRouter } from "next/navigation";
import useConversation from "../../../hooks/useConversation";
import { HiOutlineUserGroup } from "react-icons/hi";
import ConversationBox from "./ConversationBox";

interface ConversationListProps {
  initialItems: FullConversationType[];
}

const ConversationList: React.FC<ConversationListProps> = ({
  initialItems
}) => {
  const [items, setItems] = useState(initialItems);
  const router = useRouter();
  const { conversationId, isOpen } = useConversation();

  return (
    <aside>
      <div className="bg-white lg:rounded-md p-4 h-[100svh] lg:h-[80vh]">
        <figure className="flex justify-between items-center py-3 px-4 mb-4 rounded-md shadow-sm">
          <h1 className="text-black text-[1.5em] font-medium">Messages</h1>
          <HiOutlineUserGroup size={30} />
        </figure>
        <div>
            {
                items.map((item) => (
                    <ConversationBox 
                        key={item.id}
                        data={item}
                        selected={conversationId === item.id}
                    />
                ))
            }
        </div>
      </div>
    </aside>
  );
};

export default ConversationList;
