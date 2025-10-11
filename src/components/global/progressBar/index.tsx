import React from 'react'
import ProgressBar from "@ramonak/react-progress-bar";

const Progressbar = () => {
    return (
        <div className='w-full progressbar'>
            <ProgressBar completed={60} bgColor='#27AE60' height='12px' maxCompleted={100}/>
        </div>
    )
}

export default Progressbar