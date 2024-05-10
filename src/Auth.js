import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const getUser = async () => {
  return localStorage.getItem("@dashboard-token");
};

export const Auth = () => {
  const navigate = useNavigate();
  const isAuthenticated = async () => {
    const user = await getUser();
    if (!user || user === "null") {
      navigate("/");
    }
  };
  useEffect(() => {
    if (
      window.location.pathname !== "/reset-password" &&
      window.location.pathname !== "/forget-password"
    ) {
      isAuthenticated();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  return null;
};
