import theme from "../../config/theme";
import config from "../../config/config";

import { useMediaQuery } from "react-responsive";
import guesticon from "../../assets/guesticon.png";

function SquealUser({ user, chars }) {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  // useEffect(() => {}, []);

  return (
    <div className="row d-flex">
      <div
        className={
          isMobile
            ? "col-sm-auto pb-3 d-flex justify-content-center"
            : "col-sm-auto pb-3"
        }
      >
        <img
          alt="Profile"
          src={
            user?.profilePic
              ? config.URL +
                "/profilePic/" +
                sessionStorage.getItem("userid") +
                user.profilePic
              : guesticon
          }
          style={{
            borderRadius: "50%",
            height: "100px",
            width: "100px",
            objectFit: user?.profilePic ? "cover" : "contain",
          }}
        />
      </div>
      <div className="col">
        <div className={isMobile ? "row d-flex" : "row"}>
          <h5
            className={isMobile ? "col d-flex justify-content-center" : "col"}
          >
            {user.firstname} {user.surname}
          </h5>
        </div>
        <div className={isMobile ? "row d-flex" : "row"}>
          <h6
            style={{ color: theme.colors.lightgrey }}
            className={isMobile ? "col d-flex justify-content-center" : "col"}
          >
            @{user.username}
          </h6>
        </div>
      </div>
      {!isMobile && (
        <div
          className="col flex-row align-items-start justify-content-end"
          style={{
            pointerEvents: "none",
          }}
        >
          <p>Numero caratteri giornalieri: {user.dailyChar}</p>
          <p>
            Caratteri rimanenti:{" "}
            {user.dailyChar - chars < 0 ? 0 : user.dailyChar - chars}
          </p>
        </div>
      )}
      {isMobile && (
        <div
          className="pt-3 flex-column justify-content-center align-items-center"
          style={{
            pointerEvents: "none",
          }}
        >
          <p>Numero caratteri giornalieri: {user.dailyChar}</p>
          <p>
            Caratteri rimanenti:{" "}
            {user.dailyChar - chars < 0 ? 0 : user.dailyChar - chars}
          </p>
        </div>
      )}
    </div>
  );
}

export default SquealUser;
