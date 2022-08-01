import axios from "axios";
import { api } from "config/index";
import { User } from "types/user";

const axiosAuth = axios.create({
  baseURL: api.users,
});

const axiosPrivate = axios.create({
  headers: { "Content-type": "application/json" },
  baseURL: api.users,
});

async function updateUser(data: FormData): Promise<User> {
  // send response to update user
  const res = await axiosAuth.put<User>(`/users/`, data, {
    withCredentials: true,
  });
  var user: User = res.data;
  return user;
}

const authenticateUser = async (code: string) => {
  try {
    var res = await axiosAuth.get<{ access_token: string }>("/auth", {
      params: { code: code },
    });
    const accessToken = res.data.access_token;
    console.log("accessToken :", accessToken);
    return accessToken;
  } catch (error) {
    console.log(error);
  }
  return "";
};

async function endSession() {
  try {
    await axiosAuth("/auth/logout", { withCredentials: true });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.status);
    } else {
      console.log(error);
    }
  }
}

export { updateUser, authenticateUser, endSession, axiosPrivate, axiosAuth };
