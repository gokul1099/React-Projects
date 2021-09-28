import { useState } from 'react';
import { APP_NAME } from "../config"
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import Link from "next/link"
import { signout, isAuth } from "../actions/auth"
import Router from 'next/router';



const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div>
            <Navbar color="light" light expand="md">
                <Link href="/">
                    <NavbarBrand className="font-weight-bold"><h2>{APP_NAME}</h2></NavbarBrand>
                </Link>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ms-auto" navbar>
                        {!isAuth() && (<>
                            <NavItem>
                                <Link href="/signin">
                                    <NavLink style={{ "cursor": "pointer" }}>Sign In</NavLink>
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link href="/signup">
                                    <NavLink style={{ "cursor": "pointer" }}>Sign Up</NavLink>
                                </Link>
                            </NavItem>
                        </>)}
                        {
                            isAuth() && (<NavItem>
                                <NavLink style={{ "cursor": "pointer" }} onClick={() => signout(() => Router.replace("/signin"))}>SignOut</NavLink>
                            </NavItem>)
                        }
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );

}


export default Header