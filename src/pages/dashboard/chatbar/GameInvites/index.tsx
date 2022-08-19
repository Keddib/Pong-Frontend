import {
  FunctionComponent,
  JSXElementConstructor,
  useEffect,
  useRef,
  useState
} from "react";
import { io, Socket } from "socket.io-client";
import useAuth from "~/src/hooks/useAuth";
import { axiosAuth } from "~/src/services/axios/axios";
import { User } from "~/src/types/app";
import GameInvite from "./GameInviteItem";

const GameInvites: FunctionComponent<{}> = ({}) => {
  const { user, getAccessToken } = useAuth();
  const [invites, setInvites] = useState([] as JSX.Element[]);
  const socket = useRef<Socket | null>(null);
  useEffect(() => {
    socket.current = io("ws://localhost:3001", {
      withCredentials: true,
      extraHeaders: { Authorization: "Bearer " + getAccessToken() }
    }).on("connect", () => {
      console.log("socket created", socket.current);
      socket.current?.emit("subscribeGameInvites");
      socket.current?.on("gameInvitesUpdate", async (data) => {
        console.log("onGameInvitesUpdate");
        console.log(data);
        let invs = await Promise.all(
          data.data.map(async (e) => {
            const u = await axiosAuth.get<User>(`user/id/${e.userId}`, {
              headers: {
                Authorization: `Bearer ${getAccessToken()}`
              }
            });
            return (
              <GameInvite
                key={u.data.uid}
                user={u.data}
                invitation={e.invitation}
                remove={() => {
                  setInvites(
                    invites.filter((a) => a.props.invitation != e.invitation)
                  );
                }}
              />
            );
          })
        );
        setInvites(invs);
      });
    });

    return () => {
      socket.current?.close();
    };
  }, []);
  return (
    <div className="game-activity">
      <h4>Game Invitations</h4>
      <div className="h-28 overflow-auto">
        {/* here GAMEINVITES */}
        {invites}
      </div>
    </div>
  );
};

export default GameInvites;
