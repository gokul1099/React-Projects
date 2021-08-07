import React from 'react'
import LoadingOverlay from 'react-loading-overlay';
const LoadingSpinner = () => {
    return (
        <LoadingOverlay

            spinner
            text='Loading..'
        >
        </LoadingOverlay>
    )
}
export default LoadingSpinner
