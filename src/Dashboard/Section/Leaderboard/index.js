import { MD } from "/src/Components/Constants";
import Logo from "/src/Components/Logo";
import Prize from "/src/assets/images/prize.png"
import useMedia from "/src/Hooks/useMedia";
import UserBar from "/src/Components/UserBar";
import UserImg from "/src/assets/images/user.jpg"

var user1 = {
  id: "123",
  img: UserImg,
  name: "AlaeOX7",
  status: "Online",
  dot: "green-dot"
};


export default function Leaderboard() {

  let md = useMedia(MD);

  return (
    <div className="m-auto w-full h-full flex flex-col gap-4">
      <header className="bg-queenBlue/50 rounded-2xl p-4 relative md:h-[200px] pl-10 lg:pt-10">
        <div className="flex items-center gap-4">
          <Logo />
          <h1 className="text-[70px] text-crayola">Pong</h1>
        </div>
        <h2 className="capitalize">Top players</h2>
        {md && <img alt="prize" src={Prize} className="h-[200px] absolute bottom-0 right-10" />}
      </header>
      <div className="bg-queenBlue/50 rounded-2xl py-4 pl-4 flex flex-col gap-4">
        <div className=" w-full ml-4">
          <span className="">RANK</span>
          <span className="">PLAYER</span>
          <span className="text-end border">XP</span>
        </div>
        <div className="Rank">
          <ul className="flex flex-col gap-2">
            <UserBar user={user1} > 1</UserBar>
            <UserBar user={user1} > 1</UserBar>
            <UserBar user={user1} > 1</UserBar>
          </ul>
        </div>
      </div>
    </div>
  );
}
