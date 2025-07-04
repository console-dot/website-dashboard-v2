import axios from "axios";

const BASE_URL = "https://api.consoledot.com/api/v1";

const makeRequest = async (fn) => {
  return axios
    .get(BASE_URL + "/auths", {
      headers: {
        Authorization: `JWT ${localStorage.getItem("@dashboard-token")}`,
      },
    })
    .then((res) => {
      localStorage.setItem("@dashboard-token", res?.token);
      return fn();
    })
    .catch(() => fn());
};

const config = {
  BASE_URL,
  makeRequest,
};

export default config;
