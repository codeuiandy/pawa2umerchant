import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ClearIcon from "@material-ui/icons/Clear";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    // border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: "4px",
    width: "420px",
  },
}));
const Profile = () => {
  const classes = useStyles();
  const [OpenChangePassword, setOpenChangePassword] = useState(false);
  const ToggleModal = () => {
    setOpenChangePassword(!OpenChangePassword);
  };
  return (
    <div>
      <div className="profileWrap">
        <form onSubmit={(e) => e.preventDefault()}>
          <p className="pagenameProflPawa">Profile</p>
          <div className="inputWrapPpPawa">
            <div className="inputWrapMainPawa">
              <label htmlFor="">First Name </label>
              <input type="text" />
            </div>

            <div className="inputWrapMainPawa">
              <label htmlFor="">Last Name </label>
              <input type="text" />
            </div>
          </div>
          <div className="inputWrapPpPawa">
            <div className="inputWrapMainPawa">
              <label htmlFor="">Email Address </label>
              <input type="text" />
            </div>

            <div className="inputWrapMainPawa">
              <label htmlFor="">Phone Number</label>
              <input type="text" />
            </div>
          </div>
          <div className="technicalSkillPpawa">
            {" "}
            <p>Technical Skill</p> <input type="checkbox" />
          </div>

          <div className="changepassPawa2u">
            <p>Password</p>{" "}
            <button onClick={ToggleModal}>Change Password</button>
          </div>
        </form>
      </div>
      <div className="saveChangesBtn">
        <button>Save and continue</button>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={OpenChangePassword}
        onClose={ToggleModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={OpenChangePassword}>
          <div className={classes.paper}>
            <div
              className="cancelModalIcon"
              style={{ cursor: "pointer" }}
              onClick={ToggleModal}
            >
              <ClearIcon />
            </div>
            <h2 style={{ fontSize: "18px", fontWeight: "500" }}>
              Reset Password
            </h2>
            <hr
              style={{
                border: "1px solid #F1F1F1",
                marginBottom: "10px",
                marginTop: "10px",
              }}
            />
            <div className="addAdminUser">
              <form action="">
                <div className="inputWrapPpPawa">
                  <div className="inputWrapMainPawa" style={{ width: "100%" }}>
                    <label htmlFor="">Old password </label>
                    <input type="text" style={{ width: "100%" }} />
                  </div>
                </div>

                <div className="inputWrapPpPawa">
                  <div className="inputWrapMainPawa" style={{ width: "100%" }}>
                    <label htmlFor="">New password </label>
                    <input type="text" style={{ width: "100%" }} />
                  </div>
                </div>
              </form>
            </div>
            <div className="saveChangesBtn">
              <button style={{ width: "100%" }}>Reset</button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default Profile;
