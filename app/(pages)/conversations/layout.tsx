import Sidebar from "@/../../app/components/sidebar/sidebar";
import ConversationList from "./components/ConversationList";
import getConversations from "../../actions/getConversations";

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  return (
    <Sidebar>
      <div className="h-full w-[100%] lg:flex justify-start items-center bg-primary lg:px-8 gap-10 relative">
        <div className="lg:w-[25%] w-[100%] lg:rounded-md rounded-none">
          <ConversationList initialItems={conversations} />
        </div>
        <div className="lg:w-[75%] w-[100%] absolute lg:relative top-0 right-0">{children}</div>
      </div>
    </Sidebar>  
  );
}
