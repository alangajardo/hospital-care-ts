import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import React from "react"
import { IProtectedRouteProps } from "../interfaces/IProtectedRouteProps"

const ProtectedRoute: React.FC<IProtectedRouteProps> = ({children, allowRoles}) => {
    const {user} = useAuth()

    if(!user){
        return <Navigate to="/login"/>
    }
    if(!allowRoles.includes(user)){
        return <Navigate to="/"/>
    }

    return children
}

export default ProtectedRoute
