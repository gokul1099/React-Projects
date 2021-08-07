import React, { useState } from 'react'
import logo from "../images/alert-logo.png"
import { Toast } from "react-bootstrap"
const Alert = (props) => {
  const [showA, setShowA] = useState(true);
  const toggleShowA = (props) => setShowA(!showA);
  return (
    <div aria-live="polite" aria-atomic="true" style={{ position: "absolute", minHeight: "200px", top: 0, right: 0, }} >
      <Toast show={showA} onClose={toggleShowA} style={{ position: "relative", width: "500px" }}>
        <Toast.Header>
          <img src={logo} className="rounded mr-2 mt-3" alt="logo" height="50px" width="50px" />
          <strong className="mr-auto">Practo</strong>
        </Toast.Header>
        <hr />
        <Toast.Body style={{ "padding": "30px" }}>{props.msg}</Toast.Body>
      </Toast>
    </div>
  )
}

export default Alert