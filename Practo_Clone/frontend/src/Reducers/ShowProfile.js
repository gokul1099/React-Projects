import {
    SHOW_PROFILE,
    SHOW_PROFILE_SUCCESS,
    SHOW_PROFILE_FAIL
} from "./type"
export const patientProfile = (state = { patientDetails: [] }, action) => {
    switch (action.type) {
        case SHOW_PROFILE:
            return { loading: true }
        case SHOW_PROFILE_SUCCESS:
            return { loading: false, patientDetails: action.payload }
        case SHOW_PROFILE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
