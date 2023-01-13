import { Route, Routes, useLocation } from "react-router-dom";

import "./App.scss";

import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import Register from "./components/Register/Register";
import Header from "./components/Header/Header";

function App() {
  const location = useLocation();
  const { pathname } = location;

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
