import client from "./axios";

const url = "/auth";

const postLogin = (data) => {
  return client.apiPrivate.post(url, data);
};

const exportPosts = {
  postLogin,
};

export default exportPosts;
