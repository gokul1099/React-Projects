import React, { useState } from 'react'
import { Alert, Button, Modal, Form } from "react-bootstrap"
import { setPrescription } from "../Actions/Prescriptions"
import { useDispatch, useSelector } from "react-redux"
import updateAppointment from "../Actions/UpdateStatus"
import listAppointment from '../Actions/ListAppointments'
import { showProfile } from "../Actions/ShowProfile"
import getMedicaleRecords from "../Actions/GetMedicRecords"
import { useHistory } from 'react-router-dom';

const AcceptedRequest = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [presc, setPresc] = useState(null)
    const dispatch = useDispatch()
    const history = useHistory()

    const { userInfo } = useSelector(state => state.userLogin)
    var user = ""
    if (userInfo) {
        user = userInfo.user
    }
    const handleViewProfile = () => {
        dispatch(showProfile(props.patientId))
        dispatch(getMedicaleRecords(props.patientId))
        history.push("/patientprofile")
    }
    const handleSubmit = () => {
        handleClose();
        dispatch(setPrescription(
            presc, props.patientId, props.doctorId, props.appId
        ))
        dispatch(updateAppointment("Completed", props.appId))
        dispatch(listAppointment(user._id, user.isDoctor))
    }
    return (

        <Alert variant="success" id={props.id}>
            <Alert.Heading>Hey, nice to see you</Alert.Heading>
            <p>
                Your request for appointment with the doctor is accepted.
            </p>
            <hr />
            <p className="mb-0">

                <Button variant="success" onClick={() => handleShow()}>
                    Join Meeting
                </Button>
                {user.isDoctor ? (
                    <Button variant="primary" style={{ "marginLeft": "20px" }} onClick={() => handleViewProfile()}>View Patient Profile</Button>
                ) : null}
            </p>
            {
                user.isDoctor ?
                    (<Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>You meeting has been ended</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h1>Prescriptions</h1>
                            <Form>
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Write your prescription here</Form.Label>
                                    <Form.Control as="textarea" rows={3} onChange={(e) => setPresc(e.target.value)} />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={() => handleSubmit()}>
                                Save Changes
                            </Button>

                        </Modal.Footer>
                    </Modal>) : (<Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Join Meeeting</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Wait for the doctor to connect</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>)
            }
        </Alert >

    )
}

export default AcceptedRequest
