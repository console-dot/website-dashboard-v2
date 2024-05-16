import axios from "axios";
import config from "./config";

const BASE_URL = config.BASE_URL;

export const getWebDevelopment = () => {
  const token = localStorage.getItem("@dashboard-token");
  return axios
    .get(`${BASE_URL}/web-dev/6641f633464855376ec0a145`, {
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

export const editWebDevelopment = (values) => {
  const token = localStorage.getItem("@dashboard-token");
  return axios
    .put(
      `${BASE_URL}/web-dev/66308e7497987f41c1f64c3c`,
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
