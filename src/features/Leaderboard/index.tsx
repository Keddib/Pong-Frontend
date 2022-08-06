import { useEffect, useState } from "react";
import Header from "./components/Header";
import LeaderBoardList from "./components/List";
import { User } from "types/app";
import { Spinner } from "src/components/Loading";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import axios from "axios";

export default function Leaderboard() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [players, setPlayers] = useState([] as User[]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    // fetch freinds
    const abortController = new AbortController();
    async function getFriends() {
      try {
        // fetch user data
        const res = await axiosPrivate.get<User[]>(``, {
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
  }, []);

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
          {loading ? <Spinner /> : <LeaderBoardList users={players} />}
        </div>
      </div>
    </div>
  );
}
