import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { LayoutContext } from "../../context/layoutContext";
import { UserDataContext } from "../../context/userContext";
import { BellIcon } from "../../assets/images/svgs";
import { useHistory } from "react-router-dom";
import pic from "../../assets/imgF/codeuiandyimg.png";
import { useLocation } from "react-router-dom";
//import GoBack from './../helpers/GoBack';

export default function Navbar({
  browserRouter,
  routeType,
  fullProps,
  pageName,
}) {
  const { appReduceSidebarWidth } = useContext(LayoutContext);
  const { user, setStatus, status } = useContext(UserDataContext);
  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <div
        id="navbar"
        className={`${
          appReduceSidebarWidth === true
            ? "section-wrap-nav"
            : "section-wrap-nav section-wrap-navPadding"
        }`}
      >
        <div className="navbar-position">
          <div
            className="navbar-wrap"
            className={`${
              appReduceSidebarWidth === true
                ? "navbar-wrap"
                : "navbar-wrap section-wrap-navWidth"
            }`}
          >
            {/* <div className="navbar-pad">
              <div className="nav-list-data">
                <span className="navBack-container">
                  <span
                    onClick={GobackFun}
                    style={{ color: "#14274E", cursor: "pointer" }}
                  >
                    <img
                      style={{ marginRight: "10px", marginBottom: "-2px" }}
                      src={backIcon}
                      alt=""
                    />{" "}
                    Back
                  </span>
                </span>

                <span
                  // style={{ marginBottom: "15px" }}
                  className="center-element"
                >
                  <span className="navbar-bel-icon">
                    <img
                      style={{ width: "18px", marginRight: "27px" }}
                      src={bellIcon}
                      alt=""
                    />
                  </span>
                  <span className="center-element user-info-nav">
                    <span className="userNameiii">okeke</span>
                    <img
                      style={{ width: "45px", borderRadius: "50%" }}
                      src={userIcon}
                      alt=""
                    />
                  </span>
                </span>
              </div>
            </div> */}
            <div className="navbar-content">
              <div className="pageTitle">
                <span style={{ textTransform: "capitalize" }}>{pageName}</span>
              </div>
              <div className="navbar-right-content align-items-center d-flex">
                <div className="appModeSet">
                  <button
                    onClick={() => setStatus(!status)}
                    style={
                      status == false
                        ? { border: "1px solid red", color: "red" }
                        : {}
                    }
                  >
                    Live mode - {status == true ? "ON" : "OFF"}
                  </button>
                </div>
                <BellIcon />
                <img src={user ? pic : pic} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
