import { Route, Routes } from "react-router-dom";

import "./App.scss";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register/Register";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
