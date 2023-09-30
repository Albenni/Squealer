import client from "./axios";

const endpoint = "/auth";

const regendpoint = "/register";

const logoutendpoint = "/logout";

const postLogin = (data) => {
  return client.apiPrivate.post(endpoint, data);
};

const postRegister = (data) => {
  return client.apiPrivate.post(regendpoint, data);
};

const userLogout = () => {
  return client.apiPrivate.get(logoutendpoint);
};

const exportPosts = {
  postLogin,
  postRegister,
  userLogout,
};

export default exportPosts;
