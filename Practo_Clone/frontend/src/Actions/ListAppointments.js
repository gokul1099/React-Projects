import {
    LIST_APPOINTMENTS,
    LIST_APPOINTMENTS_SUCCESS,
    LIST_APPOINTMENTS_FAIL
} from "../Reducers/type"
import axios from "axios"

const listAppointment = (id, isDoctor) => async (dispatch) => {
    try {

        dispatch({
            type: LIST_APPOINTMENTS,
            loading: true
        })

        var { token } = JSON.parse(localStorage.getItem('userInfo'))

        var api = isDoctor ? "/listapp-doctor" : "/listapp-patient"
        const { data } = await axios.get(`${api}`, {
            params: { id },

            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`,
            },
        })


        dispatch({
            type: LIST_APPOINTMENTS_SUCCESS,
            loading: false,
            payload: data
        })


    }
    catch (error) {
        dispatch({
            type: LIST_APPOINTMENTS_FAIL,
            loading: false,
            payload:
                error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export default listAppointment