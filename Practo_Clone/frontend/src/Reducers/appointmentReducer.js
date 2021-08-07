import {LIST_APPOINTMENTS,
    LIST_APPOINTMENTS_SUCCESS,
    LIST_APPOINTMENTS_FAIL,CREATE_APPOINTMENTS,CREATE_APPOINTMENTS_FAIL,CREATE_APPOINTMENTS_SUCCESS,GET_SLOT,
    GET_SLOT_SUCCESS,
    GET_SLOT_FAIL} from "./type.js"



export const listAppointmetsReducer = (state ={appointments:[]},action)=>{
    switch(action.type){
        case LIST_APPOINTMENTS:
            return{loading:true}
        case LIST_APPOINTMENTS_SUCCESS:
            return {loading:false,appointments:action.payload}

        case  LIST_APPOINTMENTS_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
    
}    
export const createAppointmetsReducer = (state ={newAppointment:[]},action)=>{
    switch(action.type){
        case CREATE_APPOINTMENTS:
            return{loading:true}
        case CREATE_APPOINTMENTS_SUCCESS:
            return {loading:false,newAppointment:action.payload}

        case  CREATE_APPOINTMENTS_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
    
}    

export const getSlots =(state={available_slots:[]},action)=>{
    switch(action.type){
        case GET_SLOT:
            return{loading:true}
        case GET_SLOT_SUCCESS:
            return {loading:false,available_slots:action.payload}

        case GET_SLOT_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }

}