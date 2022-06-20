import I42 from "/src/assets/images/42.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "/src/Auth";
import Go from "/src/Auth/B42utton"

const AuthButton = (props) => {

  let navigate = useNavigate();
  let location = useLocation();
  let authContext = useAuth();

  let from = location.state?.from?.pathname || "/";

  function loginAccess() {

    Go();

    // authContext.signin('newUser', () => {
    //   navigate(from, { replace: true });
    // });
  }
  return (
    <button
      onClick={loginAccess}
      className={`button--42 ${props.action}`}
    >
      <I42 className="mr-2 !fill-crayola" />
      {`${props.action} with 42`}
    </button>
  );
}

export default AuthButton;
