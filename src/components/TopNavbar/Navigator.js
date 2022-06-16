import { useContext, useState, useEffect } from "react"
import { Nav, NavDropdown, Navbar, Container } from 'react-bootstrap';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Navbar.css"
import { isAutheticated } from "../auth/authhelper";
import { API } from "../../API";



const Navigator = ({ archive, setArchive, setSearch }) => {

  const [userData, setUserData] = useState(null);
  const [toggle, setToggle] = useState(false)
  const { token } = isAutheticated();

  let navigate = useNavigate();



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




  return (
    <div >
      <Navbar className="outerNavbar" expand="sm" fixed="top" collapseOnSelect>
        <Container style={{ display: "flex" }}>
          <Navbar.Brand className="mr-4" href="/">
            <h2>
              Sourcenode
            </h2>
          </Navbar.Brand>
          <Navbar.Toggle style={{ backgroundColor: "" }} aria-controls="basic-navbar-nav" />
          <Nav className="me-auto">
            <Nav.Link className="mt-2" onClick={() => setArchive(p => !p)}>
              <h5>
                {archive ? "Hide Archived" : "Show Archived"}
              </h5>
            </Nav.Link>
            <Nav.Link style={{ cursor: "default" }}>
              <div className="d-flex search_bar">
                <ion-icon name="search"></ion-icon>
                {/* <Search /> */}
                <input onChange={(e) => setSearch(e.target.value)} className="form-control search-input" type="search" placeholder='Search' aria-label="Search" />
              </div>
            </Nav.Link>
          </Nav>

          {(userData) && (
            <>
              <Nav>
                <li className="" style={{ float: "left", paddingRight: "5px" }}>
                  <Nav.Link href="#" onClick={() => {
                    window.localStorage.clear();
                    navigate("/")
                    window.location.reload();
                  }}>Logout</Nav.Link>
                </li>
                <Nav.Link className="">
                  <li className="text-center" >
                    <span className="p-2 avatar avatar-32 rounded bg-danger">{userData.firstName} {userData.lastName}
                    </span>
                  </li>
                </Nav.Link>
              </Nav>
            </>
          )}

          {/* </Navbar.Collapse> */}
        </Container >
      </Navbar >
    </div>
  )
}

export default Navigator
