import { createContext, useState, useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";


const AuthContext = createContext({});

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isAuth, setIsAuth] = useState(false);

  function signin(user) {
    console.log('signin auth provider...', user);
    setUser(user);
    setIsAuth(true);
  }
  function signout() {
    console.log('signout auth provider...');
    setUser({});
    setIsAuth(false);
  }
  function isUserAuth() {
    return isAuth;
  }
  return (
    <AuthContext.Provider value={{ user, signin, signout, isUserAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

function RequireAuth({ children }) {
  let { isUserAuth } = useContext(AuthContext);
  let location = useLocation();

  console.log('require auth : ', isUserAuth());
  if (isUserAuth()) {
    return children;
  }
  // Redirect them to the /login page, but save the current location they were
  // trying to go to when they were redirected. This allows us to send them
  // along to that page after they login, which is a nicer user experience
  // than dropping them off on the home page.
  return <Navigate to="/access/signin" state={{ from: location }} replace />;
}



function RedirectAuth({ children }) {
  let { isUserAuth } = useContext(AuthContext);

  if (isUserAuth()) {
    // if they are loged in, Redirect them to the /home page.
    // replace : true, so we don't create another entry in the history stack
    //for the login page.  This means that when they get to the /home page
    // and click the back button, they won't end up back on the login page,
    // which is also really nice for the user experience.
    return <Navigate to="/home" replace={true} />;
  }

  return children;
}


export { RequireAuth, RedirectAuth }
