import axiosapi from "./axios";

const url = "";

const getUserInfo = (query) => {
  return apiClient.get(url + encodeURIComponent(query));
};

const exportPosts = {
  getUserInfo,
};

export default exportPosts;
