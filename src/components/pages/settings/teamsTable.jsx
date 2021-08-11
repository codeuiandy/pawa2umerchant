import icons from "../../icons/Micons";
import React, { useState } from "react";
import MaterialTable, { Column } from "material-table";
import { capitalize, Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
// import FormatDate from "../../../helpers/formatDate";

export default function TeamsTable() {
  const getUsers = [
    {
      customer: "Okeke Andrew",
      amount: "bill.sanders@example.com",
      service: "Admin",
      status: "Enabled",
      date: "Change role",
    },
    {
      customer: "Okeke Andrew",
      amount: "bill.sanders@example.com",
      service: "Admin",
      status: "Disabled",
      date: "Change role",
    },
    {
      customer: "Okeke Andrew",
      amount: "bill.sanders@example.com",
      service: "Admin",
      status: "Enabled",
      date: "Change role",
    },

    {
      customer: "Okeke Andrew",
      amount: "bill.sanders@example.com",
      service: "Admin",
      status: "Disabled",
      date: "Change role",
    },
  ];
  return (
    <div classaction="table-wrap border styleTable">
      <MaterialTable
        components={{
          Container: (props) => <Paper {...props} elevation={0} />,
        }}
        icons={icons}
        options={{
          exportButton: true,
        }}
        columns={[
          { title: "Full Name", field: "customer" },

          { title: "Email", field: "email" },

          {
            title: "Roles (filterable)",
            field: "Roles",
          },
          {
            title: "Status (filterable)",
            field: "status",
          },
          { title: "Action", field: "action" },
        ]}
        data={getUsers?.map((data) => {
          return {
            customer: capitalize(data.customer),
            email: data.amount,
            Roles: data.service,
            status: (
              <div
                style={
                  data.status == "Disabled"
                    ? { color: "#F16063" }
                    : { color: "#66CB9F" }
                }
              >
                {data.status}
              </div>
            ),
            action: data.date,
          };
        })}
        // title={`User Management`}
      />
    </div>
  );
}
