import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux";
import { useDispatch } from "react-redux";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
    // setLoggedIn(false);
    dispatch(logout());
    navigate("/");
  }, []);

  return;
}

export default Logout;
