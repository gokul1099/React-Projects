import React, { useState } from 'react'
import { Modal, Button, Alert, Container, Row, Col, ListGroup } from "react-bootstrap"
import createAppointments from "../Actions/NewAppointment"
import { useSelector, useDispatch } from "react-redux"
import { FaUserTie } from "react-icons/fa";
import TimeSlot from "./TimeSlot"
import Rating from "./Rating"

const NewAppointment = (props) => {
  const [page, setPage] = useState(1)
  const [curDoctor, setCurDoctor] = useState(null)
  const [show, setShow] = useState(false);
  const [showAvailable, setShowAvailable] = useState(false)
  const [appDate, setAppDate] = useState(null)
  const [appTime, setAppTime] = useState(null)
  const { availableDoctors } = useSelector(state => state.availableDoctors)
  var data = ""
  if (availableDoctors) {
    data = availableDoctors.data
  }
  const slots = availableDoctors && data ? (data.map((doc) => {
    if (doc._id === curDoctor) {
      return (doc.avaliableSlots)
    } return null
  }).flat()) : null

  const clickHandle = () => {
    setShow(true)
    setPage(1)

  }
  const viewProfile = (id) => {
    setCurDoctor(id)
    setPage(2)

  }
  const { available_slots } = useSelector(state => state.available_slots)
  const doctorsList = availableDoctors && availableDoctors.data ? data.map((d) => {
    return (
      <Alert key={d._id} variant="success">
        <Alert.Heading>{d.name}
          <div className="d-flex justify-content-end">
            <Button variant="outline-success" onClick={() => viewProfile(d._id)}>
              View Profile
            </Button>
          </div>
        </Alert.Heading>
      </Alert>
    )
  }) : (<Alert variant="danger">
    All the doctors are busy with their appointment. Try again later ...
  </Alert>)
  const profile = availableDoctors && availableDoctors.data ? data.map((d) => {
    if (d._id === curDoctor) {
      return (
        <>
          <Container>

            <Row className="justify-content-md-center">
              <Col xs={12} sm={4} md={4}>
                <FaUserTie style={{ "fontSize": "150px" }} />
              </Col>
            </Row>
            <ListGroup variant="flush" className="justify-content-md-center ">
              <ListGroup.Item key="name">Name : {d.name}</ListGroup.Item>
              <ListGroup.Item key="email">Email : {d.email}</ListGroup.Item>
              <ListGroup.Item key="age">Age : {d.age}</ListGroup.Item>
              <ListGroup.Item key="field">Specialised in : {d.specialisation}</ListGroup.Item>

              <ListGroup.Item key="rating">
                <Row>
                  <Col sm="3">
                    Rating :
                  </Col>
                  <Col sm="5">
                    <Rating size={25} value={d.averageRating} edit={false} />
                  </Col>
                </Row>


              </ListGroup.Item>

            </ListGroup>
            <Button variant="info" onClick={() => setPage(1)}>
              Back
            </Button>
            <Button variant="info" className="float-right" onClick={() => setPage(3)}>
              View available Slots
            </Button>
          </Container>
        </>
      )
    }
    return null
  }) : null
  const onHide = () => {
    setShowAvailable(false)
    setShow(false)
  }
  const showAvailableSlots = available_slots && available_slots !== [] ? slots.map((s) => {
    if (available_slots.includes(s)) {
      return (<Button key={s} onClick={() => setAppTime(s)} variant="danger" style={{ "marginBottom": "10px" }}>{s}</Button>)
    }
    return (<Button key={s} onClick={() => setAppTime(s)} variant="outline-success" style={{ "marginBottom": "10px" }}>{s}</Button>)
  }) : null
  const dispatch = useDispatch()
  const handleSubmit = () => {
    dispatch(createAppointments({
      doctor_id: curDoctor,
      appointment_date: appDate,
      appointment_time: appTime,
      accept_status: "pending",
      patient_id: props.patientId
    }))
    setShow(false)
  }
  return (
    <>
      <Button variant="primary" onClick={() => clickHandle()}>
        + Create Appointment
      </Button>

      <Modal
        show={show}
        onHide={() => onHide()}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Create New Appointment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {page === 1 ? (doctorsList)
            : page === 2 ? (profile) :
              page === 3 ? (

                <>
                  <Container>
                    <Row stlye={{ "margin": "20px", "padding": "20px" }}>
                      <Col>
                        <h5>Enter the date :</h5>
                      </Col>
                      <Col>
                        <TimeSlot showSlot={true} available={showAvailable} setAvailable={setShowAvailable} doctorId={curDoctor} setDate={setAppDate} />
                      </Col>
                    </Row>
                    {
                      showAvailable ? (
                        <>
                          <Row style={{ "marginTop": "30px" }}>
                            <Col>
                              <h5>Available Slots</h5>
                            </Col>
                            <Col>
                              {showAvailableSlots}
                            </Col>
                          </Row>
                        </>

                      ) : null}
                  </Container>


                  <Button variant="info" onClick={() => setPage(2)} style={{ "marginTop": "100px", "marginLeft": "10px" }}>
                    Back
                  </Button>
                  <Button variant="primary" onClick={() => handleSubmit()} className="float-right" style={{ "marginTop": "100px", "marginLeft": "10px" }}>
                    Fix appointment
                  </Button>
                </>



              ) : null}
        </Modal.Body>
      </Modal>
    </>
  );

}

export default NewAppointment
