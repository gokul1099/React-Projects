import {
    UPLOAD_RECORD,
    UPLOAD_RECORD_SUCCESS,
    UPLOAD_RECORD_FAIL
} from "../Reducers/type"

import axios from "axios"


const updateRecord = (medicaldoc, xray, report, currentMedicine, id) => async (dispatch) => {

    dispatch({
        type: UPLOAD_RECORD,
    })

    var { token } = JSON.parse(localStorage.getItem('userInfo'))
    const formData = new FormData()

    Array.from(medicaldoc).forEach(image => {
        formData.append("medicaldoc", image);
    });

    Array.from(xray).forEach(image => {
        formData.append("xray", image);
    });

    Array.from(report).forEach(image => {
        formData.append("report", image);
    });

    Array.from(currentMedicine).forEach(image => {
        formData.append("currentMedicine", image);
    });
    console.log(formData.get("xray"))

    axios.post(`/patient-medical-history`,
        formData,
        {
            params: { id },
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${token}`
            }
        }
    ).then(function () {
        dispatch({
            type: UPLOAD_RECORD_SUCCESS,
            payload: "SUCCESS"
        })
    })
        .catch(function () {
            dispatch({
                type: UPLOAD_RECORD_FAIL,
                data: "Failed"
            })
        });

}
export default updateRecord
