import PlayerImg from "../../../public/assets/images/signup.png";
import Logo from "../../Components/Logo";
// import Form from "./SignupForm"
import { Link } from "react-router-dom";
import I42 from "../../../public/assets/images/42.svg";

const Signup = () => {
  return (
    <div className=" page-dark xl:flex overflow-hidden">
      <div className="page flex justify-center items-center xl:w-1/2">
        <div className="p-4">
          <div className="mb-10">
            <Logo className="group-hover:animate-bounce" />
            <h2 className="my-2 lg:my-4">
              Join us playing <h1 className="inline-block ">pong</h1>
            </h2>
            <h5 className="capitalize ">enjoy playing with your friends.</h5>
          </div>
          <button className="button--42">
            <I42 className="mr-2" />
            Signup with 42
          </button>
          <p className="description-l mt-4">
            Do you have an account?
            <Link to="/signin" className="click-p-l ml-2">
              Sign in!
            </Link>
          </p>
        </div>
      </div>

      <div className="img-w-signup">
        <img className="rounded-2xl" alt="player img" src={PlayerImg} />
      </div>
    </div>
  );
};

export default Signup;
