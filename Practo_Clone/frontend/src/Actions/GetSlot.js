import {GET_SLOT,
    GET_SLOT_SUCCESS,
    GET_SLOT_FAIL} from "../Reducers/type"

const getSlot =(data)=>async (dispatch) =>{
    try{
        dispatch({
            type:GET_SLOT,
        })
        
        dispatch({
            type: GET_SLOT_SUCCESS,
            payload:data,
        })
    }
    catch(error){
        dispatch({
            type : GET_SLOT_FAIL,
            payload: "some error occured"
                
        })
    }

}

export default getSlot