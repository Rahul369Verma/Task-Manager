import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Container, Dropdown } from "react-bootstrap";
import Navigator from '../TopNavbar/Navigator'
import AddHotel from '../AddHotel/AddHotel';
import Api from '../../Api/Api.js';
import "./Home.css"
import NestedDropdown from './NextedDropdown';
import swal from 'sweetalert';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <div
    ref={ref}
    onClick={e => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    <ion-icon size="large" name="more"></ion-icon>
  </div>
));


function Home() {

  const [tasks, setTasks] = useState([])
  const [filterTasks, setFilterTasks] = useState([])

  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [archive, setArchive] = useState(false);




  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const renderTooltip = (props) => (
  //   <Tooltip id="button-tooltip" {...props}>
  //     This property offers great value (measured in terms of - for example - price, star rating, review score and facilities )
  //     compare to similar properties within this market.
  //   </Tooltip>
  // );

  // const hotelClick = (hotel) => {
  // navigate(`/hotel/${hotel._id}`, { replace: true })
  // }

  // const newHotelAdd = (data, images, id) => {
  // setHotels(prev => ([...prev, { ...data, images, "_id": id }]))
  // }
  const getData = async () => {
    try {
      const { data } = await Api.GetTasks();
      setTasks(data)
    } catch (e) {
      console.log(e);
    }
  }

  const changeState = async (id, state) => {
    try {
      const { data } = await Api.ChangeState(id, state);
      console.log("responseeeeeee", data);
      getData()
      swal("Success", "Change Task State to " + state, "success")
      handleClose()
    } catch (e) {
      console.log(e);
      if (e.response?.data?.message) {
        swal('Error', e.response?.data?.message, 'error')
      } else {
        swal('Error', "Unable to change state", 'error')
      }
    }
  }

  const toggleArchive = async (id) => {
    try {
      const { data } = await Api.ToggleArchive(id);
      console.log("responseeeeeee", data);
      getData()
      swal("Success", "Change Task Archive Status", "success")
      handleClose()
    } catch (e) {
      console.log(e);
      if (e.response?.data?.message) {
        swal('Error', e.response?.data?.message, 'error')
      } else {
        swal('Error', "Unable to change state", 'error')
      }
    }
  }

  const deleteTask = async (id) => {
    try {
      const { data } = await Api.DeleteTask(id);
      getData()
      swal("Success", "Task Deleted Successfully", "success")
      handleClose()
    } catch (e) {
      console.log(e);
      if (e.response?.data?.message) {
        swal('Error', e.response?.data?.message, 'error')
      } else {
        swal('Error', "Unable to change state", 'error')
      }
    }
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await Api.GetTasks();
        setTasks(data)
      } catch (e) {
        console.log(e);
      }
    }
    getData();
  }, [])

  useEffect(() => {
    const filterData = async () => {
      const newData = await tasks.filter((t) => t.title.toLowerCase().includes((search).toLowerCase()));
      setFilterTasks(newData)
    }
    filterData()
  }, [search, tasks])


  return (
    <div>
      {/* <ion-icon name="clipboard"></ion-icon> */}
      {/* <ion-icon name="paper"></ion-icon> */}
      {/* <ion-icon name="checkbox-outline"></ion-icon> */}
      <Navigator archive={archive} setArchive={setArchive} setSearch={setSearch} />
      <div className='px-5' style={{ paddingTop: "6%", backgroundColor: "#F9F9F9", minHeight: "100vh" }}>
        <div className='row mb-4'>
          <div className='col-6'>
            <h2>
              Tasks
            </h2>
          </div>
          <div className='col-6 text-end pe-5'>
            <button className='btn btn-info' onClick={handleShow}>Add Task</button>
            <AddHotel handleClose={handleClose} show={show} getData={getData} />
          </div>
        </div>
        <div className='row g-5'>

          <div className="col-4">
            <div className="radius todo" style={{ minHeight: "" }}>
              <div className='d-flex py-3 ms-5'>
                <div className='me-4 mt-1'>
                  <ion-icon style={{ color: "grey" }} name="clipboard" size="large"></ion-icon>
                </div>
                <h2 className='text-secondary' style={{ fontWeight: "700" }}>To Do</h2>
              </div>
              <div className='w-100 pt-5 pb-4' style={{ backgroundColor: "white", minHeight: "40vh", borderBottomLeftRadius: "40px", borderBottomRightRadius: "40px" }}>
                {filterTasks.map((task, index) => {
                  if (task.state === "todo") {
                    if (task.archive && !archive) {
                      return null
                    }
                    return <div key={index} className='todo p-3 m-3'>
                      <div className='d-flex justify-content-between'>
                        <h3 className='text-secondary'>{task.title}</h3>
                        <div className='text-secondary' type="button">
                          <Container>
                            <Dropdown autoClose="outside">
                              <Dropdown.Toggle as={CustomToggle}>
                              </Dropdown.Toggle> <Dropdown.Menu>
                                <NestedDropdown title="Send To">
                                  <Dropdown.Item disabled={true} onClick={() => changeState(task._id, "todo")}>To Do</Dropdown.Item>
                                  <Dropdown.Item onClick={() => changeState(task._id, "inprogress")}>In Progress</Dropdown.Item>
                                  <Dropdown.Item onClick={() => changeState(task._id, "done")}>Done</Dropdown.Item>
                                </NestedDropdown>
                                <Dropdown.Item onClick={() => deleteTask(task._id)}>Delete</Dropdown.Item>
                                <Dropdown.Item onClick={() => toggleArchive(task._id)}>Archive</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </Container>
                        </div>
                      </div>
                      <div style={{ wordWrap: "break-word" }}>
                        {task.description}
                      </div>
                    </div>
                  }
                  return null
                })}
              </div>
            </div>
          </div>

          <div className="col-4">
            <div className="radius inprogress" style={{ minHeight: "" }}>
              <div className='d-flex py-3 ms-5'>
                <div className='me-4 mt-1'>
                  <ion-icon style={{ color: "grey" }} name="paper" size="large"></ion-icon>
                </div>
                <h2 className='text-secondary' style={{ fontWeight: "700" }}>In Progress</h2>
              </div>
              <div className='w-100 pt-5 pb-4' style={{ backgroundColor: "white", minHeight: "40vh", borderBottomLeftRadius: "40px", borderBottomRightRadius: "40px" }}>
                {filterTasks.map((task, index) => {
                  if (task.state === "inprogress") {
                    if (task.archive && !archive) {
                      return null
                    }
                    return <div key={index} className='inprogress p-3 m-3'>
                      <div className='d-flex justify-content-between'>
                        <h3 className='text-secondary'>{task.title}</h3>
                        <div className='text-secondary' type="button">
                          <Container>
                            <Dropdown autoClose="outside">
                              <Dropdown.Toggle as={CustomToggle}>
                              </Dropdown.Toggle> <Dropdown.Menu>
                                <NestedDropdown title="Send To">
                                  <Dropdown.Item onClick={() => changeState(task._id, "todo")}>To Do</Dropdown.Item>
                                  <Dropdown.Item disabled={true} onClick={() => changeState(task._id, "inprogress")}>In Progress</Dropdown.Item>
                                  <Dropdown.Item onClick={() => changeState(task._id, "done")}>Done</Dropdown.Item>
                                </NestedDropdown>
                                <Dropdown.Item onClick={() => deleteTask(task._id)}>Delete</Dropdown.Item>
                                <Dropdown.Item onClick={() => toggleArchive(task._id)}>Archive</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </Container>
                        </div>
                      </div>
                      <div style={{ wordWrap: "break-word" }}>
                        {task.description}
                      </div>
                    </div>
                  }
                  return null
                })}
              </div>
            </div>
          </div>

          <div className="col-4">
            <div className="radius done" style={{ minHeight: "" }}>
              <div className='d-flex py-3 ms-5'>
                <div className='me-4 mt-1'>
                  <ion-icon style={{ color: "grey" }} name="checkbox-outline" size="large"></ion-icon>
                </div>
                <h2 className='text-secondary' style={{ fontWeight: "700" }}>Done</h2>
              </div>
              <div className='w-100 pt-5 pb-4' style={{ backgroundColor: "white", minHeight: "40vh", borderBottomLeftRadius: "40px", borderBottomRightRadius: "40px" }}>
                {filterTasks.map((task, index) => {
                  if (task.state === "done") {
                    if (task.archive && !archive) {
                      return null
                    }
                    return <div key={index} className='done p-3 m-3'>
                      <div className='d-flex justify-content-between'>
                        <h3 className='text-secondary'>{task.title}</h3>
                        <div className='text-secondary' type="button">
                          <Container>
                            <Dropdown autoClose="outside">
                              <Dropdown.Toggle as={CustomToggle}>
                              </Dropdown.Toggle> <Dropdown.Menu>
                                <NestedDropdown title="Send To">
                                  <Dropdown.Item onClick={() => changeState(task._id, "todo")}>To Do</Dropdown.Item>
                                  <Dropdown.Item onClick={() => changeState(task._id, "inprogress")}>In Progress</Dropdown.Item>
                                  <Dropdown.Item disabled={true} onClick={() => changeState(task._id, "done")}>Done</Dropdown.Item>
                                </NestedDropdown>
                                <Dropdown.Item onClick={() => deleteTask(task._id)}>Delete</Dropdown.Item>
                                <Dropdown.Item onClick={() => toggleArchive(task._id)}>Archive</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </Container>
                        </div>
                      </div>
                      <div style={{ wordWrap: "break-word" }}>
                        {task.description}
                      </div>
                    </div>
                  }
                  return null
                })}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div >
  )
}

export default Home
