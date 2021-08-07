import React from 'react'
import Sidebar from "../Components/Sidebar"
import { Row, Col } from "react-bootstrap"
import Navigation from "../Components/Navbar"
import Dayviews from '../Components/Dayviews'
import Yearviews from '../Components/Yearviews'
import Monthviews from '../Components/Monthviews'
const Main = () => {
    const [selectedView, setSelectedView] = React.useState("day")
    const [selectedDate, setSelectedDate] = React.useState(new Date().getDate())
    const [selectedDay, setSelectedDay] = React.useState(new Date().getDay())
    const [selectedMonth, setSelectedMonth] = React.useState(new Date().getMonth())
    const [selectedYear, setSelectedYear] = React.useState(new Date().getFullYear())
    console.log(selectedDay)
    return (
        <div>
            <Navigation selectedViews={setSelectedView} />
            <Row>
                <Col className="sidebar" md={3}>
                    <Sidebar selectDate={setSelectedDate} selectMonth={setSelectedMonth} selectDay={setSelectedDay} selectYear={setSelectedYear} />
                </Col>
                <Col className="views">
                    {
                        selectedView && selectedView === "day" ? (<Dayviews day={selectedDay} date={selectedDate} year={selectedYear} month={selectedMonth} />)
                            :
                            selectedView && selectedView === "year" ? (<Yearviews day={selectedDay} date={selectedDate} year={selectedYear} month={selectedMonth} />)
                                :
                                selectedView && selectedView === "month" ? (<Monthviews day={selectedDay} date={selectedDate} year={selectedYear} month={selectedMonth} />) : <h1>No views selected</h1>
                    }
                </Col>
            </Row>
        </div>
    )
}

export default Main
