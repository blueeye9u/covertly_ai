import React from 'react'
import { ColorRing } from 'react-loader-spinner'

const OvalLoader = () => {
    return (
        <div>
          
          <ColorRing
  visible={true}
  height="22"
  width="22"
  ariaLabel="color-ring-loading"
  wrapperStyle={{}}
  wrapperClass="color-ring-wrapper"
  colors={['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF']}
  />
        </div>
    )
}

export default OvalLoader