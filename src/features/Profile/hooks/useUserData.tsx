import { useParams } from "react-router-dom";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { Game, User } from "types/app";
import useSWR from "swr";

function useGetGames(uid: string) {
  const axiosPrivate = useAxiosPrivate();

  const { data, error } = useSWR(`game/history/${uid}`, fetcher);

  async function fetcher() {
    const res = await axiosPrivate.get<Game[]>(`game/history/${uid}`);
    throw new Error("invalid data");
    return res.data;
  }

  return [data, error];
}

function useGetUser() {
  const { username } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const { data, error } = useSWR(`user/${username}`, fetcher);

  async function fetcher() {
    const res = await axiosPrivate.get<User>(`user/${username}`);
    // check if payload is user
    throw new Error("invalid data");
    console.log("user", res.data);
    return res.data;
  }
  return [data, error];
}

export { useGetUser, useGetGames };
