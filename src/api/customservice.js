import axios from "axios";
import config from "./config";

const BASE_URL = config.BASE_URL;

export const getcustomservicepage = () => {
  const token = localStorage.getItem("@dashboard-token");
  return axios
    .get(`${BASE_URL}/customService`, {
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
    .catch((err) => {
      return err?.response?.status;
    });
};

export const editCustomService = (values, id) => {
  const token = localStorage.getItem("@dashboard-token");
  return axios
    .put(`${BASE_URL}/customService/${id}`, values, {
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
