import TabBar from "components/TabBar";
import ProfileHeader from "./Profileheader";
import OverView from "./Overview";
import MatchHistory from "./Matchhistory";
import EditProfile from "./Updateprofile";
import { Route, Routes } from "react-router-dom";
import { FunctionComponent, useEffect } from "react";
import { useGetGames } from "../hooks/useUserData";
import { Spinner } from "components/Loading";
import useProfileState from "../hooks/useProfileState";
import { useActor } from "@xstate/react";
import SetErrorPage from "components/Error";

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

const Profile: FunctionComponent = () => {
  const profileService = useProfileState();
  const [state] = useActor(profileService);
  const [games] = useGetGames(state.context.uid);
  const user = state.context;

  useEffect(() => {
    links.first.path = `/profile/${user.username}`;
  }, [user]);

  return (
    <div className="m-auto w-full h-full flex flex-col gap-4 border-red border">
      <ProfileHeader />
      <div className="bg-queenBlue/50 rounded-2xl p-2 py-4  flex flex-col gap-4">
        <TabBar links={links} />
        {games ? (
          <Routes>
            <Route index element={<OverView user={user} game={games[0]} />} />
            <Route
              path="match-history"
              element={<MatchHistory games={games} />}
            />
            {user.rule.rule == "me" && (
              <Route path="settings" element={<EditProfile />} />
            )}
            <Route path="*" element={<SetErrorPage />} />
          </Routes>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default Profile;
