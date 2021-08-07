import {
    LOGIN, LOGIN_SUCCESS, LOGIN_FAIL, USER_LOGOUT, SIGNUP,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
} from "../Reducers/type"
import axios from "axios"
export const signup = (values) => async (dispatch) => {
    try {

        const { email, name, isDoctor, password } = values
        dispatch({
            type: SIGNUP
        })
        const { data } = await axios.post("/signup", { name, email, password, isDoctor })
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: SIGNUP_FAIL,
            payload:
                error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}
export const loginUser = (values) => async (dispatch) => {
    try {

        const { email, password, isDoctor } = values

        dispatch({
            type: LOGIN,

        })
        const { data } = await axios.post("/login", { email, password, isDoctor })

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data,
        })

        localStorage.setItem("userInfo", JSON.stringify(data))
    }
    catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload:
                error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem("userInfo")
    dispatch({ type: USER_LOGOUT })

}