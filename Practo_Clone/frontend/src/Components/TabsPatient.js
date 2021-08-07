import React from 'react'
import { Row, Col, Nav, Tab } from 'react-bootstrap'
import AcceptedRequest from "./AcceptedRequest"
import RejectedRequest from "./RejectedRequest"
import PendingRequest from "./PendingRequest"
import { useSelector } from "react-redux"
//import UploadRecord from "./UploadRecord"
import CompletedApp from "./CompletedApp"
import UploadMedicalRecord from "./UploadMedicalRecord"

const TabsPatient = (props) => {
    const { appointments } = useSelector(state => state.appointments)


    const all = appointments ? appointments.map((app) => {
        if (app.accept_status === "Accepted") {
            return (<AcceptedRequest id={app._id} />)
        }
        else if (app.accept_status === "Rejected") {
            return (<RejectedRequest id={app._id} />)
        }
        else if (app.accept_status === "pending") {
            return (<PendingRequest id={app._id} />)
        }
        return null
    }) : null
    const prescription = appointments ? appointments.map((app) => {
        if (app.accept_status === "Completed") {
            return (<CompletedApp appId={app._id} patientId={app.patient_id} doctorId={app.doctor_id} />)
        }
        return null
    }) : null

    console.log(appointments)
    return (

        <Tab.Container id="left-pills-example" defaultActiveKey="first">
            <Row>
                <Col sm={1} key="col-1" style={{ "marginRight": "50px", "paddingRight": "20px" }}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item key="first" style={{ "marginBottom": "5px" }}>
                            <Nav.Link eventKey="appointment" style={{ "marginBottom": "5px" }} >Appointments</Nav.Link>
                        </Nav.Item>
                        <Nav.Item key="second" style={{ "marginBottom": "5px" }}>
                            <Nav.Link eventKey="prescription" style={{ "marginBottom": "5px" }}>Prescription</Nav.Link>
                        </Nav.Item>
                        <Nav.Item key="third" style={{ "marginBottom": "5px" }}>
                            <Nav.Link eventKey="medical_records" style={{ "marginBottom": "5px" }}>Medical Records</Nav.Link>
                        </Nav.Item>
                        <Nav.Item key="fourth" style={{ "marginBottom": "5px" }}>
                            <Nav.Link eventKey="past-app" style={{ "marginBottom": "5px" }}>Appointments History</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={9} key="col-2">
                    <Tab.Content >
                        <Tab.Pane eventKey="appointment" key="first-content" style={{ overflowY: 'scroll', height: "400px" }}>
                            {all}
                        </Tab.Pane>
                        <Tab.Pane eventKey="prescription" key="second-content" style={{ overflowY: 'scroll', height: "400px" }}>
                            {prescription}
                        </Tab.Pane>
                        <Tab.Pane eventKey="medical_records" key="third-content" style={{ overflowY: 'scroll', height: "400px" }}>
                            <UploadMedicalRecord />
                        </Tab.Pane>
                        <Tab.Pane eventKey="past-app" key="fourth-content" style={{ overflowY: 'scroll', height: "400px" }}>
                            past appointments
                        </Tab.Pane>


                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>


    )
}

export default TabsPatient
