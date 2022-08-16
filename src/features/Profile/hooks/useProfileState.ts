import { useContext } from "react";
import ProfileStateContext from "../context/ProfileState";

export default function useProfileState() {
  return useContext(ProfileStateContext);
}
