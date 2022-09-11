import { Link } from "react-router-dom";
import ElementBar from "components/ElementBar";
import RoomCard from "components/RoomCard";
import { FunctionComponent } from "react";
import { Conversation } from "types/app";

const Conversation: FunctionComponent<{
  conversation: Conversation;
  activeConversation: {
    activeConv: string;
    setActiveConv: (s: string) => void;
  };
}> = ({ conversation, activeConversation }) => {
  const { activeConv, setActiveConv } = activeConversation;
  return (
    <Link
      to={conversation.cid}
      onClick={() => {
        setActiveConv(conversation.cid);
      }}
    >
      <ElementBar rank={activeConv == conversation.cid ? 0 : -1}>
        <div className="flex justify-between items-center w-full">
          <RoomCard room={conversation} />
          {conversation?.news && (
            <span className="bg-pictonBlue w-2 h-2 rounded-full flex justify-center items-center"></span>
          )}
        </div>
      </ElementBar>
    </Link>
  );
};

export default Conversation;
