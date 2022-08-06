import { FunctionComponent, useEffect, useState } from "react";
import { Game } from "~/src/types/app";
import GameResult from "../Gameresult";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import axios from "axios";
import { Spinner } from "components/Loading";

const MatchHistory: FunctionComponent<{ username: string }> = ({
  username,
}) => {
  const [loading, setLoading] = useState(true);
  const [gamesArray, setGamesArray] = useState([] as Game[]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const abortController = new AbortController();
    async function getGamesData() {
      try {
        // fetch game data
        const res = await axiosPrivate.get<Game[]>(`games/${username}`, {
          signal: abortController.signal,
        });
        // check if payload is game
        console.log("games", res.data);
        setGamesArray(res.data);
        setLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("axios error ", error.status);
          // if forbiden check user state and logout
        } else {
          console.log(error);
        }
      }
      setLoading(false);
    }
    getGamesData();
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const games = (function getgames() {
    if (gamesArray.length) {
      return gamesArray.map((game) => (
        <li key={game.id}>
          <GameResult game={game} />
        </li>
      ));
    }
    return <p>no games found</p>;
  })();

  return (
    <div className="rounded-2xl bg-spaceCadet p-2 md:p-4 flex flex-col gap-2">
      <h2 className="mb-2 capitalize text-xl md:text-3xl">match History</h2>
      <ul className="flex flex-col gap-2">{loading ? <Spinner /> : games}</ul>
    </div>
  );
};

export default MatchHistory;
