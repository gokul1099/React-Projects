import {UPDATE_PERSONAL_DETAIL,
    UPDATE_PERSONAL_DETAIL_SUCCESS,
    UPDATE_PERSONAL_DETAIL_FAIL} from "./type"

export const  updatePatient =(state={},action)=>{
        switch(action.type){
            case UPDATE_PERSONAL_DETAIL:
                return{loading:true}
            case UPDATE_PERSONAL_DETAIL_SUCCESS: 
                return {loading:false,updateInfo:action.payload} 
            case UPDATE_PERSONAL_DETAIL_FAIL:
                return {loading:false,error:action.payload}   
            default:
                return state    
        }
    }
    