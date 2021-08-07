import { applyMiddleware, createStore, combineReducers } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { userLoginReducer, userSignUpReducer } from "./Reducers/UserReducer"
import { listAppointmetsReducer, createAppointmetsReducer, getSlots } from "./Reducers/appointmentReducer"
import { listDoctorReducer } from "./Reducers/ListUser"
import { updatePatient } from "./Reducers/updateStatus"
import { getPrescriptionReducer } from "./Reducers/prescriptions"
import { patientProfile } from "./Reducers/ShowProfile"
import { medicRecord } from "./Reducers/medicRecord"

const middleware = [thunk]

const reducers = combineReducers({
    userLogin: userLoginReducer,
    signupInfo: userSignUpReducer,
    appointments: listAppointmetsReducer,
    newAppointment: createAppointmetsReducer,
    availableDoctors: listDoctorReducer,
    updateStatus: updatePatient,
    available_slots: getSlots,
    prescriptions: getPrescriptionReducer,
    patientDetails: patientProfile,
    medicalRecords: medicRecord


})
const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null

const initialState = {
    userLogin: { userInfo: userInfoFromStorage, loading: false },
    signupInfo: [],
    appointments: [],
    newAppointment: [],
    availableDoctors: [],
    updateStatus: [],
    available_slots: [],
    prescriptions: [],
    patientDetails: [],
    medicalRecords: []
}
const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)))
export default store