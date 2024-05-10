import { useMutation, useQuery } from "react-query";
import { BASE_URL } from "./config";

const getAuth = () => {
  return {
    token: localStorage.getItem("@dashboard-token"),
    user: JSON.parse(localStorage.getItem("@dashboard-user")),
  };
};

const login = async (data) => {
  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...data }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res?.status === 200) {
        localStorage.setItem("@dashboard-token", res?.token);
        localStorage.setItem(
          "@dashboard-user",
          JSON.stringify(res?.data?.user)
        );
      }
      return res;
    })
    .catch(() => {
      throw new Error("Failed to fetch data");
    });
};

export function useLogin() {
  const { data, isLoading, error } = useQuery("auth", getAuth);
  const mutation = useMutation(login);
  return {
    data,
    isLoading,
    error,
    setLogin: mutation.mutate,
    loggedIn: mutation.isSuccess,
    loggingIn: mutation.isLoading,
    loginData: mutation.data,
  };
}
