import icons from "../../icons/Micons";
import React, { useState } from "react";
import MaterialTable, { Column } from "material-table";
import { capitalize, Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
// import FormatDate from "../../../helpers/formatDate";
import { dateFormater } from "../../helpers/dateFormater";

export default function UserTransationTable({
  transations,
  singleTransationDetails,
}) {
  const getUsers = [
    {
      reference: "ID: 22739",
      customer: "Okeke Andrew",
      amount: "$767.50",
      service: "Electricity",
      status: "Completed",
      date: "Feb 2, 2019 19:28",
    },
    {
      reference: "ID: 22739",
      customer: "Okeke Andrew",
      amount: "$767.50",
      service: "Electricity",
      status: "Failed",
      date: "Feb 2, 2019 19:28",
    },
    {
      reference: "ID: 22739",
      customer: "Okeke Andrew",
      amount: "$767.50",
      service: "Electricity",
      status: "Completed",
      date: "Feb 2, 2019 19:28",
    },

    {
      reference: "ID: 22739",
      customer: "Okeke Andrew",
      amount: "$767.50",
      service: "Electricity",
      status: "Failed",
      date: "Feb 2, 2019 19:28",
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
          {
            title: "Reference ID",
            field: "reference",
          },

          { title: "Customer name", field: "customer" },

          { title: "Amount", field: "amount" },

          //   {
          //     title: "Service (filterable)",
          //     field: "service",
          //   },
          {
            title: "Status (filterable)",
            field: "status",
          },
          { title: "Date", field: "date" },
        ]}
        data={transations?.map((data) => {
          return {
            reference: (
              <div
                style={{ cursor: "pointer" }}
                onClick={() => singleTransationDetails(data)}
              >
                {capitalize(data.reference)}
              </div>
            ),
            customer: `${data?.firstName} ${data?.lastName}`,
            amount: `NGN ${data.amount}`,
            service: data.service,
            status: (
              <div
                style={
                  data.status == "pending"
                    ? { color: "#F16063" }
                    : { color: "#66CB9F" }
                }
              >
                {capitalize(data.status)}
              </div>
            ),
            date: dateFormater(data.createdAt),
          };
        })}
        title={`Transactions
        `}
      />
    </div>
  );
}
