import ModeImg from "assets/images/mode1.png";
import ModeImg2 from "assets/images/mode2.png";
import ModeImg3 from "assets/images/mode3.png";
import welcomeBg from "assets/images/Home.gif";
import LeftArrow from "assets/icons/right-arrow.svg";
import { Link } from "react-router-dom";
import { FunctionComponent, useEffect } from "react";
import Logo from "components/Logo";
import useTitle from "hooks/useTitle";

const Welcome: FunctionComponent = () => {
  const setTitle = useTitle();

  useEffect(() => {
    setTitle("Welcome to Pong");
  }, []);

  return (
    <main className="h-full">
      <div
        className="welcome-background"
        style={{ backgroundImage: `url(${welcomeBg})` }}
      >
        <div className="bg-spaceCadet/50 w-full h-full overflow-auto no-scrollbar">
          <div className="container h-full flex flex-col">
            <nav className="pt-2 px-10 flex justify-between items-center">
              <Logo className="" link="/" />
              <Link
                to="/access/login"
                className="text-lotion hover:text-lotion/70 flex items-center group"
              >
                Login
                <LeftArrow className="fill-lotion ml-2 w-3 gro group-hover:fill-lotion/70" />
              </Link>
            </nav>
            <div className="px-10 grow flex flex-col gap-4 justify-center">
              <div className="flex flex-col lg:flex-row">
                <div className="title text-lotion flex flex-col justify-center gap-10 grow lg:w-1/2">
                  <h1>
                    Become a Pro <span className="text-crayola">Pong</span>{" "}
                    Player
                  </h1>
                  <h2 className=" font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-crayola to-pictonBlue">
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
                <div className="character lg:w-1/2">
                  <div className="flex justify-center items-center  h-full">
                    <div className="modes flex flex-wrap gap-4 border-lotion ">
                      <div className="flex flex-col items-center justify-center relative">
                        <img
                          src={ModeImg}
                          className="top-3 left-4 absolute w-20"
                          alt="character"
                        />
                        <div className="w-28 h-28 rounded-3xl bg-lotion/70"></div>
                        <p className="text-lotion">Classic</p>
                      </div>
                      <div className="flex flex-col items-center justify-center relative">
                        <img
                          src={ModeImg2}
                          className="top-4 left-4 absolute w-20"
                          alt="character"
                        />
                        <div className="w-28 h-28 rounded-3xl bg-crayola/70"></div>
                        <p className="text-lotion">Goalkeeper</p>
                      </div>
                      <div className="flex flex-col items-center justify-center relative">
                        <img
                          src={ModeImg3}
                          className="top-4 left-4 absolute w-20"
                          alt="character"
                        />
                        <div className="w-28 h-28 rounded-3xl bg-pictonBlue/70"></div>
                        <p className="text-lotion">DoublePaddle</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Welcome;
