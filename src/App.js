import logo from "./logo.svg";
import "./App.css";
import { login, selectIsLoggedIn } from "./redux";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import { LandingPage } from "./components/Landing/LandingPage";

function App() {
  const loggedIn = useSelector(selectIsLoggedIn);
  console.log(loggedIn);
  return (
    <BrowserRouter>
      {loggedIn ? (
        <div style={{ backgroundColor: "white", padding: "0" }}>
          <Navbar>
            <Routes>
              {/* <Route path="/" element={<Dashboard />} /> */}
              <Route path="/landingPage" element={<LandingPage />} />
              <Route
                path="/logout"
                element={<Logout />}
              />
            </Routes>
          </Navbar>
        </div>
      ) : (
        <div style={{ background: "#f8f9fc", height: "100vh" }}>
          <Routes>
            <Route path="/" element={<Login loggedIn={loggedIn} />} />
          </Routes>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
