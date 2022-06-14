// import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./Signup/Signup";
import Signin from "./Signin/Signin";

const Login = ({ stage }) => {
  return <div className="page">{stage ? <Signin /> : <Signup />}</div>;
};

export default Login;
