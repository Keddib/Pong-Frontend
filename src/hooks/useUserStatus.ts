import { useContext } from "react";
import userStatusContext from "src/context/userStatus";

function useUserStatus() {
  const userStatus = useContext(userStatusContext);
  return userStatus;
}

export default useUserStatus;
