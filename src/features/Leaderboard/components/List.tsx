import { FunctionComponent } from "react";
import ElementBar from "components/ElementBar";
import UserCard from "components/Usercard";
import Rank from "./Rank";
import { User } from "types/user";

type Props = {
  users: User[];
};

const LeaderBoardList: FunctionComponent<Props> = ({ users }) => {
  return (
    <ul className="flex flex-col gap-2">
      {users.map((user, index) => (
        <li key={user.id + index}>
          <ElementBar rank={index}>
            <>
              <Rank index={index} />
              <div className="flex justify-between items-center w-full">
                <UserCard user={user} />
                <span className="sm:mr-8">LVL</span>
              </div>
            </>
          </ElementBar>
        </li>
      ))}
    </ul>
  );
};

export default LeaderBoardList;
