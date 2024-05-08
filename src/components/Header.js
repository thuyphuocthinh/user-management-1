import React, { Fragment } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import { history } from "../App";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { LOG_OUT } from "../redux/actionType";

export default function Header(props) {
  const { isLogin } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  const logout = () => {
    localStorage.removeItem("TOKEN");
    dispatch({
      type: LOG_OUT,
    });
    toast.success("Logout successfully");
    history.push("/");
  };
  return (
    <Fragment>
      <Navbar expand="md" className="bg-body-tertiary">
        <Container>
          <NavLink to="/" className="fw-bold" onClick={history.push("/home")}>
            <h2 className="m-0 p-0">TPT</h2>
          </NavLink>
          {isLogin ? (
            <p className="p-0 m-0 d-md-none d-block">
              Welcome <strong>eve.holt@reqres.in</strong>
            </p>
          ) : (
            ""
          )}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-md-3 flex-md-row flex-column align-items-md-center w-100">
              <NavLink
                exact
                to="/home"
                activeStyle={{
                  fontWeight: "bold",
                }}
                className="px-2 py-2"
                onClick={history.push("/home")}
              >
                Home
              </NavLink>
              <NavLink
                exact
                activeStyle={{
                  fontWeight: "bold",
                }}
                to={"/users"}
                className="px-2 py-2"
                onClick={history.push("/users")}
              >
                Users
              </NavLink>
              <div className="ms-md-auto d-md-flex align-items-center">
                {isLogin ? (
                  <p className="p-0 m-0 d-md-block d-none">
                    Welcome <strong>eve.holt@reqres.in</strong>
                  </p>
                ) : (
                  ""
                )}
                <NavDropdown
                  className="px-2 ms-auto"
                  title="Actions"
                  id="basic-nav-dropdown"
                >
                  {isLogin ? (
                    <NavDropdown.Item>
                      <span className="d-block w-100" onClick={logout}>
                        Logout
                      </span>
                    </NavDropdown.Item>
                  ) : (
                    <>
                      <NavDropdown.Item>
                        <NavLink
                          to="/login"
                          className="d-block w-100"
                          onClick={() => {
                            history.push("/login");
                          }}
                          activeStyle={{
                            fontWeight: "bold",
                          }}
                        >
                          Login
                        </NavLink>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <NavLink
                          to="/signup"
                          className="d-block w-100"
                          onClick={() => {
                            history.push("/signup");
                          }}
                          activeStyle={{
                            fontWeight: "bold",
                          }}
                        >
                          Signup
                        </NavLink>
                      </NavDropdown.Item>
                    </>
                  )}
                </NavDropdown>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
}
