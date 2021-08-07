import {
    UPLOAD_AVATAR,
    UPLOAD_AVATAR_SUCCESS,
    UPLOAD_AVATAR_FAIL
} from "../Reducers/type"

import axios from "axios"

const updateAvatar = (image, id, isDoctor) => async (dispatch) => {

    dispatch({
        type: UPLOAD_AVATAR,
    })
    var { token } = JSON.parse(localStorage.getItem('userInfo'))
    var formData = new FormData()
    formData.append("avatar", image.image)

    var api = isDoctor ? "doctorprofilepic" : "patientprofilepic"

    axios.post(`/${api}`,
        formData,
        {
            params: { id },
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${token}`
            }
        }
    ).then(function () {
        dispatch({
            type: UPLOAD_AVATAR_SUCCESS,
            payload: "SUCCESS"
        })
    })
        .catch(function () {
            dispatch({
                type: UPLOAD_AVATAR_FAIL,
                data: "Failed"
            })
        });

}
export default updateAvatar
