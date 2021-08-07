import React from 'react';
import { hoursPerDay } from "../utils";

const HoursViews = () => {
    return (
        <div className="hour-view-container">
            {
                hoursPerDay.map((hour, index) => {
                    return (
                        <div key={index} className="hour-view">
                            <div className="hour-view-hour">
                                <h6>{hour}</h6>
                            </div>
                            <div className="hour-view-line">
                                <div className="hour-view-line-inner"></div>
                            </div>
                        </div>
                    )
                })
            }
        </div>

    )
}
export default HoursViews;