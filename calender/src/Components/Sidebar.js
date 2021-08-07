import React from 'react'
import { Row, Col, Button } from "react-bootstrap"
import { weekDays, getCalender, months } from '../utils'
import { BsFillCaretRightFill } from "react-icons/bs";
import { BsFillCaretLeftFill } from "react-icons/bs";

const Sidebar = ({ selectDay, selectDate, selectMonth, selectYear }) => {
    const [currMonth, setCurrMonth] = React.useState(new Date().getMonth())
    const [currYear, setCurrYear] = React.useState(new Date().getFullYear())
    const [currDay, setCurrDay] = React.useState(new Date().getDay())
    const calender = getCalender(currMonth, currYear)
    console.log(calender)
    const [selectedDate, setSelectedDate] = React.useState(new Date().getDate())
    React.useEffect(() => { }, [currMonth, currYear, selectedDate])
    const moveLeft = () => {
        if (currMonth === 0) {
            setCurrMonth(11)
            setCurrYear(currYear - 1)
        }
        else {
            setCurrMonth(currMonth - 1)

        }


    }
    const moveRight = () => {
        if (currMonth === 11) {
            setCurrMonth(0)
            setCurrYear(currYear + 1)
        }
        else {
            setCurrMonth(currMonth + 1)
        }
    }

    const handleSelectDate = (item) => {
        setSelectedDate(item)
        console.log("from sidebat" + item)
        setCurrDay(new Date(currYear, currMonth, selectedDate).getDay())
    }
    React.useEffect(() => {
        selectDate(selectedDate)
        selectYear(currYear)
        selectMonth(currMonth)
        selectDay(currDay)
    }, [currMonth, currYear, selectedDate, currDay, selectDate, selectMonth, selectDay, selectYear])
    return (
        <div>
            <div>
                <Row >
                    <Row style={{ "marginLeft": "20px", "marginTop": "20px" }} >
                        <Col md={1}><Button style={{ "border": "none", "background": "none", "color": "black" }} onClick={() => moveLeft()}><BsFillCaretLeftFill /></Button></Col>
                        <Col md={2} style={{ "marginLeft": "40px", "alignText": "center" }}><h5>{months[currMonth] + " " + currYear}</h5></Col>
                        <Col md={1}><Button style={{ "border": "none", "background": "none", "color": "black" }} onClick={() => moveRight()}><BsFillCaretRightFill /></Button></Col>
                    </Row>
                </Row>
                <Row md={1}>
                    {
                        weekDays.map((week) => (
                            <Col key={week} sm={1} style={{ "height": "10px", "width": "40px" }}>
                                <h6>{week}</h6>
                            </Col>
                        ))
                    }
                </Row>
                {
                    calender.map((items, index) => {

                        return (
                            <Row key={index} md={1} style={{ "marginTop": "20px" }}>
                                {
                                    items.map((item) => {
                                        return (
                                            <Col sm={1} style={{ "marginLeft": "5px", }} className={selectedDate === item ? "selected" : null}>
                                                <div onClick={() => handleSelectDate(item)}>
                                                    <h6>{item !== 0 ? item : ""}</h6>
                                                </div>

                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        )
                    })
                }

            </div>

        </div>
    )
}

export default Sidebar
