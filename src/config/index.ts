// get all end points needed from envirement variables
import { MediaQuery } from "types/config";

const api = {
  auth42: process.env.AUTH42REDIRECT,
  users: process.env.USERS_API || "http://localhost:3500",
  game: process.env.GAME_API || "http://localhost:3001",
};

interface MediaQueries {
  sm: MediaQuery;
  md: MediaQuery;
  lg: MediaQuery;
  xl: MediaQuery;
  xl2: MediaQuery;
}

const mediaQueries: MediaQueries = {
  sm: "(min-width: 500px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
  xl2: "(min-width: 1536px)",
};

const levelFactor = 40;

export { api, mediaQueries, levelFactor };
