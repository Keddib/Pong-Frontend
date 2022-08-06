import React, { FunctionComponent } from "react";
import ErrorStatusContext from "src/context/errorStatus";
import Error404 from "components/Error404";
import { useLocation } from "react-router-dom";
// The top level component that will wrap our app's core features
const ErrorHandler: FunctionComponent<{ children: JSX.Element }> = ({
  children,
}) => {
  const [errorStatusCode, setErrorStatusCode] = React.useState(0);

  // Make sure to "remove" this status code whenever the user
  // navigates to a new URL. If we didn't do that, then the user
  // would be "trapped" into error pages forever

  let location = useLocation();

  React.useEffect(() => {
    if (errorStatusCode != 0) {
      setErrorStatusCode(0);
    }
  }, [location]);

  // This is what the component will render. If it has an
  // errorStatusCode that matches an API error, it will only render
  // an error page. If there is no error status, then it will render
  // the children as normal
  const renderContent = () => {
    console.log("errorhundler", errorStatusCode);
    if (errorStatusCode != 0) {
      return <Error404 />;
    }

    return children;
  };

  // We wrap it in a useMemo for performance reasons. More here:
  // https://kentcdodds.com/blog/how-to-optimize-your-context-value/
  const contextPayload = React.useMemo(
    () => ({ setErrorStatusCode }),
    [setErrorStatusCode]
  );

  // We expose the context's value down to our components, while
  // also making sure to render the proper content to the screen
  return (
    <ErrorStatusContext.Provider value={contextPayload}>
      {renderContent()}
    </ErrorStatusContext.Provider>
  );
};

export default ErrorHandler;
