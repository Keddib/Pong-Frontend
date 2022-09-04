import axios from "axios";
import { api } from "config/index";

const axiosAuth = axios.create({
  baseURL: api.users,
  withCredentials: true,
});

const axiosPrivate = axios.create({
  headers: { "Content-type": "application/json" },
  withCredentials: true,
  baseURL: api.users,
});

const authenticateUser = async (code: string) => {
  var res = await axiosAuth.get<{ access_token: string }>("/auth", {
    params: { code: code },
  });
  if (res.status == 201) {
    return "TFA";
  }
  const accessToken = res.data.access_token;
  return accessToken;
};

async function endSession() {
  try {
    await axiosAuth("/auth/logout", { withCredentials: true });
  } catch (error) {
    error;
  }
}

export { authenticateUser, endSession, axiosPrivate, axiosAuth };
