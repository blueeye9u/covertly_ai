
import React from 'react'

const LiveSupportPart = () => {
    return (
        <div style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
            <iframe
                src="/support/chat-frame"
                title="Support Chat Frame"
                style={{
                    border: 'none',
                    width: '80%',
                    height: '80%'
                }}
            />
        </div>
    )
}

export default LiveSupportPart



