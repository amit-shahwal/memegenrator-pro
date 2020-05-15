//const axios = require("axios");
//export the login function
import axios from "axios";
import { showAlert } from "./alert";
export const login = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/login",
      data: {
        email: email,
        password: password,
      },
    });
   // console.log(res.data.status);

    if (res.data.status === "success") {
      showAlert("success", "Logged in successfully!");
      window.location = "/usermemes";
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "/api/v1/users/logout",
    });
    if (res.data.status === "success") window.location='/login';
  } catch (err) {
    showAlert("error", "error in logging out");
  }
};
export const signup = async (name, email, password, confirmPassword) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/signup",
      data: {
        name,
        email,
        password,
        confirmPassword,
      },
    });
   // console.log(res.data.status);

    if (res.data.status === 'success') {
      showAlert('success', 'singed up!');
      showAlert('success','Proceeding to your home page');
      window.setTimeout(() => {
        location.assign('/usermemes');
      }, 1500);
     }
  } catch (err) {
    showAlert("error", err.response.data.message);
  //  console.log(err.response.data.message);
  }
};
