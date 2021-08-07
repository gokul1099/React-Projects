import React from 'react'
import { Alert, Button } from "react-bootstrap"
const HistoryApp = (props) => {


    return (
        <>
            <Alert variant="success">
                <Alert.Heading>Hey, nice to see you</Alert.Heading>
                <p>
                    Aww yeah, this appointments is completed successfully.
                    click on view datail to more details about the appointments
                </p>
                <hr />
                <Button variant="primary">View Details</Button>
            </Alert>
        </>
    );
}


export default HistoryApp
