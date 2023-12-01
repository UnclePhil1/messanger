import getConversationById from "../../../actions/getConversationById";
import getMesssages from "../../../actions/getMessages";
import EmptyState from "../../../components/emptystate";
import Body from "./components/Body";
import Form from "./components/Form";
import Header from "./components/Header";

interface IParams {
  conversationId: string;
}

const ConversationId = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMesssages(params.conversationId);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="lg-pl-80 h-full lg:block flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="w-[100%] rounded-lg h-[80vh] p-4 bg-gray-50 flex flex-col justify-center items-center">
      <Header conversation={conversation} />
      <Body initialMessages={messages} />
      <Form />
    </div>
  );
};

export default ConversationId;
