import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Navbar, Container, Nav, Image, Col, Button, NavDropdown } from "react-bootstrap"
import logo from '../images/Practo-logo.png'
import { Link } from "react-router-dom"
import { logout } from "../Actions/UserLogin"
import Alert from "../Components/Alerts"


const NavBar = ({ location, history }) => {
    const [isLogout, setIsLogout] = useState(false)
    const { userInfo } = useSelector(state => state.userLogin)
    const dispatch = useDispatch()
    var user = ""
    if (userInfo) {
        user = userInfo.user
    }

    const handleLogout = () => {
        dispatch(logout())
        setIsLogout(true)

    }
    return (
        <Navbar style={{ "backgroundColor": "white", "border": "1px solid #dde2de" }}>
            <Container>
                <Navbar.Brand href="/">
                    <Col>
                        <Image src={logo} className="logo-image" bsPrefix=".logo-image" fluid />
                    </Col>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/" style={{ "textDecoration": 'none' }}>
                            <div>
                                <h5 >Doctors</h5>
                                <h6>Book an appointment</h6>
                            </div>
                        </Link>

                    </Nav>
                    {user ? (
                        <NavDropdown title={user.name} id="username" className="ml-auto">
                            <NavDropdown.Item componentClass={Link} href="/user/dashboard" to="/user/dashboard" >
                                DashBoard
                            </NavDropdown.Item>
                            <NavDropdown.Item componentClass={Link} href="/login" to="/login" onClick={() => handleLogout()}>
                                Logout
                            </NavDropdown.Item>
                            <NavDropdown.Item componentClass={Link} href="/user/profile" to="/user/profile" >
                                My Profile
                            </NavDropdown.Item>

                        </NavDropdown>
                    ) : (
                        <Nav className="ml-auto" to="/login" style={{ "textDecoration": 'none' }}>
                            <Link to="/login" >
                                <Button variant="light" bsPrefix="login-btn" className="login-btn">Login / Signup</Button>
                            </Link>
                        </Nav>
                    )}

                </Navbar.Collapse>
            </Container>
            {
                isLogout ? (<Alert msg={"Logged out successfully!!"} />) : null
            }
        </Navbar>

    )
}

export default NavBar