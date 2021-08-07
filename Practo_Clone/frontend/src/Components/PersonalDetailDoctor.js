import React, { useState } from 'react'
import { Modal, Row, Col, Form, Button } from "react-bootstrap"
import { useSelector } from "react-redux"
import { FaUserGraduate } from "react-icons/fa";
import { updateProfileDoctor } from "../Actions/UpdatePersonalDetails"
import { useDispatch } from "react-redux"
import TimeRangePicker from "../Components/TimeRangePicker"
import ShowTimeSlot from "../Components/ShowTimeSlot"


const PersonalDetailDoctor = (props) => {
    var [show, setShow] = useState(true);
    const { user } = useSelector(state => state.userLogin.userInfo)
    const [start, setStart] = useState("")
    const [end, setEnd] = useState("")
    const [slotShow, setSlotShow] = useState(null)
    const [selectedSlot, setSelectedSlot] = useState({
        slot: []
    })
    var [userDetails, setUserDetails] = useState({
        id: user._id,
        age: "",
        specialisation: "",
    })
    const dispatch = useDispatch()
    const handleSubmit = () => {
        dispatch(updateProfileDoctor(userDetails, selectedSlot.slot))
        setShow(false)

    }

    const handleGetSlot = () => {

        setSlotShow(!slotShow)

    }
    const handleSelectSlot = (val) => {
        setSelectedSlot({ slot: [...selectedSlot.slot, val] })

    }

    return (

        <Modal
            show={show}
            onHide={() => setShow(false)}
            dialogClassName="modal-90w"
            size="xl"
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    Personal Details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        <Row>
                            <FaUserGraduate fontSize="150px" style={{ "marginLeft": "160px" }} />
                        </Row>

                    </Col>
                    <Col>
                        <Form>
                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label column sm="2">
                                    Email
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={user.email} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label column sm="2">
                                    Name
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={user.name} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formPlaintext">
                                <Form.Label column sm="2">
                                    Age
                                </Form.Label>
                                <Col sm="3">
                                    <Form.Control type="number" onChange={(e) => setUserDetails({ ...userDetails, age: e.target.value })} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formPlaintext">
                                <Form.Label column sm="3">
                                    Specialisation
                                </Form.Label>
                                <Col sm="5">
                                    <Form.Control type="text" onChange={(e) => setUserDetails({ ...userDetails, specialisation: e.target.value })} />
                                </Col>
                            </Form.Group>
                            <Col>
                                Your Slots
                            </Col>
                            <Col>
                                Pick the time limit yout want yout slots to be in
                                <TimeRangePicker setStart={setStart} setEnd={setEnd} />
                                <Button variant="primary" onClick={() => handleGetSlot()}>Show slots</Button>
                                {
                                    slotShow ? (<ShowTimeSlot handleSelectSlot={handleSelectSlot} start={start} end={end} />) : null
                                }

                            </Col>

                        </Form>
                    </Col>

                </Row>
                <Button variant="primary" className="float-right" onClick={() => handleSubmit()}>
                    Submit
                </Button>

            </Modal.Body>
        </Modal>

    )
}

export default PersonalDetailDoctor
