import { useActor } from "@xstate/react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import useProfileState from "../../hooks/useProfileState";
import useAuth from "~/src/hooks/useAuth";

const ProfileOptions = () => {
  const profileService = useProfileState();
  const [state] = useActor(profileService);

  if (state.matches("player.me")) {
    return (
      <NavLink
        to="settings"
        className="button--3 px-4 text-sm md:px-8 md:text-xl"
        end
      >
        settings
      </NavLink>
    );
  } else if (state.matches("player.receiver")) {
    return <ReceiverButton />;
  } else if (state.matches("player.blocked")) {
    return <BlockedButton />;
  } else if (state.matches("player.friend")) {
    return <FriendButton />;
  } else if (state.matches("player.sender")) {
    return <SenderButton />;
  }
  return <NoneButton />;
};

export default ProfileOptions;

const FriendButton = () => {
  const [hover, setHover] = useState(false);
  const send = useProfileState().send;

  const hundleOnClick = () => {
    send({ type: "CANCELREQUEST" });
  };
  const hundleMouseIn = () => {
    setHover(true);
  };
  const hundleMouseOut = () => {
    setHover(false);
  };

  return (
    <button
      className="button--3 px-4 text-sm md:px-8 md:text-xl"
      onClick={hundleOnClick}
      onMouseOver={hundleMouseIn}
      onMouseOut={hundleMouseOut}
      onFocus={() => {}}
      onBlur={() => {}}
    >
      {hover ? "unfriend" : "friend"}
    </button>
  );
};

const ReceiverButton = () => {
  const [hover, setHover] = useState(false);
  const send = useProfileState().send;

  const hundleOnClick = () => {
    send({ type: "CANCELREQUEST" });
  };
  const hundleMouseIn = () => {
    setHover(true);
  };
  const hundleMouseOut = () => {
    setHover(false);
  };

  return (
    <button
      className="button--3 px-4 text-sm md:px-8 md:text-xl"
      onClick={hundleOnClick}
      onMouseOver={hundleMouseIn}
      onMouseOut={hundleMouseOut}
      onFocus={() => {}}
      onBlur={() => {}}
    >
      {hover ? "cancel" : "requested"}
    </button>
  );
};

const NoneButton = () => {
  const send = useProfileState().send;
  const { user } = useAuth();

  const hundleOnClick = () => {
    console.log("add frien clicked..");
    send({ type: "ADDFRIEND", uid: user.uid });
  };

  return (
    <button
      className="button--3 px-4 text-sm md:px-8 md:text-xl"
      onClick={hundleOnClick}
    >
      add friend
    </button>
  );
};

const BlockedButton = () => {
  const [hover, setHover] = useState(false);
  const send = useProfileState().send;

  const hundleOnClick = () => {
    send({ type: "UNBLOCK" });
  };
  const hundleMouseIn = () => {
    setHover(true);
  };
  const hundleMouseOut = () => {
    setHover(false);
  };

  return (
    <button
      className="button--3 px-4 text-sm md:px-8 md:text-xl"
      onClick={hundleOnClick}
      onMouseOver={hundleMouseIn}
      onMouseOut={hundleMouseOut}
      onFocus={() => {}}
      onBlur={() => {}}
    >
      {hover ? "unblock" : "blocked"}
    </button>
  );
};

const SenderButton = () => {
  const send = useProfileState().send;

  const hundleDecline = () => {
    send({ type: "CANCELREQUEST" });
  };
  const hundleAccept = () => {
    send({ type: "ACCEPT" });
  };

  return (
    <>
      <button
        className="button--3 px-4 text-sm md:px-8 md:text-xl"
        onClick={hundleAccept}
      >
        accept
      </button>
      <button
        className="button--3 px-4 text-sm md:px-8 md:text-xl"
        onClick={hundleDecline}
      >
        decline
      </button>
    </>
  );
};
