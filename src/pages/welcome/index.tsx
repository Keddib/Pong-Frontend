import welcomeBg from "assets/images/home.gif";
import { FunctionComponent } from "react";
// import { Link } from "react-router-dom";

const Welcome: FunctionComponent = () => {
  return (
    <main className="border border-red h-full">
      <div
        className="welcome-background"
        style={{ backgroundImage: `url(${welcomeBg})` }}
      >
        <div className="bg-spaceCadet/50 w-full h-full"></div>
      </div>
      {/* <h1>welcome</h1>
      <div className="w-full flex justify-center gap-2">
        <Link to="/welcome">landing</Link> <br />
        <Link to="/home">home</Link> <br />
        <Link to="/access/signin">signin</Link> <br />
        <Link to="/access/signup">signup</Link> <br />
      </div> */}
    </main>
  );
};

export default Welcome;
