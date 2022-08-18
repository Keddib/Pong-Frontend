import { User } from "./app";

export interface UserContext {
  user: User;
  isUserAuth: () => boolean;
  signin: (user: User) => void;
  signout: () => void;
  getAccessToken: () => string;
  setAccessToken: (token: string) => void;
  updateUser: (user: User) => void;
}
