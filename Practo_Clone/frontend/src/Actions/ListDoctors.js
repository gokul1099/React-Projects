import { LIST_DOCTOR, LIST_DOCTOR_FAIL, LIST_DOCTOR_SUCCESS } from "../Reducers/type"

import axios from "axios"

const listDoctor = () => async (dispatch) => {
    try {
        dispatch({
            type: LIST_DOCTOR,

        })
        var { token } = JSON.parse(localStorage.getItem('userInfo'))

        const { data } = await axios.get("/doctorlist", {

            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`,
            },
        })

        dispatch({
            type: LIST_DOCTOR_SUCCESS,
            payload: data
        })

    }
    catch (error) {
        dispatch({
            type: LIST_DOCTOR_FAIL,
            payload:
                error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export default listDoctor