import React, { useEffect, useState } from 'react'
import Tabs from '../Components/Tabs'
import { Row, Col } from "react-bootstrap"
import { FiUser } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux"
import listAppointment from "../Actions/ListAppointments"
import NewAppointment from "../Components/NewAppointment"
import listDoctor from "../Actions/ListDoctors"
import TabsPatient from "../Components/TabsPatient"
import PersonalDetailPatient from '../Components/PersonalDetailPatient';
import PersonalDetailDoctor from '../Components/PersonalDetailDoctor';
import Switch from "react-switch";
import setActive from "../Actions/SetActive"
import getMedicaleRecords from "../Actions/GetMedicRecords"



const DashBoard = () => {

    const { userInfo } = useSelector(state => state.userLogin)
    const dispatch = useDispatch()
    var user = ''
    if (userInfo) {
        user = userInfo.user
    }

    const [checked, setChecked] = useState(user ? user.isActive : false)

    var { isDoctor } = user

    useEffect(() => {
        dispatch(listAppointment(user._id, isDoctor))
        dispatch(listDoctor())
        if (!isDoctor) {
            console.log(user._id)
            dispatch(getMedicaleRecords(user._id))
        }


    }, [dispatch, isDoctor, user])
    const handleSwitch = () => {
        setChecked(!checked)

        dispatch(setActive(!checked, user._id))


    }
    return (

        <div style={{ "backgroundColor": "#dde2de", "padding": "20px" }}>
            <div style={{ "backgroundColor": "white", "margin": "10px", "borderBottom": "1px solid #dde2de", "padding": "10px", "height": "500px" }}>
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
                    <Col sm>
                        {!isDoctor ? (<NewAppointment patientId={user._id} />) : null}
                        {isDoctor ? (<Switch onChange={() => handleSwitch()} onColor="#007bff" checked={checked} />) : null}
                    </Col>
                </Row>
                <hr />

                {isDoctor ? (<Tabs isDoctor={isDoctor} />) : (<TabsPatient isDoctor={isDoctor} />)}
                {user.onBoarding ? (isDoctor ? (<PersonalDetailDoctor show={true} />) : (<PersonalDetailPatient show={true} />)) : null}
            </div>
        </div>

    )
}
export default DashBoard

