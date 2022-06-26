import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { XL } from "/src/Components/Constants";
import useMedia from "/src/Hooks/useMedia";
import LoginImage from "./components/LoginImage";
import SigninDialog from "./components/SigninDialog";
import SignupDialog from "./components/SignupDialog";

export default function Login() {

  let xl = useMedia(XL); // custom hook for media queries
  let [page, setPage] = useState('');

  return (
    <main className={`${page == 'signin' ? "page-light" : "page-dark"}`}>
      <div className="signinDialogWrraper">
        <div className={`p-4 flex flex-col gap-y-8`}>
          <Routes>
            <Route path="signin" element={<SigninDialog setPage={setPage} />} />
            <Route path="signup" element={<SignupDialog setPage={setPage} />} />
            <Route path="*" element={<Navigate to="/access/signin" />} />
          </Routes>
        </div>
      </div>
      {xl && <LoginImage isSignin={page == 'signin'} />}
    </main>
  );
};
