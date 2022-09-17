import { io } from "socket.io-client";
import { api } from "config/index";

const usersSocket = io(api.users, {
  withCredentials: true,
  extraHeaders: {
    Authorization: "Bearer " + localStorage.getItem("accessToken"),
  },
});

usersSocket.on("connect_error", () => {
  usersSocket.connect();
});

const gameSocket = io(api.game, {
  withCredentials: true,
  extraHeaders: {
    Authorization: "Bearer " + localStorage.getItem("accessToken"),
  },
});

gameSocket.on("connect_error", () => {
  gameSocket.connect();
});

const friendsSocket = io(`${api.users}/friends`, {
  withCredentials: true,
  extraHeaders: {
    Authorization: "Bearer " + localStorage.getItem("accessToken"),
  },
});
friendsSocket.on("connect_error", () => {
  friendsSocket.connect();
});

export { usersSocket, gameSocket, friendsSocket };
