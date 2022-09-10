import { Link } from "react-router-dom";
import ElementBar from "components/ElementBar";
import RoomCard from "components/RoomCard";
import { FunctionComponent } from "react";
import { Conversation } from "types/app";

const Conversation: FunctionComponent<{
  conversation: Conversation;
  activeConv: [activeConv: string, setActiveConv: (s: string) => void];
}> = ({ conversation, activeConv }) => {
  const [aConv, setAConv] = activeConv;

  return (
    <Link
      to={conversation.cid}
      onClick={() => {
        setAConv(conversation.cid);
      }}
    >
      <ElementBar rank={aConv == conversation.cid ? 0 : -1}>
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
