import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { getCalender, weekDays } from "../utils"
function Monthviews({ year, month, date }) {

    const calender = getCalender(month, year)

    return (
        <Container>
            <Row style={{ "marginTop": "50px" }} className="theme">
                {
                    weekDays.map((day, index) => {
                        return (
                            <Col key={index} md={1} className="month-view">
                                <h4>{day}</h4>
                            </Col>
                        )
                    })
                }
            </Row>
            {
                calender.map((items, index) => {
                    return (
                        <Row key={index}>
                            {
                                items.map((item, index) => {
                                    return (
                                        <Col key={index} md={1} className="month-view" >
                                            <div style={{ "marginLeft": "55px", "width": "25px", "height": "25px" }} className={item === date ? "selected" : null} >
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



        </Container >
    )
}

export default Monthviews
