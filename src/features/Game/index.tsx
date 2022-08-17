import React, { useState, useEffect, useRef } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams
} from "react-router-dom";
import Play from "./components/Playing";
import Waiting from "./components/Waiting";
import io from "socket.io-client";
import { User } from "types/user";
import { Socket } from "socket.io-client";
import useAuth from "~/src/hooks/useAuth";
import { GameState } from "./components/Pong/utils/Types";
import { axiosUsers, checkUserSession } from "~/src/services/axios";
interface CustomGamePayload {
  opponent: string;
}
interface LocationState {
  mode: string;
  custom?: CustomGamePayload;
}
interface Loc extends Location {
  state: LocationState;
}
export default function Game() {
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
  useEffect(() => {
    socket.current = io("ws://localhost:3001", {
      withCredentials: true,
      extraHeaders: { Authorization: "Bearer " + getAccessToken() }
    }).on("connect", () => {
      console.log("socket created", socket.current);
      if (!location.state) location.state = { mode: "classic" };
      socket.current?.emit("initGame");
      socket.current?.on("authenticated", () => {
        socket.current?.emit("playerJoined", {
          mode: location.state.mode,
          custom: invitation ? { invitation } : location.state.custom
        });
      });
      //onGameState
      socket.current?.on("gameState", (data: GameState) => {
        if (
          gameState == "waiting" &&
          location.state.mode.toLowerCase() === data.mode.toLowerCase() &&
          !opponent &&
          !once
        ) {
          console.log(
            "oponent",
            JSON.parse(data.playerData)[
              (data.players.indexOf(socket.current.id) + 1) % 2
            ]
          );
          setOpponent(
            JSON.parse(data.playerData)[
              (data.players.indexOf(socket.current.id) + 1) % 2
            ]
          );
          once = true;
          setTimeout(() => {
            setGameState("play");
          }, 2000);
        }

        gameStateData.current = data;
      });
      socket.current?.on("invalidInvitation", () => {
        socket.current?.close();
        navigate("/");
      });
    });

    return () => {
      socket.current?.close();
    };
  }, [invitation]);

  const navigate = useNavigate();

  let page = (
    <Waiting user={user} opponent={opponent} setGameState={setGameState} />
  );

  if (gameState == "play")
    page = (
      <Play
        players={[user, opponent as User]}
        gameStateData={gameStateData}
        socket={socket}
      />
    );
  else if (gameState == "canceled") {
    navigate("/home", { replace: true });
  }
  return <>{page}</>;
}
