import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux";
import { useDispatch } from "react-redux";
import { setLogout } from "../utils";

function Logout({ setLoggedIn }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // clear local
    setLogout();
    // clear global
    dispatch(logout());
    localStorage.removeItem("@dashboard-token");
    setLoggedIn(false);
    // navigate
    navigate("/");
  }, []);

  return;
}

export default Logout;
