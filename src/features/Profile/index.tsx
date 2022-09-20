import { useActor, useInterpret } from "@xstate/react";
import { useEffect, useState } from "react";
import Profile from "./components/Profile";
import Loading from "components/Loading";
import useErrorStatus from "hooks/useErrorStatus";
import profileMachine from "./services/profileMachine";
import ProfileStateContext from "features/Profile/context/ProfileState";
import useTitle from "hooks/useTitle";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "~/src/hooks/useAxiosPrivate";
import { User } from "~/src/types/app";
import useAuth from "~/src/hooks/useAuth";

const ProfileWrapper = () => {
  const { setErrorStatusCode } = useErrorStatus();
  const profileService = useInterpret(profileMachine);
  const { send } = profileService;
  const [state] = useActor(profileService);
  const { user, updateUser } = useAuth();
  const { username } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const setTitle = useTitle();

  useEffect(() => {
    setTitle("Profile");

    async function getUserData() {
      try {
        const res = await axiosPrivate.get<User>(`user/${username}`);
        if (res.data.uid == user.uid) {
          updateUser(res.data);
        }
        send({
          type: "DATA_CHANGED",
          data: res.data,
          error: null,
        });
      } catch (error) {
        send({
          type: "DATA_CHANGED",
          data: null,
          error: error,
        });
      }
    }
    getUserData();
  }, [username]);

  useEffect(() => {
    if (state.matches("error")) {
      setErrorStatusCode(400);
      return;
    }
  }, [state, setErrorStatusCode]);

  if (state.matches("loading")) {
    return <Loading />;
  }

  return (
    <>
      {state.matches("player") && (
        <ProfileStateContext.Provider value={profileService}>
          <Profile />
        </ProfileStateContext.Provider>
      )}
    </>
  );
};

export default ProfileWrapper;
