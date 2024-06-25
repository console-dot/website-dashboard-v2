import axios from "axios";
import config from "./config";

const BASE_URL = config.BASE_URL;

export const getproductresearchpage = async () => {
  try {
    const token = localStorage.getItem("@dashboard-token");
    const response = await axios.get(`${BASE_URL}/productRS`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + token,
      },
    });
    if (response.data.token) {
      localStorage.setItem("@dashboard-token", response.data.token);
    }
    return response.data;
  } catch (err) {
    return err?.response?.status;
  }
};

export const editproductresearchpage = async (values, _id) => {
  try {
    const token = localStorage.getItem("@dashboard-token");
    const response = await axios.put(
      `${BASE_URL}/productRS/${_id}`,
      values,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "JWT " + token,
        },
      }
    );
    if (response.data.token) {
      localStorage.setItem("@dashboard-token", response.data.token);
    }
    return response.data;
  } catch (error) {
    throw new Error("Failed to edit product research page data");
  }
};
