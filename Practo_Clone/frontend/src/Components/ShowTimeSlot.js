import React from 'react'
import {Button} from "react-bootstrap"
import moment from "moment"

const ShowTimeSlot=(props)=> {

    const getTimeStops=(start, end)=>{
        var startTime = moment(start, 'HH:mm');
        var endTime = moment(end, 'HH:mm');
        
        if( endTime.isBefore(startTime) ){
          endTime.add(1, 'day');
        }
      
        var timeStops = [];
      
        while(startTime <= endTime){
          timeStops.push(new moment(startTime).format('HH:mm'));
          startTime.add(60, 'minutes');
        }
        var slots=[]
        for(var ind =0;ind<timeStops.length-1;ind++){
            slots.push(`${timeStops[ind]} - ${timeStops[ind+1]}`)
        }
        return slots;
    }
      
    
    const slots = getTimeStops(props.start,props.end)
    return (
        
        <div>  
            {
            slots.map((s)=>{
                return(
                <Button variant="outline-success" onClick={()=>props.handleSelectSlot(s)}>
                    {s}
                </Button>)
             })}
            
        </div>
    )
}

export default ShowTimeSlot
