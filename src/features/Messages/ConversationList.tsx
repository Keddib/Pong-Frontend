import { Link } from "react-router-dom";
import ElementBar from "components/ElementBar";
import UserCard from "components/Usercard";

import user1 from "config/user";

const ConversationLink = () => {
  return (
    <Link to="12893">
      <ElementBar rank={-1}>
        <div className="flex justify-between items-center w-full">
          <UserCard user={user1} />
          <span className="bg-pictonBlue w-4 h-4 sm:w-6 sm:h-6 rounded-full flex justify-center items-center">
            1
          </span>
        </div>
      </ElementBar>
    </Link>
  );
};

export default function ConversationList() {
  return (
    <ul className="flex flex-col gap-1">
      <li>
        <ConversationLink />
      </li>
      <li>
        <ConversationLink />
      </li>
    </ul>
  );
}
