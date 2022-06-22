import React, { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useNavigate, useSearchParams } from "react-router-dom";
import { AuthProvider, RequireAuth, RedirectAuth } from "./Auth";
import Loading from "/src/Components/Loading";
import Error404 from "./Components/404";

const Dashboard = lazy(() => import("./Dashboard"));
const Landing = lazy(() => import("/src/Landing"));
const Login = lazy(() => import("./Login"));



const App = () => {
  return (
    <AuthProvider>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={
            <RedirectAuth>
              <Landing />
            </RedirectAuth>
          } />
          <Route path="/home/*"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            } />

          <Route path="/access/*"
            element={
              <RedirectAuth>
                <Login />
              </RedirectAuth>
            } />

          <Route path="/auth42/" element={<Auth42 />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
};

export default App;


function Auth42() {

  let [searchParams] = useSearchParams();
  let navigate = useNavigate();

  useEffect(() => {
    if (!searchParams.get('code'))
      navigate('/', { replace: true });
  });

  return (
    <div className="w-full h-full bg-spaceCadet flex justify-center items-center">
      <p className="text-lotion">welcome to pong</p>
    </div>
  );
}
