import { SET_ACTIVE } from "../Reducers/type"
import axios from "axios"
const setActive = (isActive, id) => async (dispatch) => {
    try {

        var { token } = JSON.parse(localStorage.getItem('userInfo'))

        const { data } = await axios.post("/setActive", { isActive },
            { params: { id } },

            {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                }
            }
        )
        console.log(data)
        dispatch({
            type: SET_ACTIVE,
            payload: data
        })
    }
    catch (error) {
        console.log(error)
    }
}

export default setActive