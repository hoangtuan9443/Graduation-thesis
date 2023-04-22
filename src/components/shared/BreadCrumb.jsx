import React from 'react'
import { Breadcrumb } from 'antd'
import './breadCrumb.css'

function BreadCrumb({list}) {
    return (
        <div className='BreadCrumb'>
            <Breadcrumb>
                {
                    list.map((item, index) => {
                        return (
                            <Breadcrumb.Item className='BreadCrumb__item' key={index}>
                                {item}
                            </Breadcrumb.Item>
                        )
                    })
                }
            </Breadcrumb>
        </div>
    )
}

export default BreadCrumb
