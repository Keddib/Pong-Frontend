import { createContext } from "react";

interface ErrorContext {
  setErrorStatusCode: React.Dispatch<React.SetStateAction<number>>;
}

const ErrorStatusContext = createContext<ErrorContext>({} as ErrorContext);

export default ErrorStatusContext;
