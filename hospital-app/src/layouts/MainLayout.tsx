import React from "react"
import { useAuth } from "../context/AuthContext"
import Menu from "../components/Menu"
import Footer from "../components/Footer"
import { IMainLayoutProps } from "../interfaces/IMainLayoutProps"

const MainLayout: React.FC<IMainLayoutProps> = ({children}) => {
    const {user, logout} = useAuth()

    return (
        <React.Fragment>
            <header>
                <Menu user={user} logout={logout}/>
            </header>
            <main>
                {children}
            </main>
            <Footer />
        </React.Fragment>
    )
}

export default MainLayout