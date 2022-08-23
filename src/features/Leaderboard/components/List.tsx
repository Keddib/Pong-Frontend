import { FunctionComponent } from "react";
import ElementBar from "components/ElementBar";
import UserCard from "components/Usercard";
import Rank from "./Rank";
import { User } from "types/app";

type Props = {
  users: User[];
};

const LeaderBoardList: FunctionComponent<Props> = ({ users }) => {
  const list = users.map((user, index) => (
    <li key={index}>
      <ElementBar rank={index}>
        <>
          <Rank index={index} />
          <div className="flex justify-between items-center w-full">
            <UserCard user={user} />
            <span className="sm:mr-8 text-left">{user.xp} XP</span>
          </div>
        </>
      </ElementBar>
    </li>
  ));

  return (
    <>
      {list.length ? (
        <ul className="flex flex-col gap-2">{list}</ul>
      ) : (
        <div className="w-full h-full flex justify-center items-center flex-col">
          <p className="text-center">Leaderboard is empty</p>
        </div>
      )}
    </>
  );
};

export default LeaderBoardList;
