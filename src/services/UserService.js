// import axios from "axios";
import axios from "./CustomizeAxios";

const fetchAllUsers = async (page) => {
  try {
    const { data } = await axios.get(`/api/users?page=${page}`);
    return data;
  } catch (error) {
    console.log("Error lay danh sach nguoi dung: ", error);
  }
};

const postCreateUser = async (info) => {
  try {
    const { data } = await axios.post("/api/users", info);
    return data;
  } catch (error) {
    console.log("Error tao new user: ", error);
  }
};

const putUpdateUser = async (info) => {
  try {
    const { data } = await axios.put("/api/users/2", info);
    return data;
  } catch (error) {
    console.log("Error edit user: ", error);
  }
};

const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`/api/users/${id}`);
    return response;
  } catch (error) {
    console.log("Error delete user: ", error);
  }
};

const login = async (info) => {
  try {
    const response = await axios.post("/api/login", info);
    return response;
  } catch (error) {
    return error;
  }
};

const register = async (info) => {
  try {
    const response = await axios.post("/api/register", info);
    return response;
  } catch (error) {
    return error;
  }
};

export {
  fetchAllUsers,
  postCreateUser,
  putUpdateUser,
  deleteUser,
  login,
  register,
};
