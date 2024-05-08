import React from "react";
import { Route } from "react-router-dom/cjs/react-router-dom";
import { Alert, Container } from "react-bootstrap";
import { history } from "../App";
export default function PrivateRoute(props) {
  const { Component, ...restParams } = props;
  if (localStorage.getItem("TOKEN")) {
    return (
      <Route
        {...restParams}
        render={(propsRoute) => {
          return <Component {...propsRoute} />;
        }}
      />
    );
  } else {
    return (
      <Route
        {...restParams}
        render={() => {
          return (
            <Container>
              <Alert className="mt-3" variant="danger">
                <Alert.Heading>Oh snap! You got an error</Alert.Heading>
                <p>Your don't have permission to access this route.</p>
                <button
                  className="btn btn-danger"
                  onClick={() => history.push("/login")}
                >
                  Login to continue
                </button>
              </Alert>
            </Container>
          );
        }}
      />
    );
  }
}
