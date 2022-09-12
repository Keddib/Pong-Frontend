import { FunctionComponent, useEffect, useRef } from "react";
import { mediaQueries } from "config/index";
import { ToastContainer, toast, Id } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useMedia from "hooks/useMedia";
import { GameNotify } from "types/app";
import { useNavigate } from "react-router-dom";
import useUserStatus from "hooks/useUserStatus";
import { gameSocket } from "services/socket";

export default function Notifications() {
  const xl = useMedia(mediaQueries.xl);
  const navigate = useNavigate();
  const { updateUser } = useUserStatus();
  const toastId = useRef<Id | null>(null);

  // when recieving a notification call this function with anvitation object
  const notify = (invite: GameNotify) => {
    toastId.current = toast(<GameInviteNotif invitation={invite} />, {
      position: toast.POSITION.TOP_RIGHT,
      className: "game-invite-notification",
      onClose: () => {
        if (
          location.pathname + location.search !==
          "/game?invitation=" + invite.invitation
        )
          gameSocket.emit("declineInvitation", {
            invitation: invite.invitation,
          });
      },
    });
  };

  const dismissNotification = () => {
    if (toastId.current) toast.dismiss(toastId.current);
  };

  useEffect(() => {
    gameSocket.emit("subscribeGameInvites");

    gameSocket.on("gameInvitesUpdate", async (data) => {
      const acceptGameReq = () => {
        navigate("/game?invitation=" + data.invitation);
        dismissNotification();
      };
      notify({
        username: data.username,
        accept: acceptGameReq,
        invitation: data.invitation,
      });
    });
    gameSocket.on("invitationCanceled", () => {
      dismissNotification();
    });
    gameSocket.on("userStatusUpdate", async (data) => {
      updateUser(data);
    });
  }, []);

  return (
    <ToastContainer
      limit={1}
      progressClassName="fancy-progress-bar"
      style={{ right: xl ? "2.7rem" : "", top: xl ? "9.5rem" : "6rem" }}
      closeOnClick={false}
    />
  );
}

const GameInviteNotif: FunctionComponent<{ invitation: GameNotify }> = ({
  invitation,
}) => (
  <div className="w-full flex flex-col gap-1">
    <div className="title">
      <p className="text-lotion">
        <strong>{invitation.username}</strong> wants to play
      </p>
    </div>

    <button
      className="self-end text-lotion bg-pictonBlue rounded-2xl px-3"
      onClick={invitation.accept}
    >
      accept
    </button>
  </div>
);
