import { Routes, Route } from "react-router-dom";
import TabBar from "components/TabBar";
import Players from "./components/Players";
import ChatRooms from "./components/ChatRooms";

//  full screen on mobile version
// import { FullScreen, useFullScreenHandle } from "react-full-screen";
// import { MD } from "/src/Components/Constants";
// import useMedia from "/src/Hooks/useMedia";
// let md = useMedia(MD);
// const handle = useFullScreenHandle();
/* <Route path="create" element={<EditProfile />} /> */

function Rooms() {
  const links = {
    first: {
      name: "Rooms",
      path: "/rooms",
    },
    second: {
      name: "Players",
      path: "players",
    },
  };

  return (
    <div className="m-auto w-full h-full flex flex-col gap-4">
      <div className=" rounded-2xl py-4 pl-4 flex flex-col gap-4 w-full h-full">
        <TabBar links={links} />
        <Routes>
          <Route index element={<ChatRooms />} />
          <Route path="players" element={<Players />} />
        </Routes>
      </div>
    </div>
  );
}

export default Rooms;
