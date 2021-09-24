import { useState } from 'react';
import { APP_NAME } from "../config"
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import Link from "next/link"
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
                        <NavItem>
                            <Link href="/signin">
                                <NavLink>Sign In</NavLink>
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link href="/signup">
                                <NavLink>Sign Up</NavLink>
                            </Link>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );

}


export default Header