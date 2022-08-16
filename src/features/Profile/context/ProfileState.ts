import { createContext } from "react";
import { InterpreterFrom } from "xstate";
import profileMachine from "../services/profileMachine";

const ProfileStateContext = createContext(
  {} as InterpreterFrom<typeof profileMachine>
);

export default ProfileStateContext;
