import React from "react";
import TeamsTable from "./teamsTable";
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
export default function Teams() {
  const classes = useStyles();
  const [OpenAddTeams, setOpenAddTeams] = React.useState(false);
  const ToggleModal = () => {
    setOpenAddTeams(!OpenAddTeams);
  };
  return (
    <div className="teamsSeactionSettings">
      <div className="teamsHeader">
        <p>Team members </p>
        <div className="teamsBtnAction">
          <button>Permissions</button>
          <button
            style={{ background: "#0A1857", color: "white" }}
            onClick={ToggleModal}
          >
            Invite members
          </button>
        </div>
      </div>
      <TeamsTable ToggleModal={ToggleModal} />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={OpenAddTeams}
        onClose={ToggleModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={OpenAddTeams}>
          <div className={classes.paper}>
            <div
              className="cancelModalIcon"
              style={{ cursor: "pointer" }}
              onClick={ToggleModal}
            >
              <ClearIcon />
            </div>
            <h2 style={{ fontSize: "18px", fontWeight: "500" }}>
              Add admin user
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
                <div className="inputWrapPpPawa" style={{ width: "100%" }}>
                  <div className="inputWrapMainPawa" style={{ width: "48%" }}>
                    <label htmlFor="">First Name </label>
                    <input type="text" style={{ width: "100%" }} />
                  </div>

                  <div className="inputWrapMainPawa" style={{ width: "48%" }}>
                    <label htmlFor="">Last Name </label>
                    <input type="text" style={{ width: "100%" }} />
                  </div>
                </div>
                <div className="inputWrapPpPawa">
                  <div className="inputWrapMainPawa" style={{ width: "100%" }}>
                    <label htmlFor="">Email Address </label>
                    <input type="text" style={{ width: "100%" }} />
                  </div>
                </div>

                <div className="inputWrapPpPawa">
                  <div className="inputWrapMainPawa" style={{ width: "100%" }}>
                    <label htmlFor="">Role </label>
                    <select name="" id="" style={{ width: "100%" }}>
                      <option value="">Select role</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
            <div className="saveChangesBtn">
              <button style={{ width: "100%" }}>Save and continue</button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
