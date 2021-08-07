import {
    SET_PRESCRIPTION,
    SET_PRESCRIPTION_SUCCESS,
    SET_PRESCRIPTION_FAIL,
    GET_PRESCRIPTION,
    GET_PRESCRIPTION_SUCCESS,
    GET_PRESCRIPTION_FAIL
} from "../Reducers/type"
import axios from "axios"

export const setPrescription = (presc, patientId, doctorId, appId) => async (dispatch) => {
    try {
        dispatch({
            type: SET_PRESCRIPTION,
        })
        var { token } = JSON.parse(localStorage.getItem('userInfo'))

        const { data } = axios.post("/setPrescription",
            {
                doctor_id: doctorId,
                prescribed_medicines: presc,
                patient_id: patientId,
                appointment_id: appId
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`,
                },
            })
        dispatch({
            type: SET_PRESCRIPTION_SUCCESS,
            payload: data
        })


    }
    catch (error) {
        dispatch({
            type: SET_PRESCRIPTION_FAIL,
            payload:
                error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}


export const getPrescription = (appId) => async (dispatch) => {
    try {
        dispatch({
            type: GET_PRESCRIPTION,
        })
        var { token } = JSON.parse(localStorage.getItem('userInfo'))

        const { data } = await axios.get("/prescriptionlist",
            {
                params: { id: appId },


                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`,
                },
            })
        console.log(data)
        dispatch({
            type: GET_PRESCRIPTION_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: GET_PRESCRIPTION_FAIL,
            payload:
                error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}
