import React, { useState, useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useLocation,
  Location,
} from "react-router-dom";
import { authenticateUser } from "services/axios/axios";
import oAuthPopup from "./services/oauthPopup";
import SigninDialog from "./components/Signin";
import SignupDialog from "./components/Signup";
import useAuth from "hooks/useAuth";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { User } from "types/app";

export default function Login() {
  const [code, seCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [called, setCalled] = useState(false);
  const navigate = useNavigate();
  const location: Location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const { signin, setAccessToken, getAccessToken } = useAuth();
  const state = location.state as { from: string };
  const from = state ? state.from : "/home";
  console.log("user will be redirected to : ", from);

  const hundleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    oAuthPopup(seCode);
  };

  useEffect(() => {
    const getUser = async () => {
      //  get accesstoken
      const token = await authenticateUser(code); // get accesstoken
      if (token) {
        setAccessToken(token);
        console.log(token, getAccessToken());
        try {
          const res = await axiosPrivate.get<User>("/user", {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log("authenticated user../ ", res.data);
          signin(res.data);
          navigate(from, { replace: true });
        } catch (error) {
          console.log("error", error);
        }
      } else {
        setErrorMsg("Authentication failed");
      }
    };
    if (!called) {
      if (code) {
        if (code == "error") {
          setErrorMsg("Authentication failed");
        } else {
          setCalled(true);
          getUser();
        }
      }
    }
  }, [code, called]);

  return (
    <Routes>
      <Route
        path="signin"
        element={
          <SigninDialog hundleSubmit={hundleSubmit} errorMsg={errorMsg} />
        }
      />
      <Route
        path="signup"
        element={
          <SignupDialog hundleSubmit={hundleSubmit} errorMsg={errorMsg} />
        }
      />
      <Route path="*" element={<Navigate to="/access/signin" />} />
    </Routes>
  );
}
