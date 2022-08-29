import welcomeBg from "assets/images/Home.gif";
import LeftArrow from "assets/icons/right-arrow.svg";
import { Link } from "react-router-dom";
import { FunctionComponent } from "react";
import Logo from "components/Logo";

const Welcome: FunctionComponent = () => {
  return (
    <main className="h-full">
      <div
        className="welcome-background"
        style={{ backgroundImage: `url(${welcomeBg})` }}
      >
        <div className="bg-spaceCadet/50 w-full h-full overflow-auto no-scrollbar">
          <nav className="px-10 pt-2 md:px-20 flex justify-between items-center fixed top-0 left-0 w-full">
            <Logo className="" link="/" />
            <Link
              to="/access/login"
              className="text-lotion hover:text-lotion/70 flex items-center group"
            >
              Login
              <LeftArrow className="fill-lotion ml-2 w-3 gro group-hover:fill-lotion/70" />
            </Link>
          </nav>
          <div className="px-10 md:px-20 border h-full border-red flex flex-col">
            <div className="title text-lotion mt-20 flex flex-col justify-center gap-10 grow">
              <h1>
                Become a Pro <span className="text-crayola">Pong</span> Player
              </h1>
              <h2 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-crayola to-pictonBlue">
                are you ready ?
              </h2>
              <Link to="/home" className="button--2 w-56 text-center">
                Play now
              </Link>
              <p className="text-lotion/70">
                <strong className="text-lotion">Tip - </strong> make sure to
                invite your friends
              </p>
            </div>
            <div className="modes h-56"></div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Welcome;
