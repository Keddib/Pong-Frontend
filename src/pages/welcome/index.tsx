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
        <div className="bg-spaceCadet/50 w-full h-full">
          <h1 className="text-lotion">hello</h1>
        </div>
      </div>
    </main>
  );
};

export default Welcome;
