import { CREATE_APPOINTMENTS, CREATE_APPOINTMENTS_FAIL, CREATE_APPOINTMENTS_SUCCESS } from "../Reducers/type"
import axios from "axios"

const createAppointments = (newAppdata) => async (dispatch) => {
    try {
        dispatch({
            type: CREATE_APPOINTMENTS,
        })
        var { token } = JSON.parse(localStorage.getItem('userInfo'))

        const { data } = await axios.post("/newapp",
            {
                ...newAppdata
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`,
                },
            })
        console.log(data)
        dispatch({
            type: CREATE_APPOINTMENTS_SUCCESS,
            payload: data
        })


    }
    catch (error) {
        dispatch({
            type: CREATE_APPOINTMENTS_FAIL,
            payload:
                error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}
export default createAppointments


