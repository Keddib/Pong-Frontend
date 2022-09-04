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
import TfaAuth from "./components/TfaAuth";
import { User } from "types/app";

export default function Login() {
  const [code, seCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [called, setCalled] = useState(false);
  const { setAccessToken, signin } = useAuth();
  const navigate = useNavigate();
  const location: Location = useLocation();
  const [is2FA, set2FA] = useState(false);
  const state = location.state as { from: string };
  const from = state ? state.from : "/home";

  const hundleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    oAuthPopup(seCode);
  };

  useEffect(() => {
    async function authenticate() {
      try {
        const authenticateRes = await authenticateUser(code);
        if (authenticateRes == "TFA") {
          set2FA(true);
          return;
        }
        setAccessToken(authenticateRes);
        signin({} as User);
        navigate(from, { replace: true });
      } catch (error) {
        setErrorMsg("Authentication failed");
      }
    }
    if (!called) {
      if (code) {
        if (code == "error") {
          setErrorMsg("Authentication failed");
        } else {
          setCalled(true);
          authenticate();
        }
      }
    }
  }, [code, called]);

  return (
    <>
      {is2FA && <TfaAuth from={from} />}
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
    </>
  );
}
