import axiosapi from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
      const response = await axiosapi.apiPrivate.get("./refresh");

      await setAuth((prev) => {
        // console.log(JSON.stringify(prev));
        // console.log(response.data.accessToken);

        console.log("auth in useRefreshToken: " + JSON.stringify(prev));
        return response.data.accessToken;
      });
      return response.data.accessToken;
    } catch (err) {
      console.error("Token refresh failed: " + err);
      throw err;
    }
  };

  return refresh;
};

export default useRefreshToken;
