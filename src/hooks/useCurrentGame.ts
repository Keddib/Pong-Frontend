import { useEffect, useState } from "react";
import { Game } from "../types/app";
import useAxiosPrivate from "./useAxiosPrivate";

export default function useCurrentGame(userId: string) {
  const axiosPrivate = useAxiosPrivate();
  const [gameId, setGameId] = useState("");

  useEffect(() => {
    setGameId("loading");
    const abortController = new AbortController();
    async function getCurrentGameId() {
      try {
        const res = await axiosPrivate.get<Game[]>(`/game/current/${userId}`, {
          signal: abortController.signal
        });
        if (res.data.length) {
          setGameId(res.data[0].gameId);
        } else {
          setGameId("error");
        }
      } catch (error) {
        setGameId("error");
      }
    }
    getCurrentGameId();
    return () => {
      abortController.abort();
    };
  }, []);

  return gameId;
}
