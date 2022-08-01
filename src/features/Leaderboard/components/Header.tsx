import Prize from "assets/images/prize.png";
import Logo from "components/Logo";
import useMedia from "hooks/useMedia";
import { mediaQueries } from "config/index";

const Header = () => {
  const md = useMedia(mediaQueries.md);
  return (
    <header className="bg-queenBlue/50 rounded-2xl p-4 relative md:h-[200px] pl-10 lg:pt-10">
      <div className="flex items-center gap-4">
        <Logo link="" className="" />
        <h1 className="text-[70px] text-crayola">Pong</h1>
      </div>
      <h2 className="capitalize">Top players</h2>
      {md && (
        <img
          alt="prize"
          src={Prize}
          className="h-[200px] absolute bottom-0 right-10"
        />
      )}
    </header>
  );
};

export default Header;
