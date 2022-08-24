import { FunctionComponent, useEffect } from "react";
import { mediaQueries } from "config/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { io } from "socket.io-client";
import useMedia from "hooks/useMedia";
import { GameNotify } from "types/app";
import { useLocation, useNavigate } from "react-router-dom";
import useUserStatus from "hooks/useUserStatus";
import { gameSocket } from "services/axios/socket";

export default function Notifications() {
  const xl = useMedia(mediaQueries.xl);
  const navigate = useNavigate();
  const { updateUser } = useUserStatus();
  const location = useLocation();

  // when recieving a notification call this function with anvitation object
  const notify = (invite: GameNotify) => {
    toast(<GameInviteNotif invitation={invite} />, {
      position: toast.POSITION.TOP_RIGHT,
      className: "game-invite-notification",
      onClose: () => {
        console.log("on close....", location);
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

  useEffect(() => {
    // on connect
    gameSocket.on("connect", () => {
      console.log("socket created", gameSocket);
    });
    gameSocket.emit("subscribeGameInvites");

    gameSocket.on("gameInvitesUpdate", async (data) => {
      console.log("game invites update..", data);
      const acceptGameReq = () => {
        navigate("/game?invitation=" + data.invitation);
      };
      notify({
        username: data.userId,
        accept: acceptGameReq,
        invitation: data.invitation,
      });
    });
    gameSocket.on("userStatusUpdate", async (data) => {
      console.log("userStatusUpdate", data);
      updateUser(data);
    });

    return () => {
      gameSocket.disconnect();
    };
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
