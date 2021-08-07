import React from 'react'
import { Form, Button, Alert } from "react-bootstrap"
import updateRecord from "../Actions/UploadRecord"
import { useDispatch, useSelector } from "react-redux"
const UploadRecord = () => {

    var medicalDocs = ""
    var xrays = ""
    var reports = ""
    var currMedicines = ""
    const { userInfo } = useSelector(state => state.userLogin)
    const { error, medicalRecords } = useSelector(state => state.medicalRecords)
    var user = ""
    if (userInfo) {
        user = userInfo.user
    }
    const handleUploadMedical = (e) => {
        medicalDocs = e.target.files
    }

    const handleUploadXrays = (e) => {
        xrays = e.target.files

    }

    const handleUploadReports = (e) => {
        reports = e.target.files

    }

    const handleUploadCurrmedics = (e) => {
        currMedicines = e.target.files

    }

    const dispatch = useDispatch()
    const handleSubmit = () => {
        dispatch(updateRecord(medicalDocs, xrays, reports, currMedicines, user._id))
    }
    return (
        <Form>
            <Form.Group controlId="formControlsFile">
                <Form.Label>Any Medical Documents (.Docx)</Form.Label>
                <Form.Control onChange={(e) => handleUploadMedical(e)} type="file" placeholder="upload your file here" multiple />

            </Form.Group>
            <Form.Group controlId="formControlsFile">
                <Form.Label>X-rays (.img)</Form.Label>
                <Form.Control onChange={(e) => handleUploadXrays(e)} type="file" placeholder="upload your file here" multiple />

            </Form.Group>
            <Form.Group controlId="formControlsFile">
                <Form.Label> Reports (.pdf)</Form.Label>
                <Form.Control onChange={(e) => handleUploadReports(e)} type="file" placeholder="upload your file here" multiple />

            </Form.Group>
            <Form.Group controlId="formControlsFile">
                <Form.Label> Current Medicine (.img)</Form.Label>
                <Form.Control onChange={(e) => handleUploadCurrmedics(e)} type="file" placeholder="upload your file here" multiple />

            </Form.Group>
            <Button variant="primary" onClick={() => handleSubmit()} style={{ "marginTop": "10px", "marginBottom": "10px" }}>Upload</Button>

            <div>
                <h5>Uploaded Documents</h5>
                {error ? <Alert variant="danger">No data found</Alert> : null}
                <h5>X-ray</h5>
                {medicalRecords && medicalRecords.xray ? (
                    medicalRecords.xray.map((doc) => {
                        return (<>
                            <Button value="outline-success" style={{ "marginRight": "10px" }}>
                                <a href={doc} target="_blank" rel="noreferrer" download style={{ "color": "white", "textDecoration": "none" }} >document</a>
                            </Button>
                        </>
                        )
                    }
                    )) : null
                }
                <h5>Medical Document</h5>
                {medicalRecords && medicalRecords.medicaldoc ? (
                    medicalRecords.medicaldoc.map((doc) => {
                        return (<Button value="outline-success" style={{ "marginRight": "10px" }}>
                            <a href={doc} target="_blank" rel="noreferrer" download style={{ "color": "white", "textDecoration": "none" }} >document</a>
                        </Button>)
                    }
                    )) : null
                }
                <h5>Reports</h5>
                {medicalRecords && medicalRecords.report ? (
                    medicalRecords.report.map((doc) => {
                        return (<Button value="outline-success" style={{ "marginRight": "10px" }}>
                            <a href={doc} target="_blank" rel="noreferrer" download style={{ "color": "white", "textDecoration": "none" }} >document</a>
                        </Button>)
                    }
                    )) : null
                }
                <h5>Current Medicine</h5>
                {medicalRecords && medicalRecords.currentMedicine ? (
                    medicalRecords.currentMedicine.map((doc) => {
                        return (<Button value="outline-success" style={{ "marginRight": "10px" }}>
                            <a href={doc} target="_blank" rel="noreferrer" style={{ "color": "white", "textDecoration": "none" }} download>document</a>
                        </Button>)
                    }
                    )) : null
                }
            </div>

        </Form>
    )
}

export default UploadRecord
