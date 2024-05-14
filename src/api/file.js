import axios from "axios";
import config from "./config";

const BASE_URL = config.BASE_URL;

export const addFile = (values) => {
  const token = localStorage.getItem("@dashboard-token");
  const formData = new FormData();
  formData.append("avatar", values);
  return axios
    .post(`${BASE_URL}/file`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
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
