import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({children}) {

    if (localStorage.getItem("token-ToDo-List") == null) {
        return <Navigate to="/Login" />
    }

    return <>
        {children}
    </>
}
