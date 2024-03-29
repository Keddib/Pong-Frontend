import { Route, Routes, Navigate } from "react-router-dom";
import { FunctionComponent } from "react";
import Home from "features/Home";
import Friends from "features/Friends";
import Leaderboard from "features/Leaderboard";
import Messages from "features/Messages";
import Rooms from "features/Rooms";
import Profile from "features/Profile";
import Game from "features/Game";
import Error404 from "components/Error404";
import ErrorHandler from "./components/ErrorHandler";
import { mediaQueries } from "config/index";
import useMedia from "hooks/useMedia";

type Iprops = {
  setGameRoomId: (id: string) => void;
};

const Section: FunctionComponent<Iprops> = ({ setGameRoomId }) => {
  const xl = useMedia(mediaQueries.xl);

  return (
    <section className={`Dash-main container ${xl ? "main-grid-xl" : ""}`}>
      <div className="dash-home-layout">
        <ErrorHandler>
          <Routes>
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<Home />} />
            <Route
              path="game"
              element={<Game setGameRoomId={setGameRoomId} />}
            />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="messages/*" element={<Messages />} />
            <Route path="friends/*" element={<Friends />} />
            <Route path="rooms/*" element={<Rooms />} />
            <Route path="profile/:username/*" element={<Profile />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </ErrorHandler>
      </div>
    </section>
  );
};

export default Section;
