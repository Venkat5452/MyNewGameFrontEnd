import React from "react";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Registered from "./Components/Registered";
import Logout from "./Components/Logout";
import Forgotpassword from "./Components/Forgotpassword";
import LeaderBoard from "./Components/LeaderBoard";
function App() {
  return (
    <>
    <div className="text-center m-3">
      <Header/>
      <Routes>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/" element={<Login/>}/>
        <Route path="/Dashboard" element={<Dashboard/>}/>
        <Route path="/registered" element={<Registered/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/forgotpassword" element={<Forgotpassword/>}/>
        <Route path="/leaderboard" element={<LeaderBoard/>}/>
      </Routes>
    </div>
    </>
  );
}

export default App;
