import React, { createContext, useContext, useEffect, useState } from "react"
import { decrypData, encryptData } from "../utils/encryption"
import { IAuthContextType } from "../interfaces/IAuthContextType";
import { IAuthProviderProps } from "../interfaces/IAuthProviderProps";

const AuthContext = createContext<IAuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<IAuthProviderProps> = ({children}) => {
    const [user, setUser] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(()=> {
        const storedUser = localStorage.getItem('user')
        if(storedUser){
            const decrypteduser = decrypData(storedUser)
            setUser(decrypteduser)
        }
        setLoading(false)
    }, [])

    const login = (role: string) => {
        const userData: string = role
        setUser(userData)
        const encryptUser = encryptData(userData)
        localStorage.setItem('user',encryptUser)
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
    }

    const value = {
        user, login, logout, isAuthenticated: !!user
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading ? children : <p>Cargando...</p>}
        </AuthContext.Provider>
    )
}

export const useAuth = (): IAuthContextType => {
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("UseAuth debe estar dentro de AuthProvider")
    }
    return context
}
