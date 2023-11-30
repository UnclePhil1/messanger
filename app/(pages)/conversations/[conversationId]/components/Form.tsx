"use client";

import useConversation from "../../../../hooks/useConversation";

const Form = () => {
    const { conversationId } = useConversation();

  return (

    <div className="flex-1 overflow-y-auto">
      Form
    </div>
  );
};

export default Form;
