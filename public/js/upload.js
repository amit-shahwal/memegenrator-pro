/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

// type is either 'password' or 'data'
export const uploadmeme = async (data, type) => {
  try {
      console.log(data);
    const res = await axios({
      method: 'POST',
      url: "/api/v1/users/memeupload",
      data
    });
     // console.log(res.data.status);
    if (res.data.status === 'success') {
      showAlert('success', ` uploaded successfully!`);
      window.location='/usermemes'
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
