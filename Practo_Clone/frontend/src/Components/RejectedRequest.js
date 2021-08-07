import React from 'react'
import {Alert} from "react-bootstrap"

const RejectedRequest =(props)=> {
   
        return (
            <Alert key={props.id} variant="danger">
                Your request for appointment with the doctor has been rejected by the doctor
            </Alert>
        )
    
}
export default RejectedRequest