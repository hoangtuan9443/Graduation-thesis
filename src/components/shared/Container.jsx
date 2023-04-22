import React from 'react'

function Container({children}) {
    return (
        <div style={{position: 'relative', display: 'flex', width: '100%', height: '100vh', zIndex: 2}}>
            {children}
        </div>
    )
}

export default Container
