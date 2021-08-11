import React, { useEffect, useState } from "react";
import "./login.css";
import Logo from "../../../assets/imgF/logo.png";
import showPasswordImg from "../../../assets/imgF/Show.png";
import Symbol1 from "../../../assets/imgF/symbolAuth.png";
import Symbol2 from "../../../assets/imgF/symbolAuth2.png";
import { NotificationManager } from "react-notifications";
import swal from "sweetalert";
import {
  ValidateEmail,
  validatePassword,
} from "../../../helpers/validateInput";
import { httpPostMain, httpPatchMain } from "../../../helpers/httpMethods";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { AppLogo2, BackArrowLogin } from "../../../assets/images/svgs";
const override = css``;

const Login = ({ match, history, location }) => {
  const [userInput, setUserInput] = useState({
    oldPassword: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [OldshowPassword, setShowOldPassword] = useState(false);
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");
  useEffect(() => {}, []);

  const handleChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validateoldPassword = validatePassword(userInput.oldPassword);
    if (validatepassword != "Looks Good!") {
      return NotificationManager.warning(
        validateoldPassword,
        "Validation Warning",
        4000
      );
    }

    const validatepassword = validatePassword(userInput.password);
    if (validatepassword != "Looks Good!") {
      return NotificationManager.warning(
        validatepassword,
        "Validation Warning",
        4000
      );
    }
    const data = {
      email: userInput.email,
      password: userInput.password,
      domain: match.params.domain,
    };

    setLoading(true);
    //const res = await httpPostMain("auth/login", data);
    //if (res.status == "success") {
    // setLoading(false);
    // console.log(res?.status);
    // localStorage.setItem("user", JSON.stringify(res.data));
    // localStorage.setItem("token", res.data.token);
    // NotificationManager.success(res.data.message, "Success", 4000);
    // }
    setTimeout(() => {
      window.location.href = `/dashboard`;
    }, 2000);
    // else {
    //   console.log(res);
    //   setLoading(false);
    //   NotificationManager.error(res?.er?.message, "Error", 4000);
    // }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    const validateoldPassword = validatePassword(userInput.oldPassword);
    if (validateoldPassword != "Looks Good!") {
      return NotificationManager.warning(
        validateoldPassword,
        "Validation Warning",
        4000
      );
    }

    const validatepassword = validatePassword(userInput.password);
    if (validatepassword != "Looks Good!") {
      return NotificationManager.warning(
        validatepassword,
        "Validation Warning",
        4000
      );
    }
    let data = {
      currentPassword: userInput.oldPassword,
      newPassword: userInput.password,
    };
    const ref = new URLSearchParams(location.search).get("token");
    console.log(userInput);
    console.log(ref);
    const res = await httpPatchMain(`merchant/new/verify/${ref}`, data);
    if (res) {
      if (res?.er) {
        return;
      }
      NotificationManager.success(res.message);
      window.location.href = "/";
    }
  };

  return (
    <div className="auth-container codei-ui-andy-setDefaults">
      <div className="login-container">
        <div className="login-logo">
          {/* <img src={AlphaLogo} alt="" /> */} <AppLogo2 />
        </div>

        <form>
          <div className="Auth-header" style={{ marginBottom: "-5px" }}>
            <h3>Reset Password</h3>
            <p
              style={{
                textAlign: "center",
                marginTop: "-18px",
                marginBottom: "25px",
                fontSize: "13px",
              }}
            >
              Welcome <span style={{ color: "#000000" }}>Union Bank</span>, we
              noticed you are logging in for the first time, kindly reset your
              password.
            </p>
          </div>

          <div className="input-wrap">
            <label htmlFor="">Old Password</label>
            <input
              type={`${OldshowPassword ? "text" : "password"}`}
              onChange={handleChange}
              name="oldPassword"
              value={userInput.oldPassword}
            />
            <div className="passworEye">
              <img
                src={showPasswordImg}
                alt=""
                onClick={() => setShowOldPassword(!OldshowPassword)}
              />
            </div>
          </div>

          <div className="input-wrap">
            <label htmlFor="">New Password</label>
            <input
              type={`${showPassword ? "text" : "password"}`}
              onChange={handleChange}
              name="password"
              value={userInput.password}
            />
            <div className="passworEye">
              <img
                src={showPasswordImg}
                alt=""
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          </div>

          <div className="submit-auth-btn">
            <button disabled={loading} onClick={handleReset}>
              {" "}
              {loading ? (
                <ClipLoader
                  color={color}
                  loading={loading}
                  css={override}
                  size={30}
                />
              ) : (
                "Login to your account"
              )}
            </button>
          </div>
        </form>
      </div>
      <div className="forgotPasswordOption" onClick={() => history.goBack()}>
        <p>
          <BackArrowLogin />
          Back
        </p>
      </div>
    </div>
  );
};

export default Login;
