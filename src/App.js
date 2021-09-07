import React, { useEffect } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import DefaultLayoutRoute from "./components/DefaultLayout/DefaultLayoutRoute";
import { NotificationContainer } from "react-notifications";
import { LayoutProvider } from "./context/layoutContext";
import { UserDataProvider } from "./context/userContext";
import "./App.css";
import Login from "./components/pages/auth/login";
import Register from "./components/pages/auth/register";
import ResetPassword from "./components/pages/auth/resetPassword";
import Dashboard from "./components/pages/dashboard/dashboard";
import Transactions from "./components/pages/Transactions/index";
import ForgotPassword from "./components/pages/auth/forgotPassword";
import ForgotPasswordMain from "./components/pages/auth/resetPasswordMain";
import Settings from "./components/pages/settings/index";
import Wallet from "./components/pages/wallet/index";
import Demo from "./demo";

const SiteRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/forgot_password" component={ForgotPassword} />
        <Route
          exact
          path="/reset_new_password/:id"
          component={ForgotPasswordMain}
        />
        <Route exact path="/reset_new_user_pass" component={ResetPassword} />
        <UserDataProvider>
          <LayoutProvider>
            <DefaultLayoutRoute
              exact
              path="/dashboard"
              component={Dashboard}
              pageName="Dashboard"
            />
            <DefaultLayoutRoute
              exact
              path="/transactions"
              component={Transactions}
              pageName="Transactions"
            />

            <DefaultLayoutRoute
              exact
              path="/Wallet"
              component={Wallet}
              pageName="Wallet"
            />

            <DefaultLayoutRoute
              exact
              path="/settings"
              component={Settings}
              pageName="Settings"
            />
          </LayoutProvider>
        </UserDataProvider>
      </Switch>
    </BrowserRouter>
  );
};
// accept_invite/:id
function App(props) {
  //DisableInspect()
  return (
    <React.Fragment>
      <NotificationContainer />
      <SiteRouter />
    </React.Fragment>
  );
}

export default App;
