import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import Home from '../components/Dashboard' 
import Login from '../components/Login'

function Routers() {
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/home' />} />
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<Login />} />
        </Routes>
    )
}

export default Routers
