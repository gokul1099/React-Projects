import React from 'react'
import ReactStars from "react-rating-stars-component";

function Rating(props) {
    return (
        <div>
            <ReactStars {...props} onChange={(value) => props.setRating({ stars: value })} />
        </div>

    )
}

export default Rating
