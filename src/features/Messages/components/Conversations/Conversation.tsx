import { Link } from "react-router-dom";
import ElementBar from "components/ElementBar";
import RoomCard from "components/RoomCard";
import { FunctionComponent } from "react";
import { Conversation } from "types/app";
import { mediaQueries } from "config";
import useMedia from "hooks/useMedia";

const Conversation: FunctionComponent<{
  conversation: Conversation;
  activeConversation: {
    activeConv: string;
    setActiveConv: (s: string) => void;
  };
}> = ({ conversation, activeConversation }) => {
  const { activeConv, setActiveConv } = activeConversation;
  const lg = useMedia(mediaQueries.lg);
  return (
    <Link
      to={conversation.cid}
      onClick={() => {
        if (lg) {
          setActiveConv(conversation.cid);
        }
        conversation.news = false;
      }}
    >
      <ElementBar rank={activeConv == conversation.cid ? 0 : -1} className="">
        <div className="flex justify-between items-center w-full">
          <RoomCard room={conversation} />
          {conversation?.news && (
            <span className="bg-red w-2 h-2 rounded-full flex justify-center items-center"></span>
          )}
        </div>
      </ElementBar>
    </Link>
  );
};

export default Conversation;
