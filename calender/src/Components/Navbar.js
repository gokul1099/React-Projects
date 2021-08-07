import React from "react"
import { Navbar, Container, DropdownButton, Dropdown } from "react-bootstrap"
import "./styles.css"
const Navigation = ({ selectedViews }) => {
    const [view, setView] = React.useState("day")
    React.useEffect(() => {
        selectedViews(view)
    }, [view, selectedViews])
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Calender</Navbar.Brand>
                <div className="ms-auto">
                    <DropdownButton
                        variant="outline-secondary" title={view ? view : "views"} id="input-group-dropdown-1" >
                        <Dropdown.Item onClick={() => setView("day")} >Day</Dropdown.Item>
                        <Dropdown.Item onClick={() => setView("month")}>Month</Dropdown.Item>
                        <Dropdown.Item onClick={() => setView("year")}>Year</Dropdown.Item>
                    </DropdownButton>
                </div>

            </Container>
        </Navbar >
    )
}

export default Navigation
