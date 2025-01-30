import React from "react"
import { IMenuItemProps } from "../interfaces/IMenuItemProps"
import { Link } from "react-router-dom"

const MenuItem: React.FC<IMenuItemProps> = ({view, text, logout}) => {
    if(view=='logout'){
        return (
            <li className="nav-item">
                <button onClick={logout} style={{ border: "none", background: "none", cursor: "pointer" }} className="nav-link">{text}</button>
            </li>
        )
    }    
    return (
        <li className="nav-item">
            <Link to={view=='home' ? '/' :`/${view}`} className="nav-link">{text}</Link>
        </li>
    )
    

}

export default MenuItem
