import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../../Hooks/useAuth";
import Dialog from "./Dialog";
import AuthButton from "./AuthButton";
import Error from "./LoginError";
import oAuthPopup from "/src/Services/Oauth42Popup";
import SignupContinueDialog from "./SignupContinueDialog";

const LOGIN_URL = 'http://localhost:3500/auth';

const title = {
  primary: "welcome to",
  secondary: "Please login with your intra42 account"
};





const authAPI = async (code, callBack, setError) => {
  try {
    const response = await axios.post(LOGIN_URL,
      {},
      {
        headers: { 'Content-Type': 'application/json' },
        params: { 'code': code },
        withCredentials: true
      }
    );
    console.log(JSON.stringify(response?.data));
    //console.log(JSON.stringify(response));
    return [response?.data, response?.status];

  } catch (err) {
    if (!err?.response) {
      setError('No Server Response');
    } else if (err.response?.status === 400) {
      setError('Missing Username or Password');
    } else if (err.response?.status === 401) {
      setError('Unauthorized');
    } else {
      setError('Login Failed');
    }
    return null;
  }
}






const SigninDialog = ({ setPage }) => {

  let [code, seCode] = useState('');
  let [errorMsg, setErrorMsg] = useState('');
  let [called, setCalled] = useState(false);
  let [page, setPage2] = useState('signin');
  let { signin } = useAuth();
  let navigate = useNavigate();

  const hundleSubmit = (e) => {
    e.preventDefault();
    oAuthPopup(seCode);
  };

  useEffect(() => {
    const auth2 = async () => {
      if (code == 'error') {
        setErrorMsg('Authentication failed');
      }
      console.log(code);
      //  getUser
      let [data, status] = await authAPI(code, setPage2, setErrorMsg);
      console.log(data, status);
      signin(data);
      if (status == 201) {
        setPage2('continue');
      } else {
        navigate("/home", { replace: true });
      }
    }
    if (!called) {
      setPage(page);
      console.log(code);
      if (code && code != 'error') {
        setCalled(true);
        auth2();
      }
    }
  }, [code, page, navigate, signin, setPage, called]);

  return (
    page == "continue" ? <SignupContinueDialog /> :

      (<Dialog title={title}>
        <form onSubmit={hundleSubmit}>
          <AuthButton action="signin" />
        </form>
        {errorMsg && <Error message={errorMsg} />}
        <p className="description">
          Don’t have an account?
          <Link to="/access/signup" className="click-p-l ml-2">
            Sign up fo free!
          </Link>
        </p>
      </Dialog>)

  );
}

export default SigninDialog;
