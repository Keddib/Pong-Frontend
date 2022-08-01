import { useEffect, useState } from "react";
import Header from "./components/Header";
import LeaderBoardList from "./components/List";
import { User } from "types/user";
import Loading from "src/components/Loading";

import user1 from "config/user";

export default function Leaderboard() {
  const [users, setUsers] = useState([] as User[]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // fetch data
    setTimeout(() => {
      setUsers([user1, user1, user1, user1]);
      setLoading(false);
    }, 1000);
  }, [users]);

  return (
    <div className="m-auto w-full h-full flex flex-col gap-4">
      <Header />
      <div className="bg-queenBlue/50 rounded-2xl py-4 pl-4 flex flex-col gap-4 h-full">
        <div className=" w-full flex justify-between pr-8 sm:pr-16">
          <div className="grow pl-10">
            <span className="mr-10">RANK</span>
            <span className="">PLAYER</span>
          </div>
          <span className="text-end ">XP</span>
        </div>
        <div className="Rank h-full">
          {isLoading ? <Loading /> : <LeaderBoardList users={users} />}
        </div>
      </div>
    </div>
  );
}
