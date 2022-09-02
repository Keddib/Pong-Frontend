import { useEffect } from "react";
import useErrorStatus from "../hooks/useErrorStatus";

const SetErrorPage = () => {
  const { setErrorStatusCode } = useErrorStatus();
  useEffect(() => {
    setErrorStatusCode(404);
  }, [setErrorStatusCode]);
  return <></>;
};
export default SetErrorPage;
