/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

// type is either 'password' or 'data'
export const uploadmeme = async (data, type) => {
  try {
 
    const res = await axios({
      method: 'POST',
      url: "http://127.0.0.1:9000/api/v1/users/memeupload",
      data
    });
      console.log(res.data.status);
    if (res.data.status === 'success') {
      showAlert('success', ` uploaded successfully!`);
      window.location='/usermemes'
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
