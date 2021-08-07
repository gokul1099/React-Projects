import React, { useState } from 'react'
import { Alert, Modal, Button, Form, Container } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { getPrescription } from "../Actions/Prescriptions"
import Rating from "./Rating"
import { BsStarFill } from "react-icons/bs";
import { BsStarHalf } from "react-icons/bs";
import { BsStar } from "react-icons/bs";
import setRating from "../Actions/Rating"

function CompletedApp(props) {

    const [show, setShow] = useState(false);
    const [rate, setRate] = useState({
        stars: "",
        review: ""
    })

    const [page, setPage] = useState(1)
    const handleClose = () => {
        setShow(false);
        setPage(1)
    }
    const handleShow = () => setShow(true);
    const dispatch = useDispatch()
    const handlePresc = () => {
        handleShow()
        dispatch(getPrescription(props.appId))
    }
    const handleSubmit = () => {
        dispatch(setRating(rate.stars, rate.review, props.doctorId))
        setShow(false)
    }
    const { prescriptions } = useSelector(state => state.prescriptions)
    return (
        <Alert variant="success">
            <Alert.Heading>Hey, nice to see you</Alert.Heading>
            <p>
                Aww yeah, you meeting with the doctor is completed
            </p>
            <hr />
            <p className="mb-0">
                Now you can check prescription provided by the doctor
            </p>
            <Button variant="primary" onClick={() => handlePresc()}>
                Show Prescription
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Prescription</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {page === 1 ? (
                        prescriptions ? prescriptions.map((p) => {
                            return (<p>{p}</p>)
                        }) : <p>No prescriptions Provided by the doctor</p>
                    ) :
                        (

                            <Container>
                                <Rating
                                    size={50}
                                    count={5}
                                    color={"#ffd700"}
                                    activeColor={"#FFDF00"}
                                    value={3.5}
                                    a11y={true}
                                    isHalf={true}
                                    emptyIcon={<BsStar />}
                                    halfIcon={<BsStarHalf />}
                                    filledIcon={<BsStarFill />}
                                    setRating={setRate}

                                />
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Reviews</Form.Label>
                                    <Form.Control as="textarea" rows={3} onChange={(e) => setRate({ ...rate, review: e.target.value })} />
                                </Form.Group>
                            </Container>

                        )
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {page === 1 ? (
                        <Button variant="primary" onClick={() => setPage(2)}>
                            Give your rating and review
                        </Button>) : (
                        <Button variant="primary" onClick={() => handleSubmit()}>
                            Submit
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </Alert >
    )
}

export default CompletedApp
