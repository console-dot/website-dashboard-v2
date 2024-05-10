import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux";
import { useDispatch } from "react-redux";
import { setLogout } from "../utils";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // clear local
    setLogout();
    // clear global
    dispatch(logout());
    // navigate
    navigate("/");
  }, []);

  return;
}

export default Logout;
