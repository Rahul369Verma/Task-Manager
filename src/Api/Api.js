import axios from "axios";
import { API } from "../API";
import { isAutheticated } from "../components/auth/authhelper";

const callApi = async (url, data = null, method = "GET") => {
  const { token } = isAutheticated()
  try {
    const response = await axios({
      url,
      data: (data),
      method,
      headers: {
        "Access-Control-Allow-Origin": "*",
        // Authorization: `Bearer ${localStorage.getItem("id_token")}`,
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
const Api = {

  SignIn: (data) =>
    callApi(`${API}/api/signin`, data, "POST"),
  SignUp: (data) =>
    callApi(`${API}/api/signup`, data, "POST"),
  AddTask: (data) =>
    callApi(`${API}/api/tasks`, data, "POST"),
  GetTasks: () =>
    callApi(`${API}/api/tasks`),
  GetHotel: (id) =>
    callApi(`${API}/api/hotel/${id}`),
  ChangeState: (id, state) =>
    callApi(`${API}/api/tasks/state`, { id, state }, "PATCH"),
  ToggleArchive: (id, state) =>
    callApi(`${API}/api/tasks/archive`, { id }, "PATCH"),
  DeleteTask: (id) =>
    callApi(`${API}/api/tasks/${id}`, {}, "DELETE"),


};

export default Api;
