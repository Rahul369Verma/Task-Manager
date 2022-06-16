import { Row, Form } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Api from "../../Api/Api";

const Register = () => {

  const [lodding, setLoading] = useState(null);
  const [data, setData] = useState({ email: "", password: "", firstName: "", lastName: "" });

  const navigate = useNavigate();


  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const resp = await Api.SignUp(data);
      if (resp?.status === "OK") {
        await localStorage.setItem(
          "auth",
          JSON.stringify({
            token: resp.token,
          })
        );
      }
      navigate('/');
      console.log(resp);
      setLoading(null);
    }
    catch (e) {
      setLoading(null);
    }
  };

  return (
    <>
      <div
        className="auth-outer d-inline-flex flex-wrap w-100 justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div
          style={{ height: "600px", width: "570px" }}
          className="bg-light rounded d-inline-flex flex-column justify-content-center align-content-center flex-wrap"
        >
          <h3 className="mb-3">Sign Up</h3>
          <Form>
            <Row className="mb-1">
              <label htmlFor="formGroupExampleInput" className="form-label">
                First Name
              </label>
              <input
                name="firstName"
                type="email"
                className="form-control"
                id="formEmail"
                placeholder="Enter Your First Name"
                onChange={handleChange}
              />
            </Row>
            <Row className="mb-1">
              <label htmlFor="formGroupExampleInput" className="form-label">
                Last Name
              </label>
              <input
                name="lastName"
                type="email"
                className="form-control"
                id="formEmail"
                placeholder="Enter Your Last Name"
                onChange={handleChange}
              />
            </Row>
            <Row className="mb-1">
              <label htmlFor="formGroupExampleInput" className="form-label">
                Email
              </label>
              <input
                name="email"
                type="email"
                className="form-control"
                id="formEmail"
                placeholder="Enter Your Email"
                onChange={handleChange}
              />
            </Row>
            <Row className="mb-1">
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
          {/* <div>
            <br />
            <GoogleButton
              label="Sign Up with Google"
              onClick={GoogleSubmitHandler}
              disabled={lodding}
            />
          </div> */}
          <div className="text-center text-dark mt-3">
            {" "}
            All ready have an account?{" "}
            {/* <Link to={`/${username}/login`}>Log in</Link> */}
            <Link to={`/login`}>Log in</Link>

          </div>{" "}
        </div>
      </div>
      <div></div>
    </>
  );
};
export default Register;
