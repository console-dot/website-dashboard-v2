import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import { LandingPage ,Offshoring} from "./pages"; // Assuming LandingPage component exists

import { selectIsLoggedIn } from "./redux";

function App() {
  const loggedIn = useSelector(selectIsLoggedIn);
  return (
    <BrowserRouter>
      {loggedIn ? (
        <div style={{ backgroundColor: "white", padding: "0" }}>
          <Navbar>
            <Routes>
              {/* <Route path="/OffShoring" element={<Offshoring />} /> */}
              <Route path="/logout" element={<Logout />} />
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
