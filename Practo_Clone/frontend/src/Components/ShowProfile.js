import React from 'react'
import { Row, Col, Button, Alert } from "react-bootstrap"
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import LoadingSpinner from "./LoadingSpinner"



function ShowProfile() {
    const { loading, patientDetails } = useSelector(state => state.patientDetails)
    const { medicalRecords } = useSelector(state => state.medicalRecords)
    const avatar = patientDetails ? patientDetails.avatar : null

    return (
        <div>
            {loading ? (<LoadingSpinner />) : patientDetails ? (
                <Row>
                    <Col sm="5">
                        {
                            patientDetails.avatar ? (<img src={"data:image/jpg;base64," + btoa({ avatar })} alt="avatar" />) : <FaUser fontSize="150px" style={{ "marginLeft": "160px" }} />
                        }
                    </Col>
                    <Col sm="5">
                        <h5>Name  :  {patientDetails.name}</h5>
                        <hr />
                        <h5>Email : {patientDetails.email}</h5>
                        <hr />
                        <h5>Age : {patientDetails.age}</h5>
                        <hr />
                        <h5>Blood Group : {patientDetails.bloodGroup}</h5>
                        <hr />
                        <h5>Dob : {patientDetails.date_of_birth}</h5>
                        <hr />
                        <h5>Location : {patientDetails.location}</h5>
                        <hr />
                        <h5>Medical Documents</h5>
                        <hr />

                        <h6>xrays</h6>

                        {medicalRecords && medicalRecords.xray ? medicalRecords.xray.map((doc) => {
                            return (<a href={doc} target="_blank" rel="noopener noreferrer" style={{ "marginLeft": "10px" }} download>
                                <Button>

                                    Download File
                                </Button>
                            </a>)
                        }) : <Alert variant="danger">Files not found</Alert>}

                        <h6>Reports</h6>

                        {medicalRecords && medicalRecords.report ? medicalRecords.xray.map((doc) => {
                            return (<a href={doc} target="_blank" rel="noopener noreferrer" download>
                                <Button style={{ "marginLeft": "10px" }}>

                                    Download File
                                </Button>
                            </a>)
                        }) : <Alert variant="danger">Files not found</Alert>}


                        <h6>Medical Documents</h6>

                        {medicalRecords && medicalRecords.medicaldoc ? medicalRecords.xray.map((doc) => {
                            return (<a href={doc} target="_blank" rel="noopener noreferrer" style={{ "marginLeft": "10px" }} download>
                                <Button>

                                    Download File
                                </Button>
                            </a>)
                        }) : <Alert variant="danger">Files not found</Alert>}


                        <h6>Current Medicines</h6>

                        {medicalRecords && medicalRecords.medicaldoc ? medicalRecords.xray.map((doc) => {
                            return (<a href={doc} target="_blank" rel="noopener noreferrer" style={{ "marginLeft": "10px" }} download>
                                <Button>

                                    Download File
                                </Button>
                            </a>)
                        }) : <Alert variant="danger">Files not found</Alert>}


                    </Col>
                </Row>) : (<Alert variant="danger" dismissible>
                    <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                    <p>
                        Some error occured while trying to fetch the details
                    </p>
                </Alert>)}
            <Link to="/user/dashboard">
                <Button variant="primary">
                    Back
                </Button>
            </Link>
        </div >
    )
}

export default ShowProfile
