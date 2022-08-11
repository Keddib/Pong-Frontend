import { FunctionComponent, useEffect, useState } from "react";
import { Spinner } from "components/Loading";
import ElementBar from "components/ElementBar";
import UserCard from "components/Usercard";
import SearchBar from "./SearchBar";
import { User } from "types/app";
import axios from "axios";
import useAxiosPrivate from "hooks/useAxiosPrivate";

const PlayersList: FunctionComponent<{ users: User[] }> = ({ users }) => {
  return (
    <>
      {users.length ? (
        <ul className="flex flex-col gap-2">
          {users.map((user) => (
            <li key={user.uid}>
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
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <p>no players found</p>
        </div>
      )}
    </>
  );
};

const Players = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [players, setPlayers] = useState([] as User[]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    // fetch freinds
    const abortController = new AbortController();
    async function getFriends() {
      try {
        // fetch user data
        const res = await axiosPrivate.get<User[]>("user/search/" + query, {
          signal: abortController.signal,
        });
        // check payload
        console.log("user", res.data);
        setPlayers(res.data);
        setLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("axios error ", error.response?.status);
          // if forbiden check user state and sign in
        } else {
          console.log(error);
        }
        setLoading(false);
        setError("somting went wrong! please try again");
      }
      // setErrorStatusCode(400);
    }
    getFriends();
    return () => {
      abortController.abort();
    };
  }, [query]);

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="w-full md:w-1/2 m-auto">
        <SearchBar setQuery={setQuery} />
      </div>
      <ul className="flex flex-col gap-1 h-full overflow-auto no-scrollbar">
        {!loading ? <PlayersList users={players} /> : <Spinner />}
      </ul>
    </div>
  );
};

export default Players;
