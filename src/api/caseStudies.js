import axios from "axios";
import config from "./config";

const BASE_URL = config.BASE_URL;

export const getcaseStudiespage = () => {
  const token = localStorage.getItem("@dashboard-token");
  return axios
    .get(`${BASE_URL}/case-study`, {
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

export const editcaseStudies = (values, id) => {
  const token = localStorage.getItem("@dashboard-token");
  return axios
    .put(`${BASE_URL}/case-study/${id}`, values, {
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
export const removeCaseStudy = (id) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("@dashboard-token");
      const response = await axios.delete(`${BASE_URL}/case-study/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "JWT " + token,
        },
      });

      if (response.data.token) {
        localStorage.setItem("@dashboard-token", response.data.token);
      }

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
};
export const addCaseStudy = (formData) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("@dashboard-token");
      const response = await axios.post(`${BASE_URL}/case-study`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "JWT " + token,
        },
      });

      if (response.data.token) {
        localStorage.setItem("@dashboard-token", response.data.token);
      }

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
};
