import { createContext } from "react";
import { Context } from "types/context";

const AuthContext = createContext<Context>({} as Context);

export default AuthContext;
