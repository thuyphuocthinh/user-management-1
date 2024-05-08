import React from "react";
import { Route } from "react-router-dom/cjs/react-router-dom";
import TableUsers from "../components/TableUsers";
import Home from "../components/Home";
import Login from "../components/Login";
import PrivateRoute from "./PrivateRoute";
import Signup from "../components/Signup";

export default function AppRoute() {
  return (
    <>
      <PrivateRoute exact path="/users" Component={TableUsers} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
    </>
  );
}
