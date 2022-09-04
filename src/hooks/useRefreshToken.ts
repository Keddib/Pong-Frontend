import useAuth from "./useAuth";
import { axiosAuth } from "services/axios/axios";

function useRefreshToken() {
  const { setAccessToken } = useAuth();

  async function refresh() {
    try {
      const res = await axiosAuth.post<{ access_token: string }>(
        "auth/refresh",
        {},
        {
          withCredentials: true,
        }
      );
      const accessToken = res.data.access_token;
      if (accessToken) {
        setAccessToken(accessToken);
      }
      return accessToken;
    } catch (error) {
      error;
    }
    return "error";
  }
  return refresh;
}

export default useRefreshToken;
