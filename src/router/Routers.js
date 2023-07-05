import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import Home from '../components/Dashboard' 
import Login from '../components/Login'

function Routers() {
    let accountExist = localStorage.getItem('account')
    
    return (
        <Routes>
            {
                accountExist 
                ? <Route path='/' element={<Navigate to='/home' />} /> 
                : <Route path='/' element={<Navigate to='/login' />} />
            }
            {
                accountExist 
                ? <Route path='/home' element={<Home />} />
                : <Route path='/home' element={<Navigate to='/login' />} />
            }
            <Route path='/login' element={<Login />} />
        </Routes>
    )
}

export default Routers
