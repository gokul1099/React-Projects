import React from 'react'
import { Row, Col, Button } from "react-bootstrap"
import { getCalender, months, weekDays } from "../utils"
const Yearviews = ({ year }) => {
    const yearIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    const view = yearIndex.map(function (item, index) {
        const month = getCalender(item, year)
        return (
            <div key={months[index]} className="year-view">
                <Row md={1}>
                    <h3>{months[index]}</h3>
                    {
                        weekDays.map((week) => (
                            <Col key={week} sm={1} style={{ "height": "30px", "width": "40px" }}>
                                <h6>{week}</h6>
                            </Col>
                        ))
                    }
                </Row >
                <Row className="each-month">
                    {
                        month.map((items, index) => {
                            return (

                                <Row key={index} md={8} style={{ "height": "50px" }}>
                                    {
                                        items.map((item, index) => {
                                            return (
                                                <Col key={index} md={1} style={{ "height": "10px", "width": "40px", "paddingLeft": "20px" }} >
                                                    <Button style={{ "border": "none", "background": "none", "color": "black" }}><h6>{item !== 0 ? item : ""}</h6></Button>
                                                </Col>
                                            )
                                        })
                                    }
                                </Row>
                            )
                        })
                    }
                </Row>


            </div>

        )
    })

    return (
        <div className="view-container">
            {view}
        </div>

    )

}

export default Yearviews
