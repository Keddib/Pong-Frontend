import { io } from "socket.io-client";

const usersSocket = io("http://localhost:3500/", {
  withCredentials: true,
  extraHeaders: {
    Authorization: "Bearer " + localStorage.getItem("accessToken"),
  },
});

usersSocket.on("connect_error", () => {
  gameSocket.close();
});

const gameSocket = io("ws://localhost:3001", {
  withCredentials: true,
  extraHeaders: {
    Authorization: "Bearer " + localStorage.getItem("accessToken"),
  },
});

gameSocket.on("connect_error", () => {
  gameSocket.close();
});

export { usersSocket, gameSocket };
