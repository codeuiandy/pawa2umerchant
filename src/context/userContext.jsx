import React, { createContext, useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import "react-responsive-modal/styles.css";
import axios from "axios";
import { getLocalItem } from "../components/helpers/authService";
import { httpGetMain } from "../helpers/httpMethods";
export const UserDataContext = createContext();

export const UserDataProvider = (props) => {
  const [user, setUser] = useState();
  const [loadingUser, setLoadingUser] = useState(true);
  const [authError, setAuthError] = useState(false);
  useEffect(() => {
    validateUser();
  }, []);
  const validateUser = () => {
    let token = getLocalItem("token");
    //alert(lUser);
    if (token == undefined || token == null) {
      setLoadingUser(false);
      // window.location.href = "/";
    } else {
      // getUser(token);
    }
  };

  const getUser = async (id) => {
    const res = await httpGetMain(`merchant/get_user`);
    if (res) {
      if (res?.er) {
        setLoadingUser(false);
        setAuthError(true);
        return;
      }
      console.log(res);
      setAuthError(false);
      setLoadingUser(false);
      setUser(res.data);
    }
  };

  return (
    <UserDataContext.Provider value={{ user, loadingUser }}>
      {props.children}
    </UserDataContext.Provider>
  );
};
