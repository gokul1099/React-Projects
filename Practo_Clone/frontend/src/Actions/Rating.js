import { SET_RATING } from "../Reducers/type"
import axios from "axios"
const setRating = (stars, review, doctor) => async (dispatch) => {
    try {

        var { token } = JSON.parse(localStorage.getItem('userInfo'))

        const { data } = await axios.post("/reviews", { stars, review, doctor },

            {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                }
            }
        )
        dispatch({
            type: SET_RATING,
            dispatch: data

        })
    }
    catch (error) {
        console.log(error)
    }
}

export default setRating