import axiosapi from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    const response = await axiosapi.apiPrivate.get("./refresh");

    await setAuth((prev) => {
      // console.log(JSON.stringify(prev));
      // console.log(response.data.accessToken);

      return response.data.accessToken;
    });
    console.log(auth);
    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
