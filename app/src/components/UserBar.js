import { Image } from "react-bootstrap";

function UserBar({ user }) {
  return (
    <div
      className="container-fluid d-flex justify-content-center"
      style={{
        backgroundColor: "#f5f5f5",
      }}
    >
      <div className="col">
        <div
          className="row py-4"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <div
            className="col"
            // style={{
            //   display: "flex",
            //   justifyContent: "end",
            // }}
          > */}
          <Image
            src={user.image}
            alt="profile"
            className="rounded-circle"
            style={{ maxWidth: "10vw" }}
          />
          {/* </div> */}
        </div>
        <div
          className="row"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "2em",
          }}
        >
          {user.username}
        </div>
        <div className="text-center">
          <div>Aggiungere bottone per seguire questa persona</div>
          <div>
            Aggiungere dropdown per vedere i canali dove posta o che segue
            questa persona
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserBar;
