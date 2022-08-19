import { mediaQueries } from "config/index";
import UserCard from "components/Usercard";
import UserStarXP from "./components/StarXP";
import NotificationsCenter from "components/Notifications";
import useMedia from "hooks/useMedia";
import useAuth from "hooks/useAuth";

export default function Headers() {
  const { user } = useAuth();
  const sm = useMedia(mediaQueries.sm);

  return (
    <header className="DashHeader w-full">
      {sm ? (
        <>
          <UserStarXP user={user} />
          <div className="lg:grow"></div>
          <div className="flex justify-between items-center w-full  lg:w-80">
            <UserCard user={user} />
            <NotificationsCenter />
          </div>
        </>
      ) : (
        <>
          <h4>notifications</h4>
          <NotificationsCenter />
        </>
      )}
    </header>
  );
}
