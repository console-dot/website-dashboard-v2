import axios from "axios";
import config from "./config";

const BASE_URL = config.BASE_URL;

export const getOpenPosition = async () => {
  try {
    const token = localStorage.getItem("@dashboard-token");
    const res = await axios.get(`${BASE_URL}/open-positions`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + token,
      },
    });
    if (res.data.token)
      localStorage.setItem("@dashboard-token", res.data.token);
    return res.data;
  } catch (err) {
    return err?.response?.status;
  }
};
//api to edit that particular id in db
export const editOpenPosition = async (values, id) => {
  try {
    const token = localStorage.getItem("@dashboard-token");
    const res = await axios.put(`${BASE_URL}/open-positions/${id}`, values, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + token,
      },
    });
    if (res.data.token)
      localStorage.setItem("@dashboard-token", res.data.token);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteOpenPosition = async (id) => {
  try {
    const token = localStorage.getItem("@dashboard-token");
    const res = await axios.delete(`${BASE_URL}/open-positions/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + token,
      },
    });
    if (res.data.token)
      localStorage.setItem("@dashboard-token", res.data.token);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addPosition = async (values) => {
  try {
    const token = localStorage.getItem("@dashboard-token");
    const res = await axios.post(`${BASE_URL}/open-positions`, values, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + token,
      },
    });
    if (res.data.token)
      localStorage.setItem("@dashboard-token", res.data.token);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
