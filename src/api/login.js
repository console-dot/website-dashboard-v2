import axios from "axios";
import config from "./config";

const url = config.BASE_URL;

export const setLogin = (values) => {
  return axios
    .post(url + "/login", values)
    .then((res) => {
      console.log(res, "reponse");
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
