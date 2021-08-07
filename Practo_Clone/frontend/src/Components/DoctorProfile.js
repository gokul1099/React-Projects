import React, { useState } from 'react'
import { Row, Col, FormControl, Button } from "react-bootstrap"
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux"
import updateAvatar from "../Actions/UploadAvatar"


function DoctorProfile() {
    const { userInfo } = useSelector(state => state.userLogin)
    var user = ""
    if (userInfo) {
        user = userInfo.user
    }
    const avatar = user.avatar
    const dispatch = useDispatch()
    const [image, setImage] = useState(null)
    const handleUploadImage = () => {
        dispatch(updateAvatar(image, user._id, user.isDoctor))
    }
    return (
        <div>
            <Row>
                <Col sm="5">
                    {
                        user.avatar ? (<img src={`data:image/JPG;base64,${avatar}`} alt="avatar" />) : <FaUser fontSize="150px" style={{ "marginLeft": "160px" }} />
                    }
                    <Row style={{ "marginTop": "50px", "paddingLeft": "150px" }}>
                        <div className="mb-3">
                            <FormControl type="file" onChange={(e) => setImage({ image: e.target.files[0] })} />
                            <Button variant="primary" onClick={() => handleUploadImage()}>Upload</Button>
                        </div>
                    </Row>

                </Col>
                <Col sm="5">
                    <h4>Name  :  {user.name}</h4>
                    <hr />
                    <h4>Email : {user.email}</h4>
                    <hr />
                    <h4>Specialisaton : {user.specialisation}</h4>
                </Col>
            </Row>

        </div>
    )
}

export default DoctorProfile
