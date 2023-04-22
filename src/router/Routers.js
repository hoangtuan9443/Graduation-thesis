import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import Home from '../components/Dashboard' 
import Login from '../components/Login'
import Register from '../components/Register'

function Routers() {
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/home' />} />
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
        </Routes>
    )
}

export default Routers
