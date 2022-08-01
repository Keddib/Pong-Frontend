export interface User {
  id: number;
  username: string;
  nickname: string;
  avatar: string;
  status: "online" | "offline" | "playing" | "spectating";
  wins: number;
  losses: number;
  xp: number;
  level: number;
  rules: "me" | "friend" | "requested" | "none";
}

export interface Game {
  id: number;
  mode: 1 | 2 | 3;
  status: "playing" | "done";
  player: [User, User];
  scores: [number, number];
}
