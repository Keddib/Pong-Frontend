import { Link } from "react-router-dom";
import ElementBar from "components/ElementBar";
import RoomCard from "components/RoomCard";
import { FunctionComponent } from "react";
import { Conversation } from "~/src/types/app";

const Conversation: FunctionComponent<{ conversation: Conversation }> = ({
  conversation,
}) => {
  return (
    <Link to={conversation.cid} className="">
      <ElementBar rank={-1}>
        <div className="flex justify-between items-center w-full">
          <RoomCard room={conversation} />
          {/* <span className="bg-pictonBlue w-4 h-4 sm:w-6 sm:h-6 rounded-full flex justify-center items-center">
          1
          </span> */}
        </div>
      </ElementBar>
    </Link>
  );
};

export default Conversation;
