import {
    UPDATE_PERSONAL_DETAIL,
    UPDATE_PERSONAL_DETAIL_SUCCESS,
    UPDATE_PERSONAL_DETAIL_FAIL
} from "../Reducers/type"
import axios from "axios"

export const updateProfilePatient = (id, dob, values) => async (dispatch) => {

    try {

        dispatch({
            type: UPDATE_PERSONAL_DETAIL
        })
        var { token } = JSON.parse(localStorage.getItem('userInfo'))


        const { age, blood_group, location } = values
        const { data } = await axios.post("/patientprofile", {

            dob,
            age,
            blood_group,
            date_of_birth: dob,
            location
        },
            { params: { id } },
            {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                }
            }
        )
        dispatch({
            type: UPDATE_PERSONAL_DETAIL_SUCCESS,
            payload: data
        })

    }
    catch (error) {
        dispatch({
            type: UPDATE_PERSONAL_DETAIL_FAIL,
            payload:
                error.response && error.response.data.message ? error.response.data.message : error
        })
    }


}


export const updateProfileDoctor = (values, slots) => async (dispatch) => {
    const { id, age, specialisation } = values
    try {

        dispatch({
            type: UPDATE_PERSONAL_DETAIL
        })
        var { token } = JSON.parse(localStorage.getItem('userInfo'))

        console.log(token)
        const { data } = await axios.post("/doctorprofile", {
            age,
            specialisation,
            slots
        },
            { params: { id } },

            {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                }
            }
        )
        dispatch({
            type: UPDATE_PERSONAL_DETAIL_SUCCESS,
            payload: data
        })

    }
    catch (error) {
        dispatch({
            type: UPDATE_PERSONAL_DETAIL_FAIL,
            payload:
                error.response && error.response.data.message ? error.response.data.message : error
        })
    }


}


