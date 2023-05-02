import useAxiosPrivate from "../hooks/useAxiosPrivate";

export default function Account() {
  const axiosPrivate = useAxiosPrivate();

  const getUsers = async () => {
    try {
      const response = await axiosPrivate.get("/users");
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h1>ACCOUNT</h1>
      <button onClick={() => getUsers()}>refresh</button>
    </>
  );
}
