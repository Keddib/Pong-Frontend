import { useEffect } from "react";
import { Link } from "react-router-dom";

import Dialog from "./Dialog";
import AuthButton from "./AuthButton";
import Error from "./LoginError";

const title = {
  primary: "welcome to",
  secondary: "Please login with your intra42 account"
};

const SigninDialog = (props) => {

  useEffect(() => {
    props.setPage('signin');
  }, [props]);

  return (
    <Dialog title={title}>
      <AuthButton action="signin" callBack={props.callBack} />
      {props.error && <Error />}
      <p className="description">
        Don’t have an account?
        <Link to="/access/signup" className="click-p-l ml-2">
          Sign up fo free!
        </Link>
      </p>
    </Dialog>
  );
}

export default SigninDialog;
