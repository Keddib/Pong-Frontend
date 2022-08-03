import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Loading from "components/Loading";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import useAuth from "hooks/useAuth";
import useRefreshToken from "hooks/useRefreshToken";

const UserSession = () => {
  const { signin, isUserAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();
  const refresh = useRefreshToken();

  useEffect(() => {
    // check user session
    const verifyUserSession = async () => {
      try {
        const accTok = await refresh();
        console.log(accTok);
        const res = await axiosPrivate.get("/user", {
          headers: {
            Authorization: `Bearer ${accTok}`,
          },
        });
        const user = res.data;
        if (user) {
          // validate user before signin
          console.log("authenticated user", user);
          signin(user);
          setIsLoading(false);
        }
      } catch (error) {
        console.log("not authorized...", error);
        setIsLoading(false);
      }
    };

    isUserAuth() ? setIsLoading(false) : verifyUserSession();
  }, []);

  return <>{isLoading ? <Loading /> : <Outlet />}</>;
};

export default UserSession;
