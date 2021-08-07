import React from 'react'
import { Row, Col, Nav, Tab } from 'react-bootstrap'
import RequestAlert from "./RequestAlert"
import AcceptedRequest from './AcceptedRequest'
import HistoryApp from './HistoryApp'
import { useSelector } from 'react-redux'
const Tabs = () => {


    const { appointments } = useSelector(state => state.appointments)


    const pendingAppointment = appointments ? appointments.map((app) => {
        if (app.accept_status === "pending") {

            return (
                <RequestAlert id={app._id} />
            )
        }
        return null
    }) : null

    const accepted = appointments ? appointments.map((app) => {
        if (app.accept_status === "Accepted") {
            return (
                <AcceptedRequest appId={app._id} doctorId={app.doctor_id} patientId={app.patient_id} />
            )
        }
        return null
    }) : null

    const completed = appointments ? appointments.map((app) => {
        if (app.accept_status === "Completed") {
            return (
                <HistoryApp appId={app._id} doctorId={app.doctor_id} patientId={app.patient_id} />
            )
        }
        return null
    }) : null
    return (
        <Tab.Container id="left-pills-example" defaultActiveKey="first">
            <Row>
                <Col sm={1} key="col-1" style={{ "marginRight": "50px", "paddingRight": "20px" }}>
                    <Nav variant="pills" className="flex-column" >
                        <Nav.Item key="first" style={{ "marginBottom": "5px" }}>
                            <Nav.Link eventKey="first" style={{ "marginBottom": "5px" }}>Appointments</Nav.Link>
                        </Nav.Item>
                        <Nav.Item key="second">
                            <Nav.Link eventKey="second" style={{ "marginBottom": "5px" }} >Requests</Nav.Link>
                        </Nav.Item>
                        <Nav.Item key="third" >
                            <Nav.Link eventKey="past-app" style={{ "marginBottom": "5px" }}>History</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={9} key="col-2">
                    <div  >
                        <Tab.Content  >
                            <Tab.Pane eventKey="first" key="first-content" style={{ overflowY: 'scroll', height: "400px" }}>

                                {accepted && accepted.every(ele => ele === null) ? (<h5>No Pending appointment</h5>) : accepted}


                            </Tab.Pane>
                            <Tab.Pane eventKey="second" key="second-content" style={{ overflowY: 'scroll', height: "400px" }}>
                                {pendingAppointment && pendingAppointment.every(ele => ele === null) ? (<h5>No Pending Request</h5>) : pendingAppointment}
                            </Tab.Pane>
                            <Tab.Pane eventKey="past-app" key="third-content" style={{ overflowY: 'scroll', height: "400px" }}>

                                {completed && completed.every(ele => ele === null) ? (<h5>No History found</h5>) : completed}


                            </Tab.Pane>
                        </Tab.Content>
                    </div>

                </Col>
            </Row>
        </Tab.Container >

    )
}
export default Tabs
