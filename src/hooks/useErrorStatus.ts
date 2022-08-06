import { useContext } from "react";
import ErrorStatusContext from "src/context/errorStatus";
const useErrorStatus = () => useContext(ErrorStatusContext);

export default useErrorStatus;
