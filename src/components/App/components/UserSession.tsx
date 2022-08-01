import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Loading from "components/Loading";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import useAuth from "hooks/useAuth";

const UserSession = () => {
  const { signin, isUserAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    // check user session
    const verifyUserSession = async () => {
      try {
        const res = await axiosPrivate.get("/user");
        const user = res.data;
        if (user) {
          // validate user before signin
          console.log("authenticated user", user);
          signin(user);
        }
        setIsLoading(false);
      } catch (error) {
        console.log("not authorized...");
        setIsLoading(false);
      }
    };
    isUserAuth() ? setIsLoading(false) : verifyUserSession();
  }, []);

  return <>{isLoading ? <Loading /> : <Outlet />}</>;
};

export default UserSession;
