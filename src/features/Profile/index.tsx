import { useActor, useInterpret } from "@xstate/react";
import { useEffect } from "react";
import Profile from "./components/Profile";
import Loading from "components/Loading";
import useErrorStatus from "hooks/useErrorStatus";
import { useGetUser } from "./hooks/useUserData";
import profileMachine from "./services/profileMachine";
import ProfileStateContext from "features/Profile/context/ProfileState";

const ProfileWrapper = () => {
  const { setErrorStatusCode } = useErrorStatus();
  const [user, userError] = useGetUser();
  const profileService = useInterpret(profileMachine);
  const { send } = profileService;
  const [state] = useActor(profileService);

  useEffect(() => {
    if (state.matches("error")) {
      console.log("error state");
      setErrorStatusCode(400);
      return;
    }
    if (user || userError) {
      console.log("user", user);
      console.log("userError", userError);
      send({
        type: "DATA_CHANGED",
        data: user,
        error: userError,
      });
    }
  }, [user, userError]);

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
