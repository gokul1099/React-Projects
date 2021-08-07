import React from 'react'
import {Alert} from "react-bootstrap"

function PendingRequest(props) {
    return (
        <Alert key={props.id} variant="warning">
            your request has not been accepted by the doctor
      </Alert>
    )
}

export default PendingRequest
