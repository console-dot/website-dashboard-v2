export const resetLocalStorage = () => {
  const token = localStorage.getItem("@dashboard-token");
  const user = localStorage.getItem("@dashboard-user");
  localStorage.clear();
  localStorage.setItem("@dashboard-token", token);
  localStorage.setItem("@dashboard-user", user);
};

export const setLogout = () => {
  localStorage.removeItem("@dashboard-user");
  localStorage.removeItem("@dashboard-token");
  // window.location.reload();
};

export const toJson = (formData) => {
  const obj = {};
  formData.forEach(function (value, key) {
    obj[key] = value;
  });
  return obj;
};

export const truncateString = (string, maxLength) => {
  if (string.length <= maxLength) return string;
  return string.slice(0, maxLength) + "...";
};
