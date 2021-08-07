import React, { useState } from 'react';
import TimePicker from 'react-time-picker';
import {Row,Col } from "react-bootstrap"

export default function TimeRangePicker(props) {
  const [start, setStart] = useState('10:00');
  const [end,setEnd] = useState('10:00')
  props.setStart(start)
  props.setEnd(end)
  return (
    <div>
     <Row>
        <Col>
            Start Time : 
        </Col>
        <Col>
        <TimePicker
        onChange={setStart}
        value={start}
        disableClock ={true}
      />
        </Col>
     </Row>
     <Row>
        <Col>
            End Time : 
        </Col>
        <Col>
        <TimePicker
        onChange={setEnd}
        value={end}
        disableClock ={true}
      />
        </Col>
     </Row>
    </div>
  );
}
