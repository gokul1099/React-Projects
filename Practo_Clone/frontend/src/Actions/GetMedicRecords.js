import {
    GET_MEDIC_REC,
    GET_MEDIC_REC_SUCCESS,
    GET_MEDIC_REC_FAIL
} from "../Reducers/type"
import axios from "axios"

const getMedicaleRecords = (id) => async (dispatch) => {
    try {
        console.log(id)
        dispatch({
            type: GET_MEDIC_REC,
            loading: true,
        })
        var { token } = JSON.parse(localStorage.getItem('userInfo'))

        const { data } = await axios.get("/list-patient-medical-history",
            {
                params: { id },
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Authorization": `Bearer ${token}`
                }
            }
        )
        dispatch({
            type: GET_MEDIC_REC_SUCCESS,
            payload: data,
        })
    }
    catch (error) {
        dispatch({
            type: GET_MEDIC_REC_FAIL,
            payload: "some error occured"

        })
    }

}

export default getMedicaleRecords