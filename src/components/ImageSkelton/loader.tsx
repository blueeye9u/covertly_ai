import React from 'react'
import { Oval } from 'react-loader-spinner'

const Loader = () => {
    return (
        <div>
            <Oval
                visible={true}
                height="20"
                width="20"
                color="#919597"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass="font-bold"
            />
        </div>
    )
}

export default Loader