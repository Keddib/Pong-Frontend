import axios from "axios";

const URL = "http://10.11.3.6:3500";

export default axios.create({
  baseURL: URL
})

const axiosAuth = axios.create({
  baseURL: URL
})

export const authAPI = async (code, setError) => {
  try {
    const response = await axiosAuth.post("/auth",
      {},
      {
        headers: { 'Content-Type': 'application/json' },
        params: { 'code': code },
        withCredentials: true
      }
    );
    return [response?.data, response?.status];

  } catch (err) {
    if (!err?.response) {
      setError('No Server Response');
    } else if (err.response?.status === 401) {
      setError('Unauthorized');
    } else {
      setError('Login Failed');
    }
    return [null, -1];
  }
}
