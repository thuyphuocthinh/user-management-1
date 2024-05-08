import React, { Fragment, useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { history } from "../App";
import { login } from "../services/UserService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { LOG_IN } from "../redux/actionType";

export default function Login() {
  const dispatch = useDispatch();
  const [showLoading, setShowLoading] = useState(false);
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (localStorage.getItem("TOKEN")) {
      history.push("/");
    }
  }, []);
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let result;
    setShowLoading(true);
    if (info.email && info.password) {
      await login(info)
        .then((res) => (result = res))
        .catch((err) => (result = err.response));
      if (result.status === 200) {
        toast.success("Login successfully");
        localStorage.setItem("TOKEN", result.data.token);
        dispatch({
          type: LOG_IN,
        });
        history.push("/home");
      } else {
        toast.error(result.response.data.error);
      }
    } else {
      toast.error("Email and Password are required");
    }
    setShowLoading(false);
  };
  return (
    <Container
      style={{ height: "90vh" }}
      className="d-flex justify-content-between align-items-center"
    >
      <div className="login-container">
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleSubmit} className="mb-4">
          <div>
            <div className="mb-3">
              <input
                type="email"
                id="email"
                className="form-control w-100"
                required
                placeholder="Email"
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 position-relative">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control w-100"
                required
                placeholder="Password"
                id="password"
                onChange={handleChange}
                name="password"
              />
              <span
                className="position-absolute eye"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {!showPassword ? (
                  <i className="fa-solid fa-eye-slash"></i>
                ) : (
                  <i className="fa-solid fa-eye"></i>
                )}
              </span>
            </div>
            <div>
              <button
                disabled={!info.email || !info.password}
                type="submit"
                className={`btn btn-primary w-100 ${
                  !info.email && !info.password ? "disabled" : ""
                }`}
              >
                {showLoading ? (
                  <i className="fa-solid fa-rotate loading" />
                ) : (
                  ""
                )}
                <span className={`{${showLoading} ? ""ms-2"} : ""`}>
                  {" "}
                  Login
                </span>
              </button>
            </div>
          </div>
        </form>
        <hr />
        <p
          className="text-center"
          onClick={() => {
            history.push("/signup");
          }}
          style={{ cursor: "pointer" }}
        >
          <i className="fa-solid fa-angles-left"></i>
          <span className="ms-2">Register</span>
        </p>
      </div>
    </Container>
  );
}
