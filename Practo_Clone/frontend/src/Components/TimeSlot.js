import React,{useState} from 'react'
import DatePicker from "react-datepicker"
import {Button} from "react-bootstrap"
import {useSelector,useDispatch} from "react-redux"
import "react-datepicker/dist/react-datepicker.css";
import getSlot from "../Actions/GetSlot"


const TimeSlot=(props) => {
    const [startDate, setStartDate] = useState(new Date());
    const dispatch = useDispatch()
    const {appointments} = useSelector(state=>state.appointments)
    
    var slots=[]
    var selectedDate = new Date(startDate).toDateString()
    if(appointments){
      appointments.forEach(function(app){
          var appDate = new Date(app.createdAt).toDateString()
          if(selectedDate === appDate){
            slots.push(app.appointment_time)
        }} )
      }
    const handleSlot=()=>{
        props.setAvailable(!props.available)
        props.setDate(selectedDate)
        dispatch(getSlot(slots))
    }
    return (
        <>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        dateFormat="MMMM d yyyy"
      />
      {props.showSlot ? (
      <Button variant="primary" style={{"marginTop":"10px"}} onClick={()=>handleSlot()}>Get Slots</Button>):props.setDob(startDate)}
      </>
      
    );
  };


export default TimeSlot
