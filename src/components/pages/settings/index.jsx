import React, { useState, useContext, useEffect } from "react";
import "./settings.css";
import Profile from "./profile";
import Services from "./services";
import Teams from "./teams";
import Webhooks from "./webHook";
import { UserDataContext } from "../../../context/userContext";
import { ClipLoader } from "react-spinners";
import { hideLoader, showLoader } from "../../helpers/loader";
import swal from "sweetalert";
import { NotificationManager } from "react-notifications";
import {
  httpGetMain,
  httpPatchMain,
  httpPost,
  httpPostMain,
} from "../../../helpers/httpMethods";
export default function Index() {
  const { user, loadingUser, status } = useContext(UserDataContext);
  const [activeTab, setActive] = useState("profile");
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  });

  const [teams, setTeams] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    userFullInfo: "",
  });
  const [teamInfo, setTeamInfo] = useState({});
  const [teamMode, setTeamMode] = useState("create");
  const [secretKey, setSecretKey] = useState("");
  const [team, setTeam] = useState([]);
  const [roles, setRoles] = useState([]);
  const [password, setpassword] = useState({
    current: "",
    newPass: "",
  });

  const [OpenChangePassword, setOpenChangePassword] = useState(false);
  const [OpenAddTeams, setOpenAddTeams] = React.useState(false);

  useEffect(() => {
    getTeams();
    Roles();
    Keys();
    generateKey();
    if (loadingUser == false) {
      setProfile({
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        email: user.email,
      });
    }
  }, [loadingUser]);

  const ToggleModal = () => {
    setOpenAddTeams(!OpenAddTeams);
  };
  const getTeams = async (id) => {
    const res = await httpGetMain(`merchant/members`);
    if (res) {
      if (res?.er) {
        return;
      }
      console.log(res);
      setTeam(res.data.staffs);
    }
  };

  const Keys = async (id) => {
    const res = await httpGetMain(`merchant/api_keys`);
    showLoader();
    if (res) {
      hideLoader();
      if (res?.er) {
        return;
      }
      console.log(res);
    }
  };

  const Roles = async () => {
    const res = await httpGetMain(`merchant_roles`);
    if (res) {
      if (res?.er) {
        return;
      }
      console.log(res);
      setRoles(res?.data?.companyRoles);
    }
  };

  const updatProfile = async () => {
    if (profile.phoneNumber == "") {
      return NotificationManager.warning("Phone Number is required");
    }

    if (profile.lastName == "") {
      return NotificationManager.warning(" last Name is required");
    }

    if (profile.firstName == "") {
      return NotificationManager.warning("first Name is required");
    }

    const data = {
      firstName: profile.firstName,
      lastName: profile.lastName,
      phoneNumber: profile.phoneNumber,
    };
    showLoader();
    let res = await httpPatchMain(`merchant/profile`, data);

    if (res) {
      hideLoader();
      if (res.er) {
        return NotificationManager.error(res.er.message);
      }
      swal({
        title: "Success",
        text: "Account updated successfully",
        icon: "success",
      });
    }
  };

  const editUser = (edit, data) => {
    setTeams({
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      email: data.user.email,
      role: data.user.roleId,
    });
    console.log(data);
    setTeamMode(edit);
    setTeamInfo(data);
    ToggleModal();
  };

  const generateKey = async () => {
    let res = await httpPostMain("merchant/generate_api_token");
    if (res) {
      if (res.er) {
        return;
      }
      setSecretKey(res.data.API_TOKEN);
    }
  };

  const saveTeams = async () => {
    // return console.log(teams);
    if (teams.email == "" && teamMode == "create") {
      return NotificationManager.warning("Email is required");
    }

    if (teams.lastName == "") {
      return NotificationManager.warning("last Name is required");
    }

    if (teams.firstName == "") {
      return NotificationManager.warning("first Name is required");
    }

    if (teams.role == "") {
      return NotificationManager.warning("Role is required");
    }
    let data = {};
    teamMode == "create"
      ? (data = {
          firstName: teams.firstName,
          lastName: teams.lastName,
          email: teams.email,
          roleId: teams.role,
        })
      : (data = {
          firstName: teams.firstName,
          lastName: teams.lastName,
          roleId: teams.role,
        });

    showLoader();
    let res =
      (await teamMode) == "create"
        ? httpPost(`merchant/member/create`, data)
        : httpPatchMain(`merchant/member/update/${teamInfo.id}`, data);

    if (res) {
      hideLoader();
      if (res.er) {
        return NotificationManager.error(res.er.message);
      }
      ToggleModal();
      if (teamMode == "create") {
        swal({
          title: "Success",
          text: "Invite Sent Successfully.",
          icon: "success",
        });
      }

      if (teamMode == "edit") {
        swal({
          title: "Success",
          text: "User data updated successfully.",
          icon: "success",
        });
      }
    }
  };

  const updatPassword = async () => {
    // return console.log(password);
    if (password.current == "") {
      return NotificationManager.warning("Current password is required");
    }

    if (password.newPass == "") {
      return NotificationManager.warning("New  password is required");
    }

    if (password.newPass == password.current) {
      return NotificationManager.warning(
        "New password must not be the same with old password"
      );
    }

    const data = {
      currentPassword: password.current,
      newPassword: password.newPass,
    };
    showLoader();
    let res = await httpPatchMain(`merchant/change_password`, data);

    if (res) {
      hideLoader();
      if (res.er) {
        return NotificationManager.error(res.er.message);
      }
      ToggleModalPass();
      swal({
        title: "Success",
        text: "Password updated successfully",
        icon: "success",
      });
    }
  };

  const ToggleModalPass = () => {
    setOpenChangePassword(!OpenChangePassword);
  };

  return (
    <div>
      {loadingUser ? (
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "30px",
          }}
        >
          <ClipLoader color="blue" loading={loadingUser} size={40} />
        </div>
      ) : (
        <div>
          <div className="settingstabWrap">
            <ul>
              <li
                onClick={() => setActive("profile")}
                className={`${
                  activeTab == "profile" ? "activeTabSettings" : ""
                }`}
              >
                <span>Profile</span>
              </li>
              {/* <li
            onClick={() => setActive("Services")}
            className={`${activeTab == "Services" ? "activeTabSettings" : ""}`}
          >
            <span>Services</span>{" "}
          </li> */}
              <li
                onClick={() => setActive("Teams")}
                className={`${activeTab == "Teams" ? "activeTabSettings" : ""}`}
              >
                <span>Teams</span>{" "}
              </li>
              <li
                onClick={() => setActive("Webhooks")}
                className={`${
                  activeTab == "Webhooks" ? "activeTabSettings" : ""
                }`}
              >
                <span>Api & Webhooks</span>{" "}
              </li>
            </ul>
          </div>

          <div className="activeTabContent">
            {activeTab == "profile" ? (
              <Profile
                profile={profile}
                setProfile={setProfile}
                updatProfile={updatProfile}
                setpassword={setpassword}
                password={password}
                updatPassword={updatPassword}
                setOpenChangePassword={setOpenChangePassword}
                OpenChangePassword={OpenChangePassword}
                ToggleModalPass={ToggleModalPass}
              />
            ) : (
              ""
            )}
            {activeTab == "Services" ? <Services /> : ""}
            {activeTab == "Teams" ? (
              <Teams
                setTeams={setTeams}
                Teams={teams}
                saveTeams={saveTeams}
                team={team}
                roles={roles}
                editUser={editUser}
                teamMode={teamMode}
                ToggleModal={ToggleModal}
                setOpenAddTeams={setOpenAddTeams}
                OpenAddTeams={OpenAddTeams}
              />
            ) : (
              ""
            )}
            {activeTab == "Webhooks" ? (
              <Webhooks status={status} secretKey={secretKey} />
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </div>
  );
}
