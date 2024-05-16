import axios from "axios";
import config from "./config";

const BASE_URL = config.BASE_URL;


export const getoffshoreservicepage = () => {
    const token = localStorage.getItem("@dashboard-token");
  return axios
    .get(`${BASE_URL}/offshoringService/6641ad8aee9301ec9cb857fe`, {
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


export const editoffshoreservicepage = (values, id) => {
  const token = localStorage.getItem("@dashboard-token");
  return axios
    .put(`${BASE_URL}/offshoringService/${id}`, values, {
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

