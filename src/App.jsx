import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Routes, useLocation } from "react-router-dom";

import "./App.scss";

import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import Register from "./components/Register/Register";
import { Container } from "@mui/system";
import { logout } from "./redux/features/auth/auth";
import eventBus from "./common/EventBus";
import { useCallback, useEffect } from "react";
import Header from "./components/Header/Header";

function App() {
  const location = useLocation();
  const { pathname } = location;
  console.log(location);
  console.log(pathname);
  console.log(pathname == "/register" || pathname == "/login");
  // console.log(pathname && "/login");

  return (
    <div className="App">
      {pathname == "/register" || pathname == "/login" ? <></> : <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
