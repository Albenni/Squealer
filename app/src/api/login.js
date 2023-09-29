import apiClient from "./axios";

const url = "/auth";

const postLogin = (data) => {
  // apiClient.headers["Content-Type"] = "application/json";
  const response = apiClient.post(url, data);
  return response;
};

const exportPosts = {
  postLogin,
};

export default exportPosts;
