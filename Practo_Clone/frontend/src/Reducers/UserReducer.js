import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SIGNUP,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL
} from "./type"


export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case LOGIN:
            return { loading: true }
        case LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case LOGIN_FAIL:
            return { loading: false, error: action.payload }
        case LOGOUT:
            return {}
        default:
            return state
    }
}


export const userSignUpReducer = (state = { signupInfo: [] }, action) => {
    switch (action.type) {
        case SIGNUP:
            return { loading: true }
        case SIGNUP_SUCCESS:
            return { loading: false, signupInfo: action.payload }
        case SIGNUP_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}
