import client from "./axios";

const endpoint = "/auth";

const regendpoint = "/register";

const postLogin = (data) => {
  return client.apiPrivate.post(endpoint, data);
};

const postRegister = (data) => {
  return client.apiPrivate.post(regendpoint, data);
};

const exportPosts = {
  postLogin,
  postRegister,
};

export default exportPosts;
