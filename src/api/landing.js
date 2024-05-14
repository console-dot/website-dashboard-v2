import axios from "axios";
import config from "./config";

const BASE_URL = config.BASE_URL;
const token = localStorage.getItem("@dashboard-token");

export const getLandingPage = () => {
  return axios
    .get(`${BASE_URL}/landingPage`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + token,
      },
    })
    .then((res) => {
      if (res?.data?.token)
        localStorage.setItem("@dashboard-token", res?.data?.token);
      return res?.data;
    })
    .catch((err) => console.log(err));
};
