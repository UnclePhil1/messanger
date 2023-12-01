"use client";
import useConversation from "../../../../hooks/useConversation";
import { FullMessageType } from "../../../../types";
import React, { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";

interface BodyProps {
  initialMessages: FullMessageType[];
}

const Body: React.FC<BodyProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages);
  const buttonRef = useRef<HTMLDivElement>(null);
  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`)
  }, [conversationId]);

  return (
  <div className="flex-1 overflow-y-auto w-[100%]">
    {
      messages.map((message, i) => (
        <MessageBox 
          isLast = {i === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))
    }
    <div ref={buttonRef} className="pt-20" />
  </div>
  )
};

export default Body;
