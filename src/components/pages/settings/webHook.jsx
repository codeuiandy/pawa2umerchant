import React from "react";
import FileCopyIcon from "@material-ui/icons/FileCopy";
const Webhooks = ({ status }) => {
  return (
    <div>
      <div className="profileWrap" style={{ width: "500px" }}>
        <form action="">
          <p className="pagenameProflPawa">
            API Configuration - {status ? "Live" : "Demo"} mode
          </p>
          <div className="inputWrapPpPawa">
            <div className="inputWrapMainPawa" style={{ width: "100%" }}>
              <label htmlFor=""> {status ? "Live" : "Demo"} Secret Key </label>
              <input type="text" style={{ width: "100%" }} />
              <div className="copyToClipSett">
                <FileCopyIcon />
              </div>
            </div>
          </div>
          <div className="inputWrapPpPawa" style={{ width: "100%" }}>
            <div className="inputWrapMainPawa" style={{ width: "100%" }}>
              <label htmlFor="">{status ? "Live" : "Demo"} Webhook URL</label>
              <input type="text" style={{ width: "100%" }} />
              <div className="copyToClipSett">
                <FileCopyIcon />
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="saveChangesBtn" style={{ marginBottom: "40px" }}>
        <button>Save and continue</button>
      </div>
      <p style={{ textAlign: "center", marginBottom: "3px", fontSize: "13px" }}>
        Need help with your integration?
      </p>
      <p
        style={{
          color: "#0060AA",
          textAlign: "center",
          padding: "0",
          margin: "0",
          fontSize: "15px",
          cursor: "pointer",
        }}
      >
        Check out our API documentation
      </p>
    </div>
  );
};

export default Webhooks;
