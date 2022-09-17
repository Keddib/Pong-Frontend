import { useParams } from "react-router-dom";
import { Game, User } from "types/app";
import useSWR from "swr";
import useRefreshToken from "hooks/useRefreshToken";
import { axiosAuth } from "services/axios/axios";
import useAuth from "hooks/useAuth";

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
  const { user, updateUser } = useAuth();

  async function fetcher() {
    const accessToken = await refresh();
    const res = await axiosAuth.get<User>(`user/${username}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const newUser = res.data;
    if (user.uid == newUser.uid) {
      updateUser(newUser);
    }
    return newUser;
  }
  if (error) {
    return [null, error];
  }
  return [data, null];
}

export { useGetUser, useGetGames };
