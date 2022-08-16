import { useMachine } from "@xstate/react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
// import { Game, User } from "types/app";
import Profile from "./Profile";
import { Spinner } from "components/Loading";
import { profileMachine } from "./ProfileMachine";
import useErrorStatus from "hooks/useErrorStatus";
import { useGetUser, useGetGames } from "./hooks/useUserData";

const ProfileProvider = () => {
  const { setErrorStatusCode } = useErrorStatus();
  const [user, userError] = useGetUser();

  const [state, send] = useMachine(profileMachine, {
    actions: {},
  });

  useEffect(() => {
    if (state.matches("error")) {
      setErrorStatusCode(400);
      return;
    }
    send({
      type: "DATA_CHANGED",
      data: user
        ? {
            user: user,
            games: [],
          }
        : undefined,
      error: userError,
    });
    // uncommented on production
    // return function cleanup() {
    //   abortController.abort();
    // };
  }, [username]);

  return (
    <>
      {state.matches("loading") ? (
        <Spinner />
      ) : (
        <Profile user={state.context.user} games={} />
      )}
    </>
  );
};

export default ProfileProvider;
