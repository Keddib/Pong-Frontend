import { useActor, useInterpret } from "@xstate/react";
import { useEffect } from "react";
import Profile from "./components/Profile";
import Loading from "components/Loading";
import useErrorStatus from "hooks/useErrorStatus";
import { useGetUser } from "./hooks/useUserData";
import profileMachine from "./services/profileMachine";
import ProfileStateContext from "features/Profile/context/ProfileState";
import useTitle from "~/src/hooks/useTitle";

const ProfileWrapper = () => {
  const { setErrorStatusCode } = useErrorStatus();
  const [user, userError] = useGetUser();
  const profileService = useInterpret(profileMachine);
  const { send } = profileService;
  const [state] = useActor(profileService);
  const setTitle = useTitle();

  useEffect(() => {
    setTitle("Profile");
  }, []);

  useEffect(() => {
    if (state.matches("error")) {
      setErrorStatusCode(400);
      return;
    }
  }, [state, setErrorStatusCode]);

  useEffect(() => {
    if (user || userError) {
      send({
        type: "DATA_CHANGED",
        data: user,
        error: userError,
      });
    }
  }, [user, userError, send]);

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
