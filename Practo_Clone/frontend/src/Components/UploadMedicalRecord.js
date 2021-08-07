import React, { useState, useRef } from 'react'
import { Container, Row, Col, Button, Modal } from "react-bootstrap"
import { AiOutlinePlus } from "react-icons/ai";





function UploadMedicalRecord() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const fileUploader = useRef(null)

    return (
        <Container>
            <Row>
                <Col>
                    <div >
                        <Button className="float-right" variant="primary" onClick={handleShow}>Upload Records</Button>
                    </div>
                </Col>
            </Row>
            <hr />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload Medical Documents</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <div style={{ "border": "1px solid gray", "borderStyle": "dashed", "padding": "20px", "marginLeft": "100px", "height": "200px", "width": "200px" }}>
                            <div style={{ "marginTop": "25px", "marginLeft": "25px" }}>
                                <input type="file" id="file" ref={fileUploader} style={{ display: "none" }} />
                                <AiOutlinePlus fontSize={"100px"} onClick={(e) => fileUploader.click()} />
                            </div>
                        </div>
                    </Row>
                    <hr />
                    <Row>

                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default UploadMedicalRecord
