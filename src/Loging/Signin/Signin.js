import PlayerImg from "../../../public/assets/images/signin.png";
import Logo from "../../Components/Logo";
import Form from "./components/SigninForm";
import { Link } from "react-router-dom";
import I42 from "../../../public/assets/images/42.svg";

const Signin = () => {
  return (
    <div className=" page-light xl:flex overflow-hidden">
      <div className="page flex justify-center items-center xl:w-1/2">
        <div className="p-4">
          <div className="mb-2 lg:mb-10">
            <Logo className="group-hover:animate-bounce" />
            <h2 className="my-2 lg:my-4">
              welcome to <h1 className="inline-block ">pong</h1>
            </h2>
            <h5 className="capitalize ">
              Welcome back! Please enter your details.
            </h5>
          </div>
          <Form />
          <p className="click-p-d">Did you forget your password?</p>
          <button className="button--42">
            <I42 className="mr-2" />
            Signin with 42
          </button>
          <p className="description mt-4">
            Don’t have an account?
            <Link to="/signup" className="click-p-l ml-2">
              Sign up fo free!
            </Link>
          </p>
        </div>
      </div>

      <div className="img-w-signin">
        <img className="rounded-2xl" alt="player img" src={PlayerImg} />
      </div>
    </div>
  );
};

export default Signin;
