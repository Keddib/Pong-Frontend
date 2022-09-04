import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Loading from "components/Loading";
import { axiosAuth } from "services/axios/axios";
import useAuth from "hooks/useAuth";
import useRefreshToken from "hooks/useRefreshToken";

const UserSession = () => {
  const { signin, isUserAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const navigate = useNavigate();

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
            Authorization: `Bearer ${accTok}`
          }
        });
        const user = res.data;
        if (user) {
          signin(user);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
      }
    };

    isUserAuth() ? setIsLoading(false) : verifyUserSession();
  }, []);

  return <>{isLoading ? <Loading /> : <Outlet />}</>;
};

export default UserSession;
