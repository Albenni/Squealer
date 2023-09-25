import apiClient from "./axios";

const url = "/:userId/posts";

const getSqueals = (query) => {
  return apiClient.get(url + encodeURIComponent(query));
};

const postSqueal = (data) => {
  apiClient.headers["Content-Type"] = "application/json";
  return apiClient.post(url, data);
};

const exportPosts = {
  getSqueals,
  postSqueal,
};

export default exportPosts;
