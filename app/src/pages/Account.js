import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useLogout from "../hooks/useLogout";

export default function Account() {
  const axiosPrivate = useAxiosPrivate();
  const logout = useLogout();

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
      <p>bottone di prova per testare autenticaizione</p>
      <button onClick={() => getUsers()}>get Users</button>
      <button onClick={() => logout()}>Logout</button>
    </>
  );
}
