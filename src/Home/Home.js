import HomeGif from "../../public/assets/images/Home.gif";
import Logo from "../Components/Logo";
import { Link } from "react-router-dom";
// import Character from "../../public/assets/images/HomeCharacter.png"

export default function Home() {
  return (
    <div
      className="page homeBackGround"
      style={{ backgroundImage: `url(${HomeGif})` }}
    >
      <div className="page bg-spaceCadet/50">
        <div className="container h-full">
          <header className="py-4 px-4 md:px-10 flex items-center">
            <Logo />
            <div className="grow"></div>
            <div className="w-[120px]">
              <Link to="/signin">
                <button className="button--2">
                  Sign in
                </button>
              </Link>
            </div>
          </header>
        </div>
      </div>
    </div>
  );
}
