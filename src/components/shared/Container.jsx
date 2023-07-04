import React from 'react'
import { Spin } from 'antd'

function Container({loading = false, children}) {
    return (
        <Spin spinning={loading} tip='Loading' style={{zIndex: 1}}>
            <div style={{position: 'relative', display: 'flex', width: '100%', height: '100vh', zIndex: 12}}>
                    {children}
            </div>
        </Spin>
    )
}

export default Container
