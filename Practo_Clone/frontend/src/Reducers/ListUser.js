import {LIST_DOCTOR,
    LIST_DOCTOR_SUCCESS,
    LIST_DOCTOR_FAIL,} from "./type"


export const listDoctorReducer = (state ={availableDoctors:[]},action)=>{
    switch(action.type){
        case LIST_DOCTOR:
            return {loading:true}
        case LIST_DOCTOR_SUCCESS:
            return {loading:false,availableDoctors:action.payload}
        case LIST_DOCTOR_FAIL:
            return {loading:false,error:action.payload}  
        default:
            return state          
    }
}    