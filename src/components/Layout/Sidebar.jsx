import React, { useState, useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { LayoutContext } from "../../context/layoutContext";
import { AuthContext } from "../../context/authContext";
import { NotificationManager } from "react-notifications";
import {
  appLogo,
  toggleIcon,
  dashboardIcon,
  HomeIcon,
  ClockIcon,
  CardIcon,
  MoreIcon,
  LogoutIconIcon,
  Graph,
  SettingsIcon,
  AppLogoNew,
} from "../../assets/images/svgs";
export default function Sidebar({ browserRouter, currentRoute }) {
  const {
    setreduceSidebarWidth,
    appReduceSidebarWidth,
    reduceSidebarWidth,
  } = useContext(LayoutContext);

  const [PublicationShow, SetPublicationShow] = useState(true);
  const [CategoriesShow, SetCategoriesShow] = useState(false);
  const [SortShow, SetSortShow] = useState(false);
  const [DateShow, SetDateShow] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const [PublicationsFilter, SetPublicationsFilter] = useState({
    all: true,
    newsPaper: false,
    magazine: false,
    books: false,
  });

  const [SortFilter, SetSortFilter] = useState({
    popular: true,
    recent: false,
  });

  const Logout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to logout from the Power2You service!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#006298",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Log me out!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        NotificationManager.success("Logout Successfully.");
        window.location.href = "/";
      }
    });
  };

  return (
    <div>
      <div
        className={`${
          appReduceSidebarWidth === true
            ? "sidebar-wrap"
            : "sidebar-wrap reduceSidebarWidth"
        }`}
      >
        <ul style={{ paddingBottom: "60px" }} className="sidebar-list">
          <span
            className={`${
              appReduceSidebarWidth === true
                ? "sidebar-header"
                : "sidebar-header moveAppLinksToCenter"
            }`}
            style={{ marginLeft: "-5px" }}
          >
            <span
              style={{
                marginRight: "20px",
                marginTop: "-10px",
                display: "flex",
                alignItems: "center",
                marginRight: "24px",
                marginLeft: "5px",
              }}
            >
              <span
                onClick={() => reduceSidebarWidth()}
                style={{ marginRight: "20px", marginTop: "-16px" }}
              >
                {toggleIcon}
              </span>{" "}
              <AppLogoNew />
            </span>
          </span>

          <li
            style={
              currentRoute === "/home" || currentRoute === "/home/tabs"
                ? { color: "#e3b451" }
                : { color: "white" }
            }
            // onClick={() => browserRouter("/home")}
            className={`${
              appReduceSidebarWidth === true ? "" : "moveAppLinksToCenter"
            }`}
            onClick={() => browserRouter(`/dashboard`)}
          >
            {" "}
            <span style={{ marginRight: "20px", marginTop: "-4px" }}>
              {
                <HomeIcon
                  activeRoute={
                    currentRoute === "/home" || currentRoute === "/home/tabs"
                      ? true
                      : false
                  }
                />
              }
            </span>
            Home
          </li>

          <li
            style={
              currentRoute === "/user_transations"
                ? { color: "#e3b451" }
                : { color: "white" }
            }
            onClick={() => browserRouter(`/transactions`)}
            className={`${
              appReduceSidebarWidth === true ? "" : "moveAppLinksToCenter"
            }`}
          >
            {" "}
            <span style={{ marginRight: "20px", marginTop: "-4px" }}>
              <ClockIcon
                activeRoute={
                  currentRoute === "/user_transations" ? true : false
                }
              />
            </span>
            Transactions
          </li>

          <li
            style={
              currentRoute === "/user_cards"
                ? { color: "#e3b451" }
                : { color: "white" }
            }
            // onClick={() => browserRouter("/user_cards")}
            className={`${
              appReduceSidebarWidth === true ? "" : "moveAppLinksToCenter"
            }`}
            onClick={() => browserRouter(`/wallet`)}
          >
            {" "}
            <span style={{ marginRight: "20px", marginTop: "-4px" }}>
              <CardIcon
                activeRoute={currentRoute === "/user_cards" ? true : false}
              />
            </span>
            Balance
          </li>

          {/* <li
            style={
              currentRoute === "/more"
                ? { color: "#e3b451" }
                : { color: "white" }
            }
            className={`${
              appReduceSidebarWidth === true ? "" : "moveAppLinksToCenter"
            }`}
            onClick={() => browserRouter(`/customers`)}
          >
            {" "}
            <span style={{ marginRight: "20px", marginTop: "-4px" }}>
              <MoreIcon
                activeRoute={currentRoute === "/more" ? "#e3b451" : null}
              />
            </span>
            Notificatons
          </li> */}

          <li
            style={
              currentRoute === "/more"
                ? { color: "#e3b451" }
                : { color: "white" }
            }
            className={`${
              appReduceSidebarWidth === true ? "" : "moveAppLinksToCenter"
            }`}
            onClick={() => browserRouter(`/settings`)}
          >
            {" "}
            <span style={{ marginRight: "20px", marginTop: "-4px" }}>
              <SettingsIcon
                activeRoute={currentRoute === "/more" ? "#e3b451" : null}
              />
            </span>
            Settings
          </li>
        </ul>
        <ul className="sidebar-list">
          <li
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              width: "155px",
              paddingLeft: "20px",
            }}
            className={`${
              appReduceSidebarWidth === true ? "" : "moveAppLinksToCenter"
            }`}
            onClick={() => Logout()}
          >
            {" "}
            <span style={{ marginRight: "20px", marginTop: "7px" }}>
              <LogoutIconIcon
                activeRoute={currentRoute === "/more" ? "#e3b451" : null}
              />
            </span>
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
}
