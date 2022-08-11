export interface User {
  uid: string;
  username: string;
  nickname: string;
  avatar: string;
  status: "online" | "offline" | "playing" | "spectating";
  wins: number;
  losses: number;
  xp: number;
  level: number;
  rule: "me" | "friend" | "requested" | "none";
}

export interface Game {
  id: number;
  mode: string;
  status: "playing" | "done";
  playerOne: User;
  playerTwo: User;
  scoreOne: number;
  scoreTwo: number;
}

export interface FriendRequest {
  uid: string;
  status: boolean;
  sender: User;
}
