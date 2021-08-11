
import React, { useState } from "react";
import Search from "@material-ui/icons/Search"
import ViewColumn from "@material-ui/icons/ViewColumn"
import SaveAlt from "@material-ui/icons/SaveAlt"
import ChevronLeft from "@material-ui/icons/ChevronLeft"
import ChevronRight from "@material-ui/icons/ChevronRight"
import FirstPage from "@material-ui/icons/FirstPage"
import LastPage from "@material-ui/icons/LastPage"
import Check from "@material-ui/icons/Check"
import FilterList from "@material-ui/icons/FilterList"
import Remove from "@material-ui/icons/Remove"
import DeleteIcon from "@material-ui/icons/Delete";
import MaterialTable, { Column } from 'material-table';

const icons= {
  Clear: () => <DeleteIcon />,
    Export: () => <SaveAlt />,
    Filter: () => <FilterList /> ,
    FirstPage: () => <FirstPage />,
    LastPage: () => <LastPage />,
    NextPage: () => <ChevronRight />,
    PreviousPage: () => <ChevronLeft />,
    Search: () => <Search />,
    ThirdStateCheck: () => <Remove />,
    ViewColumn: () => <ViewColumn />,
    DetailPanel: () => <ChevronRight />,
   
  }

  export default icons