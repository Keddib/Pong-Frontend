import { createContext } from "react";
import { UserContext } from "types/context";

const AuthContext = createContext<UserContext>({} as UserContext);

export default AuthContext;
