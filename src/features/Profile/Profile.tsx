import TabBar from "components/TabBar";
import ProfileHeader from "./components/Profileheader";
import OverView from "./components/Overview";
import MatchHistory from "./components/Matchhistory";
import EditProfile from "./components/Updateprofile";
import { Route, Routes } from "react-router-dom";
import { Game, User } from "types/app";
import useErrorStatus from "hooks/useErrorStatus";
import { FunctionComponent, useEffect } from "react";

const links = {
  first: {
    name: "Overview",
    path: "/profile",
  },
  second: {
    name: "Match History",
    path: "match-history",
  },
};

const Profile: FunctionComponent<{ user: User; games: Game[] }> = ({
  user,
  games,
}) => {
  const { setErrorStatusCode } = useErrorStatus();

  useEffect(() => {
    links.first.path = `/profile/${user.username}`;
  }, [user]);

  return (
    <div className="m-auto w-full h-full flex flex-col gap-4">
      <ProfileHeader user={user} />
      <div className="bg-queenBlue/50 rounded-2xl md:p-2 py-4  flex flex-col gap-4">
        <TabBar links={links} />
        <Routes>
          <Route index element={<OverView user={user} game={games[0]} />} />
          <Route
            path="match-history"
            element={<MatchHistory games={games} />}
          />
          {user.rule == "me" && <Route path="edit" element={<EditProfile />} />}
          <Route path="*" element={<>{setErrorStatusCode(400)} </>} />
        </Routes>
      </div>
    </div>
  );
};

export default Profile;
