import axios from "axios";
import config from "./config";

const BASE_URL = config.BASE_URL;

export const getArtificialIntelligence = () => {
  const token = localStorage.getItem("@dashboard-token");
  return axios
    .get(`${BASE_URL}/artificail-intelligence/664202ccf15adab9d7b41ceb`, {
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

export const editArtificialIntelligence = (values) => {
  const token = localStorage.getItem("@dashboard-token");
  return axios
    .put(
      `${BASE_URL}/artificail-intelligence/664202ccf15adab9d7b41ceb`,
      values,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "JWT " + token,
        },
      }
    )
    .then((res) => {
      if (res?.data?.token)
        localStorage.setItem("@dashboard-token", res?.data?.token);
      return res?.data;
    })
    .catch((err) => console.log(err));
};
