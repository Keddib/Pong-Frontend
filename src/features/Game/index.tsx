import React, { useState, useEffect, useRef, FunctionComponent } from "react";
import {
  useLocation,
  useNavigate,
  useSearchParams,
  Navigate,
} from "react-router-dom";
import Play from "./components/Playing";
import Waiting from "./components/Waiting";
import io from "socket.io-client";
import { User } from "types/user";
import { Socket } from "socket.io-client";
import useAuth from "hooks/useAuth";
import { GameState } from "./components/Pong/utils/Types";
import useTitle from "~/src/hooks/useTitle";

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
  const { user, getAccessToken } = useAuth();
  const [opponent, setOpponent] = useState(null as null | User);
  const setTitle = useTitle();

  useEffect(() => {
    setTitle("Game");
  }, []);

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
      socket.current?.removeAllListeners();
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
    return <Navigate to={location?.state?.from || "/home"} replace={true} />;
  }
  return <>{page}</>;
};

export default Game;
