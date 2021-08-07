import {
    ACCEPTED,
    REJECTED, STATUS_UPDATE_FAILED
} from "../Reducers/type"
import axios from "axios"

const updateAppointment = (status, id) => async (dispatch) => {
    try {

        var { token } = JSON.parse(localStorage.getItem('userInfo'))
        const { data } = await axios.put("/update-status",
            {},
            { params: { id, status } },
            {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                }
            }
        )

        const setType = status === "Accepted" ? ACCEPTED : REJECTED
        dispatch({
            type: setType,
            payload: data
        })

    }
    catch (error) {
        dispatch({
            type: STATUS_UPDATE_FAILED,
            payload:
                error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}
export default updateAppointment