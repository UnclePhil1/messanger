"use client";
import React, { useEffect, useMemo, useState } from "react";
import { FullConversationType } from "../../../types";
import { useRouter } from "next/navigation";
import useConversation from "../../../hooks/useConversation";
import { HiOutlineUserGroup } from "react-icons/hi";
import ConversationBox from "./ConversationBox";
import GroupChatModal from "./groupChatModal";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { pusherClient } from "../../../libs/pusher";
import { find } from "lodash";

interface ConversationListProps {
  initialItems: FullConversationType[];
  users: User[];
}

const ConversationList: React.FC<ConversationListProps> = ({
  initialItems,
  users,
}) => {
  const [items, setItems] = useState(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const session = useSession();

  const { conversationId, isOpen } = useConversation();

  const pusherKey = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    pusherClient.subscribe(pusherKey);

    const updateHandler = (conversation: FullConversationType) => {
      setItems((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation.messages,
            };
          }

          return currentConversation;
        })
      );
    };

    const newHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }

        return [conversation, ...current];
      });
    };

    const removeHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        return [...current.filter((convo) => convo.id !== conversation.id)];
      });

      if (conversationId === conversation.id) {
        router.push('/conversations')
      }
    };

    pusherClient.bind("conversation:update", updateHandler);
    pusherClient.bind("conversation:new", newHandler);
    pusherClient.bind("conversation:remove", removeHandler);
  }, [pusherKey, router, conversationId]);

  return (
    <>
      <GroupChatModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        users={users}
      />
      <aside>
        <div className="bg-white lg:rounded-md p-4 h-[100svh] lg:h-[80vh] overflow-hidden overflow-y-auto">
          <figure className="flex justify-between items-center py-3 px-4 mb-4 rounded-md shadow-sm">
            <h1 className="text-black text-[1.5em] font-medium">Messages</h1>
            <div
              className="cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <HiOutlineUserGroup size={30} />
            </div>
          </figure>
          <div className="overflow-auto">
            {items.map((item) => (
              <ConversationBox
                key={item.id}
                data={item}
                selected={conversationId === item.id}
              />
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default ConversationList;
