import { API } from '../../API';
import axios from 'axios'





export const isAutheticated = () => {
  if (typeof window == "undefined") {
    return true;
  }
  if (localStorage.getItem("auth")) {
    //return localStorage.getItem("auth");
    return JSON.parse(localStorage.getItem("auth"));
  } else {
    //console.log(JSON.parse(localStorage.getItem("auth")));
    return false;
  }
};

export const user = async () => {
  if (localStorage.getItem("auth")) {
    const { token } = JSON.parse(localStorage.getItem("auth"))
    try {

      const response = await axios
        .get(`${API}/api/client`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        return response.data.data
    } catch (err) {
      console.log(err);
      return
    }
  } else {
    return false
  }

}

export const signout = () => {
  localStorage.removeItem("auth");
  localStorage.removeItem("userData");
  window.location.reload();
  return true;
};

