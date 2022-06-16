import { Row, Form } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Api from "../../Api/Api";
const Login = () => {
  const [lodding, setLoading] = useState(null);
  const [data, setData] = useState({ email: "", password: "" });


  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }


  const formSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      // await login(
      //   emailRef.current.value,
      //   passwordRef.current.value
      // );
      // setTimeout(async () => {
      // const {data }= await Api.getUserAbout(username);
      const response = await Api.SignIn(data);
      await localStorage.setItem(
        "auth",
        JSON.stringify({
          token: response.token,
        })
      );
      window.location.reload();
      // localStorage.setItem(
      //   "userData",
      //   JSON.stringify({
      //     userData: response.userData
      //   })
      // );
      // localStorage.setItem("user",JSON.stringify(resp.data)) 
      // if (!isAuthenticated())history.push(`/${username}/details/payment`);
      // else history.push(`/${username}`);

      setLoading(null);
      // }, [2000])
    } catch (err) {
      setLoading(null);
      console.log("this is an error", err);
    }
  };

  // const LogOutHandler = async (e) => {
  //   try {
  //     e.preventDefault();
  //     setLoading(true);
  //     await logout();
  //     setLoading(null);
  //     localStorage.clear();
  //     history.push(`/${username}`);
  //   } catch (err) {
  //     setLoading(null);
  //     console.log("this is an error", err);
  //   }
  // };

  // const GoogleSubmitHandler = async () => {
  //   setLoading(true);
  //   await signUpWithGoogle();
  //   setTimeout(async()=>{
  //       const {data }= await Api.getUserAbout(username);
  //       const resp=await Api.SignUp({userID:data._id});
  //       localStorage.setItem("user",JSON.stringify(resp.data))
  //       if (!isAuthenticated())history.push(`/${username}/details/payment`);
  //       else history.push(`/${username}`);       
  //        setLoading(null);
  //     },[2000])
  // };

  return (
    <>
      <div
        className="auth-outer d-inline-flex flex-wrap w-100 justify-content-center align-items-center"
        style={{
          height: "100vh",
        }}
      >
        <div
          style={{ height: "600px", width: "570px" }}
          className="bg-light rounded d-inline-flex flex-column justify-content-center align-content-center flex-wrap"
        >
          <h3 className="mb-4">Sign In</h3>
          <Form>
            <Row>
              <label htmlFor="formGroupExampleInput" className="form-label">
                Email
              </label>
              <input
                onChange={handleChange}
                name="email"
                type="email"
                className="form-control"
                id="formEmail"
                placeholder="Enter Your Email"
              />
            </Row>
            <Row>
              <label htmlFor="formGroupExampleInput2" className="form-label">
                Password
              </label>
              <input
                onChange={handleChange}
                name="password"
                type="password"
                className="form-control"
                id="form-password"
                placeholder="Password"
              />
            </Row>
            <br />
            <Row>
              <button
                className="btn btn-outline-primary"
                style={{ width: "40%", margin: "auto" }}
                disabled={lodding}
                onClick={formSubmitHandler}
              >
                Submit
              </button>
            </Row>
          </Form>
          <div>
            {/* <br />
            <GoogleButton
              label="Sign In with Google"
              onClick={GoogleSubmitHandler}
              disabled={lodding}
            /> */}
            <div className="text-center text-dark mt-3">
              {" "}
              {/* Need An Account? <Link to={`/${username}/register`}>Sign Up</Link> */}
              Need An Account? <Link to={`/register`}>Sign Up</Link>
            </div>{" "}
            {/* <div
              className="text-center text-dark mt-3 bg-primary rounded"
              onClick={LogOutHandler}
            >
              Log Out
            </div>{" "} */}
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
};
export default Login;

