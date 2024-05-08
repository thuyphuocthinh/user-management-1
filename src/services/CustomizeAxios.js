import axios from "axios";

const instance = axios.create({
  baseURL: "https://reqres.in",
});


// can thiep vao response truoc khi tra ra view
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
