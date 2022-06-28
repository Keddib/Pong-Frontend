import TabBar from "/src/Components/TabBar";
import ProfileHeader from "./components/ProfileHeader";
import GameResult from "./components/GameResult";


const links = {
  first: {
    name: 'Overview',
    path: ''
  },
  second: {
    name: 'Match History',
    path: ''
  }
}



export default function Profile() {


  return (
    <div className="m-auto w-full h-full flex flex-col gap-4">
      <ProfileHeader />
      <div className="bg-queenBlue/50 rounded-2xl p-4  flex flex-col gap-4">
        <TabBar links={links} />
        <div className="rounded-2xl bg-spaceCadet p-4 flex flex-col gap-2">
          <div className="flex justify-between items-center px-2">
            <p>Lvl. 12</p>
            <p>75 / 111 xp</p>
          </div>
          <div className="bg-lotion/30 rounded-2xl h-4">
            <div className="rounded-2xl w-2/3 bg-crayola h-full"></div>
          </div>
        </div>

        <div className="rounded-2xl bg-spaceCadet p-4 flex flex-col gap-2">
          <h2 className="capitalize text-xl md:text-3xl">top game</h2>
          <GameResult />
        </div>
      </div>
    </div >
  )
}
