import { createContext } from "react";
import { UserStatus } from "../types/app";

type StatusContext = {
  updateUser: (user: UserStatus) => void;
  userStatus: UserStatus;
};

const userStatusContext = createContext<StatusContext>({} as StatusContext);

export default userStatusContext;
