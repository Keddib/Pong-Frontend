import { lazy, Suspense } from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Loading from "./Components/Loading";
const Login = lazy(() => import("./Loging"));
const Landing = lazy(() => import("./Home/Home"));
const Dashboard = lazy(() => import("./Dashboard"));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="*" element={<Landing />} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="/signin" element={<Login stage={true} />} />
          <Route path="/signup" element={<Login />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

render(<App />, document.getElementById("root"));
