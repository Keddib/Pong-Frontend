import { useParams } from "react-router-dom";
import { Game, User } from "types/app";
import useSWR from "swr";
import useRefreshToken from "~/src/hooks/useRefreshToken";
import { axiosAuth } from "services/axios/axios";

function useGetGames(uid: string) {
  const refresh = useRefreshToken();
  const { data, error } = useSWR(`game/history/${uid}`, fetcher);

  async function fetcher() {
    const accessToken = await refresh();
    const res = await axiosAuth.get<Game[]>(`game/history/${uid}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // validate data
    return res.data;
  }

  return [data, error];
}

function useGetUser() {
  const { username } = useParams();
  const refresh = useRefreshToken();
  const { data, error } = useSWR(`user/${username}`, fetcher);

  async function fetcher() {
    const accessToken = await refresh();
    const res = await axiosAuth.get<User>(`user/${username}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  }
  return [data, error];
}

export { useGetUser, useGetGames };
