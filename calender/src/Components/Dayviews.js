import React from 'react'
import { Container, Row, Col } from "react-bootstrap"
import { weekDays, months } from '../utils'
import HoursViews from "./HoursView"
function Dayviews({ day, date, year, month }) {
    return (
        <Container>
            <Row>
                <Col md={12}>
                    <div className="date-view theme">
                        <div className="date-view-item">
                            <h6>{weekDays[day]}</h6>
                        </div>
                        <div className="date-view-item">
                            <h6>{months[month]}</h6>
                        </div>
                        <div className="date-view-item">
                            <h2>{date}</h2>
                        </div>
                        <div className="date-view-item">
                            <h6>{year}</h6>
                        </div>
                    </div>
                </Col>
                <div className="empty-div"></div>
                <hr />
            </Row>
            <Row>
                <HoursViews />
            </Row>

        </Container>
    )
}

export default Dayviews
