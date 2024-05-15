import axios from "axios";
import config from "./config";

const BASE_URL = config.BASE_URL;

export const getOpenPosition = () => {
  const token = localStorage.getItem("@dashboard-token");
  return axios
    .get(`${BASE_URL}/open-positions`, {
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
export const getOpenPositionOne = () => {
  const token = localStorage.getItem("@dashboard-token");
  return axios
    .get(`${BASE_URL}/open-positions/662fb172dbcc7c0705c8cbc7`, {
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

export const editOpenPosition = (values) => {
  const token = localStorage.getItem("@dashboard-token");
  return axios
    .put(
      `${BASE_URL}/open-positions/662fb00cfbfc362394923a08`,
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

export const deleteOpenPosition = () => {
  const token = localStorage.getItem("@dashboard-token");
  return axios
    .delete(`${BASE_URL}/open-positions/662fb172dbcc7c0705c8cbc7`, {
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

export const addPosition = (newPosition) => {
  const token = localStorage.getItem("@dashboard-token");
  return axios
    .post(`${BASE_URL}/open-positions`, newPosition, {
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
