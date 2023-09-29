import useAxiosPrivate from "../hooks/useAxiosPrivate";

const url = "/:userId/posts";

const apiClient = useAxiosPrivate();

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
