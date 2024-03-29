import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "src/context/authentication";
import { User } from "types/app";
import { UserContext } from "types/context";

type Props = {
  children: JSX.Element | JSX.Element[];
};

const AuthProvider: FunctionComponent<Props> = ({ children }) => {
  const [user, setUser] = useState({} as User);
  const [isAuth, setIsAuth] = useState(false);
  const [accessToken, setAT] = useState("");
  const navigate = useNavigate();

  let Auth: UserContext = {
    user,
    updateUser: (user: User) => {
      setUser(user);
    },
    setAccessToken: (token: string) => {
      localStorage.setItem("accessToken", token);
      setAT(token);
    },
    getAccessToken: () => {
      return accessToken;
    },
    isUserAuth: () => {
      return isAuth;
    },
    signin: (user: User) => {
      setUser(user);
      setIsAuth(true);
    },
    signout: () => {
      setUser({} as User);
      setIsAuth(false);
      navigate("/access/signin");
    },
  };

  return <AuthContext.Provider value={Auth}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
