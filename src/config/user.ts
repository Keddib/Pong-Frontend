type IStatus = "online" | "offline" | "playing" | "spectating";

var user1 = {
  id: 12134,
  username: "AlaeOX7",
  nickname: "AlaeOX7",
  status: "online" as IStatus,
  avatar:
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
  wins: 100,
  losses: 60,
  xp: 439,
  level: 11,
  rules: "me" as "me" | "friend" | "requested" | "none",
};

export default user1;
