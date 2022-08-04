import { FunctionComponent, useEffect, useState } from "react";
import { Spinner } from "components/Loading";
import ElementBar from "components/ElementBar";
import UserCard from "components/Usercard";
import SearchBar from "./SearchBar";
import { User } from "types/app";
import user1 from "config/user";

const PlayersList: FunctionComponent<{ users: User[] }> = ({ users }) => {
  return (
    <ul className="flex flex-col gap-2">
      {users.map((user) => (
        <li key={user.id}>
          <ElementBar rank={-1}>
            <div className="w-full flex justify-between items-center">
              <UserCard user={user} />
              <div className="flex items-center gap-4 sm:gap-8 sm:mr-8">
                actions will be taken based on user relationship
              </div>
            </div>
          </ElementBar>
        </li>
      ))}
    </ul>
  );
};

const Players = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([] as User[]);

  useEffect(() => {
    setLoading(false);
    setUsers([user1]);
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <SearchBar />
      <ul className="flex flex-col gap-1 h-full overflow-auto no-scrollbar">
        {!loading ? <PlayersList users={users} /> : <Spinner />}
      </ul>
    </div>
  );
};

export default Players;
