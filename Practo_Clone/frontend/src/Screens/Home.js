import React from 'react'
import { Image, Container, Col, Form, InputGroup, Row } from 'react-bootstrap'
import banner from "../images/home-banner.png"
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
const Home = () => {

    return (
        <>
            <Container style={{ "marginTop": "25px", "marginBottom": "25px" }}>

                <Form>
                    <Row>
                        <Col xs="3" style={{ "margin": "0", "padding": "0" }}>
                            <InputGroup>
                                <div style={{ "border": "1px solid #dde2de", "borderRight": "none", }}>
                                    <LocationOnOutlinedIcon style={{ "marginTop": "5px" }} />
                                </div>
                                <Form.Control type="text" placeholder="Chennai" style={{ "border": "1px solid #dde2de", "borderLeft": "none", "padding": "5px" }} prefix="input-border" />
                            </InputGroup>
                        </Col>
                        <Col xs="6" style={{ "margin": "0", "padding": "0" }}>
                            <InputGroup>
                                <div style={{ "border": "1px solid #dde2de", "borderRight": "none", }}>
                                    <SearchOutlinedIcon style={{ "marginTop": "5px" }} />
                                </div>
                                <Form.Control type="text" placeholder="search doctors, clinics, hospitals, etc" style={{ "border": "1px solid #dde2de", "borderLeft": "none", "padding": "5px" }} prefix="input-border" />
                            </InputGroup>
                        </Col>
                    </Row>
                </Form>
            </Container>
            <Image src={banner} fluid />
        </>
    )
}
export default Home