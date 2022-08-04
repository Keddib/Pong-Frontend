import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Loading from "components/Loading";
import { axiosAuth } from "services/axios/axios";
import useAuth from "hooks/useAuth";
import useRefreshToken from "hooks/useRefreshToken";

const UserSession = () => {
  const { signin, isUserAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();

  useEffect(() => {
    // check user session
    const verifyUserSession = async () => {
      const accTok = await refresh();
      if (accTok == "error") {
        setIsLoading(false);
      }
      try {
        const res = await axiosAuth.get("/user", {
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
