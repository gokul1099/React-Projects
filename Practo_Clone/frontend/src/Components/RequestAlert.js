import React from 'react'
import {Alert,Button} from 'react-bootstrap'
import updateAppointment from "../Actions/UpdateStatus"
import {useDispatch,useSelector} from "react-redux"
import listAppointment from "../Actions/ListAppointments"
const RequestAlert=(props)=> {
    const dispatch = useDispatch()
    const {userInfo} = useSelector(state=>state.userLogin)
    var user =''
        if(userInfo){
            user = userInfo.user
        }
    var {isDoctor} = user   
    const clickHandle=((status,id)=>{
        dispatch(updateAppointment(status,id))
        dispatch(listAppointment(user._id,isDoctor))
    } ) 
    return (
        <Alert  variant="success" id={props.id}>
            <Alert.Heading>Appointment Request</Alert.Heading>
            <p>
            This patient has request for an appointment with in time:
            </p>
            <hr />
            <div className="d-flex justify-content-end">
            <Button  variant="outline-success" onClick={()=>clickHandle("Accepted",props.id)}>
               Accept
            </Button>
            <Button  variant="outline-danger" onClick={()=>clickHandle("Rejected",props.id)} >
                Reject
            </Button>
            </div>
        </Alert>
    )
}

export default RequestAlert
