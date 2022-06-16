import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import swal from 'sweetalert'
import Api from '../../Api/Api'

function AddHotel({ handleClose, show, getData }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
  })



  const handleChange = (e) => {
    setTask((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }
    ))
  }


  const checkForm = () => {
    if ((task.title === "") || (task.description === "")) {
      alert("Fill required fields")
      return
    }
  }

  const handleSubmit = async (e) => {
    console.log("hello");
    e.preventDefault();
    checkForm();
    try {
      const { data } = await Api.AddTask(task);
      console.log("responseeeeeee", data);
      getData()
      swal("Success", "Add Credit Successfully", "success")
      setTask({})
      handleClose()
    } catch (e) {
      console.log(e);
      if (e.response?.data?.message) {
        swal('Error', e.response?.data?.message, 'error')
      } else {
        swal('Error', "Unable to Create", 'error')
      }
    }
  }



  return (
    <Modal show={show} onHide={() => {
      setTask({})
      handleClose()
    }}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title<small>*</small></Form.Label>
            <Form.Control type="name" autoFocus placeholder="title for task" name="title" value={task.name} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description<small>*</small></Form.Label>
            <Form.Control as="textarea" rows={3} name="description" value={task.description} onChange={handleChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button variant="secondary" onClick={handleClose}>
          Close
        </Button> */}
        <Button variant="primary" onClick={handleSubmit}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddHotel