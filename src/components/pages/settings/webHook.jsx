import React from "react";
import FileCopyIcon from "@material-ui/icons/FileCopy";
const Webhooks = () => {
  return (
    <div>
      <div className="profileWrap">
        <form action="">
          <p className="pagenameProflPawa">API Configuration - Live mode</p>
          <div className="inputWrapPpPawa">
            <div className="inputWrapMainPawa">
              <label htmlFor="">Live Secret Key </label>
              <input type="text" />
              <div className="copyToClipSett">
                <FileCopyIcon />
              </div>
            </div>

            <div className="inputWrapMainPawa">
              <label htmlFor="">Live Public Key </label>
              <input type="text" />
              <div className="copyToClipSett">
                <FileCopyIcon />
              </div>
            </div>
          </div>
          <div className="inputWrapPpPawa">
            <div className="inputWrapMainPawa">
              <label htmlFor="">Live Callback URL </label>
              <input type="text" />
              <div className="copyToClipSett">
                <FileCopyIcon />
              </div>
            </div>

            <div className="inputWrapMainPawa">
              <label htmlFor="">Live Webhook URL</label>
              <input type="text" />
              <div className="copyToClipSett">
                <FileCopyIcon />
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="profileWrap">
        <form action="">
          <p className="pagenameProflPawa">API Configuration - Test mode</p>
          <div className="inputWrapPpPawa">
            <div className="inputWrapMainPawa">
              <label htmlFor="">Live Secret Key </label>
              <input type="text" />
              <div className="copyToClipSett">
                <FileCopyIcon />
              </div>
            </div>

            <div className="inputWrapMainPawa">
              <label htmlFor="">Live Public Key </label>
              <input type="text" />
              <div className="copyToClipSett">
                <FileCopyIcon />
              </div>
            </div>
          </div>
          <div className="inputWrapPpPawa">
            <div className="inputWrapMainPawa">
              <label htmlFor="">Live Callback URL </label>
              <input type="text" />
              <div className="copyToClipSett">
                <FileCopyIcon />
              </div>
            </div>

            <div className="inputWrapMainPawa">
              <label htmlFor="">Live Webhook URL</label>
              <input type="text" />
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
