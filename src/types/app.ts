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
  rule: {
    rule: "me" | "friends" | "receiver" | "sender" | "blocked" | "none";
    request: FriendRequest;
  };
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
  username: string; // username
  invitation: string;
  // behavior of accepting a request
  accept: () => void;
};

type Message = {
  username: string;
  text: string;
  date: Date;
  userId: string;
};

type Room = {
  name: string;
  id: string;
  uid: string;
  status?: string;
  avatar?: string;
};

interface ProfileContext {
  user: User;
  request: FriendRequest;
}

type UserStatus = {
  userId: string;
  status: "online" | "offline" | "playing" | "spectating";
};

export {
  User,
  Game,
  FriendRequest,
  Notification,
  GameNotify,
  Message,
  Room,
  ProfileContext,
  UserStatus,
};
