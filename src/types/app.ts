interface User {
  uid: string;
  username: string;
  nickname: string;
  avatar: string;
  status: "online" | "offline" | "playing" | "spectating";
  wins: number;
  losses: number;
  xp: number;
  level: number;
  rule: "me" | "friend" | "receiver" | "sender" | "blocked" | "none";
  tfaEnabled: boolean;
  tfaSecret?: string;
}

interface Game {
  id: number;
  mode: string;
  status: "playing" | "done";
  playerOne: User;
  playerTwo: User;
  scoreOne: number;
  scoreTwo: number;
}

interface FriendRequest {
  uid: string;
  status: boolean;
  sender: User;
}

type Notification = {
  type: "request" | "accept";
  sender: string; // username
};

type GameNotify = {
  // name of sinder
  name: string; // username
  // behavior of accepting a request
  accept: () => void;
};

export { User, Game, FriendRequest, Notification, GameNotify };
