import {GET_PRESCRIPTION,
    GET_PRESCRIPTION_SUCCESS,
    GET_PRESCRIPTION_FAIL} from "./type"

export const getPrescriptionReducer = (state ={prescriptions:[]},action)=>{
    switch(action.type){
        case GET_PRESCRIPTION:
            return {loading:true}
        case GET_PRESCRIPTION_SUCCESS:
            return {loading:false,prescriptions:action.payload}
        case GET_PRESCRIPTION_FAIL:
            return {loading:false,error:action.payload}  
        default:
            return state          
    }
}    