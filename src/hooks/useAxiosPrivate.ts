import { useEffect } from "react";
import useAuth from "./useAuth";
import { axiosPrivate } from "services/axios/axios";
import setupInterceptorsTo from "services/axios/interseptors";
import useRefreshToken from "./useRefreshToken";

function useAxiosPrivate() {
  const { getAccessToken } = useAuth();
  const accessToken = getAccessToken();
  const refresh = useRefreshToken();

  useEffect(() => {
    const cancleInterceptors = setupInterceptorsTo(
      axiosPrivate,
      accessToken,
      refresh
    );
    return () => {
      cancleInterceptors();
    };
  }, [accessToken, refresh]);

  return axiosPrivate;
}

export default useAxiosPrivate;
