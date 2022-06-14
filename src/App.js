import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./Loging/index";
import Dashboard from "./Dashboard/index";
import Home from "./Dashboard/MainPage/Home";
import LeaderBoard from "./Dashboard/MainPage/LeaderBoard";
import Messages from "./Dashboard/MainPage/Messages";
import Friends from "./Dashboard/MainPage/Friends";
import Groups from "./Dashboard/MainPage/Groups";
import Profile from "./Dashboard/MainPage/Profile";
import Landing from "./Home/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/details/:id" element={<Details />} /> */}
        <Route path="/signin" element={<Login stage={true} />} />
        <Route path="/signup" element={<Login />} />
        <Route path="/home" element={<Landing />} />
        <Route path="/" element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route path="leaderboard" element={<LeaderBoard />} />
          <Route path="messages" element={<Messages />} />
          <Route path="friends" element={<Friends />} />
          <Route path="groups" element={<Groups />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

render(<App />, document.getElementById("root"));
