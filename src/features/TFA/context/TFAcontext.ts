import { createContext } from "react";
import { InterpreterFrom } from "xstate";
import TFAmachine from "../services/TFAmachine";

const TFAcontext = createContext({} as InterpreterFrom<typeof TFAmachine>);
export default TFAcontext;
