import React, { useContext, useState, useEffect } from "react";
import "./dashboard.scss";
import "./dashcards/pieChartCard/pieChartCard.scss";
import LineChartCard from "./dashcards/lineChartCard";
import PieChartCard from "./dashcards/pieChartCard";
import TotalCard from "./dashcards/totalCard";
import ProgressBar from "./dashcards/progressBar";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  DashboardIcon1,
  DashboardIcon2,
  DashboardIcon3,
} from "../../../assets/images/svgs";
import { UserDataContext } from "../../../context/userContext";
import { capitalize } from "@material-ui/core";
import { ClipLoader } from "react-spinners";

const AgentDashboard = () => {
  const { user, loadingUser } = useContext(UserDataContext);
  return (
    <>
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
          <div className="dashboard">
            <h3
              className="greeting"
              style={{ marginBottom: "10px !important" }}
            >
              Hi, {user ? capitalize(user.firstName) : ""}
            </h3>
            <div className="charts">
              <div className="top">
                <div className="dashboardHomeCards">
                  <div className="dashboardHomeCardsIn">
                    <div className="dashboardIconq1">
                      <DashboardIcon1 />
                    </div>
                    <div className="dashBordDatDeyj">
                      <h2>Total orders</h2>
                      <p>$351.02</p>
                      <span>+24% this month</span>
                    </div>
                  </div>
                  <div className="dashboardHomeCardsIn">
                    <div
                      className="dashboardIconq1"
                      style={{ background: "#f2984a54" }}
                    >
                      <DashboardIcon2 />
                    </div>
                    <div className="dashBordDatDeyj">
                      <h2>Today</h2>
                      <p>$351.02</p>
                      <span>+24% this month</span>
                    </div>
                  </div>
                  <div className="dashboardHomeCardsIn">
                    <div
                      className="dashboardIconq1"
                      style={{ background: "#DAE2FF" }}
                    >
                      <DashboardIcon3 />
                    </div>
                    <div className="dashBordDatDeyj">
                      <h2>This week</h2>
                      <p>$351.02</p>
                      <span>+24% this month</span>
                    </div>
                  </div>
                </div>
              </div>
              <LineChartCard />
            </div>
            <div className="side-bar">
              {/* <TotalCard title="Total Tickets" value={57} color={"#662D91"} />
          <TotalCard title="Assigned Tickets" value={57} color={"#51B74F"} />
          <TotalCard title="Overdue Tickets" value={50} color={"#F40D0D"} /> */}

              {/* sidebar progress bars */}
              <div className="progress-bars">
                <div className="top-section">
                  <h3
                    style={{
                      borderBottom: "1px solid #EDF2F7",
                      paddingBottom: "20px",
                      fontSize: "14px",
                    }}
                  >
                    Balance
                  </h3>
                  <div className="dashboardBalance">
                    <h2>N105.55</h2>
                    <button>History</button>
                    <button>Top up Balance</button>
                  </div>
                </div>
                {/* <ProgressBar title="Complaints" value={10} color={"#000080"} />
            <ProgressBar title="Enquiry" value={15} color={"#51B74F"} />
            <ProgressBar title="Request" value={28} color={"#F40D0D"} />
            <ProgressBar
              title="Double deduction"
              value={10}
              color={"#662D91"}
            />
            <ProgressBar title="Service pricing" value={10} color={"#0067DD"} />
            <ProgressBar
              title="Account statement"
              value={10}
              color={"#FEAE3B"}
            /> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AgentDashboard;
