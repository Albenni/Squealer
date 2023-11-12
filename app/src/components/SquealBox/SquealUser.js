import theme from "../../config/theme";

import { useMediaQuery } from "react-responsive";

function SquealUser({ user }) {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  return (
    <>
      <div className="row container-fluid">
        <div
          className={
            isMobile
              ? "col-sm-auto pb-3 d-flex justify-content-center"
              : "col-sm-auto pb-3"
          }
        >
          <img
            alt="Profile"
            src={"https://picsum.photos/100"}
            style={{ borderRadius: "50%" }}
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
            className="col d-flex align-items-start justify-content-end"
            style={{
              pointerEvents: "none",
            }}
          >
            <p>Numero caratteri giornalieri: {user.dailyChar}</p>
          </div>
        )}
      </div>

      {isMobile && (
        <div
          className="pt-3 d-flex justify-content-center align-items-center"
          style={{
            pointerEvents: "none",
          }}
        >
          <p>Numero caratteri giornalieri: {user.dailyChar}</p>
        </div>
      )}
    </>
  );
}

export default SquealUser;
