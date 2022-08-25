import React, { useState, useEffect, useRef, FunctionComponent } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Play from "./components/Playing";
import Waiting from "./components/Waiting";
import io from "socket.io-client";
import { User } from "types/user";
import { Socket } from "socket.io-client";
import useAuth from "~/src/hooks/useAuth";
import { GameState } from "./components/Pong/utils/Types";

interface CustomGamePayload {
  opponent: string;
}
interface LocationState {
  mode: string;
  custom?: CustomGamePayload;
  from?: string;
}
interface Loc extends Location {
  state: LocationState;
}
// {setGameRoomId: (id: string) => void}
const Game: FunctionComponent<{ setGameRoomId: (id: string) => void }> = ({
  setGameRoomId,
}) => {
  const location: Loc = useLocation();
  const { signin } = useAuth();
  const [searchParams] = useSearchParams();
  console.log("game mode = ", location?.state?.mode);
  const { user, getAccessToken } = useAuth();
  const [opponent, setOpponent] = useState(null as null | User);

  const [gameState, setGameState] = useState("waiting");

  // const [gameStateData, setGameStateData] = useState({})
  const gameStateData = useRef(null as null | GameState);
  const socket = useRef(null as null | Socket);
  let once = false;
  const invitation = searchParams.get("invitation");
  const spectate = searchParams.get("spectate");
  const [players, setPlayers] = useState([] as User[]);
  useEffect(() => {
    socket.current = io("ws://localhost:3001", {
      withCredentials: true,
      extraHeaders: { Authorization: "Bearer " + getAccessToken() },
    }).on("connect", () => {
      console.log("socket created", socket.current);
      if (!location?.state) location.state = { mode: "classic" };

      if (spectate) {
        socket.current?.emit("spectate", { gameId: spectate });
      } else {
        socket.current?.emit("initGame");
        socket.current?.on("authenticated", () => {
          socket.current?.emit("playerJoined", {
            mode: location?.state?.mode,
            custom: invitation ? { invitation } : location?.state?.custom,
          });
          socket.current?.on("roomName", (data: { roomName: string }) => {
            console.log("roomname");
            setGameRoomId(data.roomName);
          });
        });
      }
      //onGameState
      socket.current?.on("gameState", (data: GameState) => {
        if (
          gameState == "waiting" &&
          location?.state?.mode.toLowerCase() === data.mode.toLowerCase() &&
          !opponent &&
          !once
        ) {
          // if (!spectate) {
          //   setOpponent(
          //     JSON.parse(data.playerData)[
          //       (data.players.indexOf(socket.current?.id) + 1) % 2
          //     ]
          //   );
          //   setPlayers([
          //     user,
          //     JSON.parse(data.playerData)[
          //       (data.players.indexOf(socket.current?.id) + 1) % 2
          //     ]
          //   ]);
          // } else {
          setOpponent(
            JSON.parse(data.playerData)[
              (data.players.indexOf(socket.current?.id || "") + 1) % 2
            ]
          );
          setPlayers(JSON.parse(data.playerData));

          once = true;
          setTimeout(
            () => {
              setGameState("play");
            },
            spectate ? 0 : 2000
          );
        }

        gameStateData.current = data;
      });
      socket.current?.on("invalidSpectate", () => {
        socket.current?.close();
        navigate("/");
      });
      socket.current?.on("invalidInvitation", () => {
        socket.current?.close();
        navigate("/");
      });
    });

    return () => {
      socket.current?.close();
      setGameRoomId("");
    };
  }, [invitation]);

  const navigate = useNavigate();

  let page = (
    <Waiting
      user={players[0] || user}
      opponent={players[1]}
      setGameState={setGameState}
    />
  );

  if (gameState == "play")
    page = (
      <Play players={players} gameStateData={gameStateData} socket={socket} />
    );
  else if (gameState == "canceled") {
    navigate(location?.state?.from || "/home", {
      replace: true,
    });
  }
  return <>{page}</>;
};

export default Game;
