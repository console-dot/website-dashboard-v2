import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import { LandingPage } from "./components/Landing/LandingPage";
import { selectIsLoggedIn } from "./redux";
import LandingPageEdit from "./components/Landing/LandingPageEdit";
import { OffshoringPage } from "./components/Offshoring/OffshoringPage";
import OffshoringPageEdit from "./components/Offshoring/OffshoringPageEdit";

function App() {
  const loggedIn = useSelector(selectIsLoggedIn);
  return (
    <BrowserRouter>
      {loggedIn ? (
        <div style={{ backgroundColor: "white", padding: "0" }}>
          <Navbar>
            <Routes>
              {/* <Route path="/" element={<Dashboard />} /> */}
              <Route path="/landingPage" element={<LandingPage />} />
              <Route path="/LandingPage/edit/:id" element={<LandingPageEdit/>} />
              <Route path="/offShoring" element={<OffshoringPage/>} />
              <Route path="/OffshoringPage/edit/:id" element={<OffshoringPageEdit/>} />
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
