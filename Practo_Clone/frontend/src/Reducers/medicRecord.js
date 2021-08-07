import {
    GET_MEDIC_REC,
    GET_MEDIC_REC_SUCCESS,
    GET_MEDIC_REC_FAIL
} from "./type"
export const medicRecord = (state = { medicalRecords: [] }, action) => {
    switch (action.type) {
        case GET_MEDIC_REC:
            return { loading: true }
        case GET_MEDIC_REC_SUCCESS:
            return { loading: false, medicalRecords: action.payload }
        case GET_MEDIC_REC_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
