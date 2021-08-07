import {
    SHOW_PROFILE,
    SHOW_PROFILE_SUCCESS,
    SHOW_PROFILE_FAIL
} from "../Reducers/type"
import axios from "axios"

export const showProfile = (id) => async (dispatch) => {

    try {

        dispatch({
            type: SHOW_PROFILE
        })
        var { token } = JSON.parse(localStorage.getItem('userInfo'))


        const { data } = await axios.get("/showProfile",
            { params: { id } },
            {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                }
            }
        )
        dispatch({
            type: SHOW_PROFILE_SUCCESS,
            payload: data
        })

    }
    catch (error) {
        dispatch({
            type: SHOW_PROFILE_FAIL,
            payload:
                error.response && error.response.data.message ? error.response.data.message : error
        })
    }


}

