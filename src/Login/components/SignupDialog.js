import { useEffect } from "react";
import { Link } from "react-router-dom";

import Dialog from "./Dialog";
import AuthButton from "./AuthButton";
import Error from "./LoginError";

// import SignupContinueDialog from "./SignupContinueDialog";


const title = {
  primary: "Join us playing",
  secondary: "enjoy playing with your friends."
};


const SignupDialog = (props) => {

  useEffect(() => {
    props.setPage('signup');
  }, [props]);

  return (
    // <SignupContinueDialog />
    <Dialog title={title}>
      <AuthButton action="signup" callBack={props.callBack} />
      {props.error && <Error />}
      <p className="description-l">
        Do you have an account?
        <Link to="/access/signin" className="click-p-l ml-2">
          Sign in!
        </Link>
      </p>
    </Dialog>
  );
}

export default SignupDialog;
