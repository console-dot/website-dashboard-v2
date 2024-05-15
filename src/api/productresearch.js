import axios from "axios";
import config from "./config";

const BASE_URL = config.BASE_URL;


export const getproductresearchpage = () => {
    const token = localStorage.getItem("@dashboard-token");
  return axios
    .get(`${BASE_URL}/productRS/6641f02c99571653f4e1426d`, {
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

