import icons from "../../icons/Micons";
import React, { useState } from "react";
import MaterialTable, { Column } from "material-table";
import { capitalize, Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
// import FormatDate from "../../../helpers/formatDate";

export default function TeamsTable({ team, editUser }) {
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
        data={team?.map((data) => {
          return {
            customer: `${capitalize(data?.user?.firstName)} ${capitalize(
              data?.user?.lastName
            )}`,
            email: data?.user?.email,
            Roles: data?.user?.role?.name,
            status: (
              <div
                style={
                  data?.status == "pending"
                    ? { color: "#F16063" }
                    : { color: "#66CB9F" }
                }
              >
                {data?.status}
              </div>
            ),
            action: <div onClick={() => editUser("edit", data)}>Edit</div>,
          };
        })}
        title={`Teams`}
      />
    </div>
  );
}
