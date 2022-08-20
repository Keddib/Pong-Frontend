import Coversation from "./Conversation";
import { Outlet } from "react-router-dom";

const ConversationsList = () => {
  return (
    <div className="border">
      <ul className="flex flex-col gap-1">
        <li>
          <Coversation />
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default ConversationsList;
