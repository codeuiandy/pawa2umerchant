import React, { useState } from "react";
import "./settings.css";
import Profile from "./profile";
import Services from "./services";
import Teams from "./teams";
import Webhooks from "./webHook";
export default function Index() {
  const [activeTab, setActive] = useState("profile");
  return (
    <div>
      <div className="settingstabWrap">
        <ul>
          <li
            onClick={() => setActive("profile")}
            className={`${activeTab == "profile" ? "activeTabSettings" : ""}`}
          >
            <span>Profile</span>
          </li>
          <li
            onClick={() => setActive("Services")}
            className={`${activeTab == "Services" ? "activeTabSettings" : ""}`}
          >
            <span>Services</span>{" "}
          </li>
          <li
            onClick={() => setActive("Teams")}
            className={`${activeTab == "Teams" ? "activeTabSettings" : ""}`}
          >
            <span>Teams</span>{" "}
          </li>
          <li
            onClick={() => setActive("Webhooks")}
            className={`${activeTab == "Webhooks" ? "activeTabSettings" : ""}`}
          >
            <span>Api & Webhooks</span>{" "}
          </li>
        </ul>
      </div>

      <div className="activeTabContent">
        {activeTab == "profile" ? <Profile /> : ""}
        {activeTab == "Services" ? <Services /> : ""}
        {activeTab == "Teams" ? <Teams /> : ""}
        {activeTab == "Webhooks" ? <Webhooks /> : ""}
      </div>
    </div>
  );
}
