import { User } from "./user";

export interface Context {
  user: User;
  isUserAuth: () => boolean;
  signin: (user: User) => void;
  signout: () => void;
  getAccessToken: () => string;
  setAccessToken: (token: string) => void;
}
