import React, { useState } from 'react'
import { Modal, Form, Row, Col, Button } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { FaUser } from "react-icons/fa";
import TimeSlot from "./TimeSlot"
import { updateProfilePatient } from "../Actions/UpdatePersonalDetails"
import LoadingSpinner from './LoadingSpinner';


const PersonalDetailPatient = (props) => {
    var [show, setShow] = useState(true);
    const [dob, setDob] = useState(null);
    const { user } = useSelector(state => state.userLogin.userInfo)

    var [userDetails, setUserDetails] = useState({
        age: "",
        gender: "",
        blood_group: "",
        location: "",
        image: ""
    })
    const dispatch = useDispatch()
    const handleSubmit = () => {
        dispatch(updateProfilePatient(user._id, dob, userDetails))
        setShow(false)
    }
    const updateStatus = useSelector(state => state.updateStatus)
    const { loading } = updateStatus

    return (

        <Modal
            show={show}
            onHide={() => setShow(false)}
            size="xl"
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    Personal Details
                </Modal.Title>
            </Modal.Header>
            {loading ? <LoadingSpinner /> :
                (<Modal.Body>
                    <Row>
                        <Col>

                            {/*For showing the left side profile image*/}
                            <Row>
                                <FaUser fontSize="150px" style={{ "marginLeft": "160px" }} />
                            </Row>


                        </Col>
                        <Col>
                            <Form>

                                {/*email input set as default input*/}


                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm="2">
                                        Email
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control plaintext readOnly defaultValue={user.email} />
                                    </Col>
                                </Form.Group>

                                {/*name input set as default input*/}

                                <Form.Group as={Row} controlId="formPlaintext">
                                    <Form.Label column sm="2">
                                        Name
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control plaintext readOnly defaultValue={user.name} />
                                    </Col>
                                </Form.Group>

                                {/*age input*/}

                                <Form.Group as={Row}>
                                    <Col sm="2">
                                        <Form.Label column >
                                            Age
                                        </Form.Label>
                                    </Col>

                                    <Col sm="2" >
                                        <Form.Control onChange={(e) => { setUserDetails({ ...userDetails, age: e.target.value }) }} value={userDetails.age} size="sm" />
                                    </Col>
                                </Form.Group>

                                {/*gender selection*/}

                                <Form.Group as={Row} >
                                    <Col sm="2">
                                        <Form.Label>Gender</Form.Label>
                                    </Col>
                                    <Col sm="3">
                                        <Form.Control as="select" size="sm" custom onChange={(e) => setUserDetails({ ...userDetails, gender: e.target.options[e.target.selectedIndex].text })}>
                                            <option>Male</option>
                                            <option>Female</option>
                                            <option>Others</option>

                                        </Form.Control>
                                    </Col>
                                </Form.Group>

                                {/*blod group*/}

                                <Form.Group as={Row} >
                                    <Col xs="auto" className="my-1">
                                        <Form.Label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">
                                            Blood Group
                                        </Form.Label>
                                    </Col>
                                    <Col xs="auto">
                                        <Form.Control
                                            as="select"
                                            className="mr-sm-3"
                                            id="inlineFormCustomSelect"
                                            custom

                                            onChange={(e) => setUserDetails({ ...userDetails, blood_group: e.target.options[e.target.selectedIndex].text })}>
                                            <option key="1">A Positive</option>
                                            <option key="2">A Negative</option>
                                            <option key="3">A Unknown</option>
                                            <option key="4">B Positive</option>
                                            <option key="5">B Negative</option>
                                            <option key="6">B Unknown</option>
                                            <option key="7">AB Positive</option>
                                            <option key="8">AB Negative</option>
                                            <option key="9">AB Unknown</option>
                                            <option key="10">O Positive</option>
                                            <option key="11">O Negative</option>
                                            <option key="12">O Unknown</option>
                                        </Form.Control>
                                    </Col>
                                </Form.Group>

                                {/*date of birth */}

                                <Form.Group as={Row}>
                                    <Col sm={3}>
                                        <Form.Label>
                                            Date Of Birth
                                        </Form.Label>
                                    </Col>
                                    <Col sm={2}>
                                        <TimeSlot setDob={setDob} />
                                    </Col>
                                </Form.Group>

                                {/* Location details */}
                                <Form.Group as={Row}>
                                    <Col sm="2">
                                        <Form.Label>
                                            Location
                                        </Form.Label>
                                    </Col>
                                    <Col sm="5">
                                        <Form.Control onChange={(e) => { setUserDetails({ ...userDetails, location: e.target.value }) }} />
                                    </Col>

                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                    <Button variant="primary" className="float-right" style={{ "marginTop": "100px" }} onClick={() => handleSubmit()}>
                        Submit
                    </Button>
                </Modal.Body>)
            }


        </Modal >
    )


}

export default PersonalDetailPatient
