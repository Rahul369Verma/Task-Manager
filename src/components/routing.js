import { Route, Routes, BrowserRouter as Router, } from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "axios";
import { isAutheticated } from "./auth/authhelper";
import { API } from "../API";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Loader from "./loader/loader";
import Register from "./Register/Register";
import Hotel from "./Hotel/Hotel";
import History from "./History/History";


const Routing = () => {
  const [userData, setUserData] = useState(null);
  const [subscription, setSubscription] = useState(null);

  const { token } = isAutheticated();


  useEffect(() => {
    const getUser = async () => {
      // let existanceData = JSON.parse(localStorage.getItem("userData"));
      // if (existanceData) {
      //   // console.log(existanceData.userData)
      //   setUserData(JSON.parse(localStorage.getItem("userData")).userData);
      if (!token) {
        setUserData(false)
        return;
      } else {
        try {
          console.log("requesting user data from server");
          const response = await axios.get(`${API}/api/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          // console.log(response.data)

          //setUserData(response.data.data);
          // localStorage.setItem(
          //   "userData",
          //   JSON.stringify({
          //     userData: response.data.data
          //   })
          // );
          setUserData(response.data.data);
        } catch (err) {
          console.log(err);
          setUserData(false)
        }
      }
    };
    getUser();
  }, [token]);


  //getting user profile

  return (
    <Router>
      <Routes>
        <Route exact path="/register" element={
          userData && userData._id ? <Home /> : (userData === false ? <Register /> : <Loader />)}
        />
        <Route exact path="/login"
          element={userData && userData._id ? <Home /> : (userData === false ? <Login /> : <Loader />)}
        />
        <Route exact path="/"
          element={userData && userData._id ? <Home /> : (userData === false ? <Login /> : <Loader />)}
        />
        <Route exact path="/history"
          element={userData && userData._id ? <History /> : (userData === false ? <Login /> : <Loader />)}
        />
        <Route exact path="/hotel/:id"
          element={userData && userData._id ? <Hotel /> : (userData === false ? <Login /> : <Loader />)}
        />
      </Routes>
    </Router>
  );
};
export default Routing;
