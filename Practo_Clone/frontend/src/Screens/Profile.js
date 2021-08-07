import React from 'react'
import { Row, Col } from "react-bootstrap"
import { FiUser } from "react-icons/fi";
import { useSelector } from "react-redux"
import DoctorProfile from "../Components/DoctorProfile"
import PatientProfile from "../Components/PatientProfile"

const Profile = () => {
    const { userInfo } = useSelector(state => state.userLogin)
    var user = ""
    if (userInfo) {
        user = userInfo.user
    }
    return (
        <div style={{ "backgroundColor": "#dde2de", "padding": "20px" }}>
            <div style={{ "backgroundColor": "white", "margin": "10px", "borderBottom": "1px solid #dde2de", "padding": "10px" }}>
                <Row>
                    <Col sm>
                        <h5>Your Drive</h5>
                    </Col>
                    <Col sm>
                        <Row>
                            <FiUser style={{ "fontSize": "40px", "color": "primary" }} />
                            <Col sm={4} style={{ "paddingTop": "5px" }}>
                                <h6 style={{ "fontSize": "10px" }}>{user.name}</h6>
                                <h6 style={{ "fontSize": "10px" }}>{user.email}</h6>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <hr />
                {user.isDoctor ? (<DoctorProfile />) : <PatientProfile />}

            </div>
        </div>

    )
}

export default Profile
