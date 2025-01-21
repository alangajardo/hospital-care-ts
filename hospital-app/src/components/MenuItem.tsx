import React from "react"
import { IMenuItemProps } from "../interfaces/IMenuItemProps"

const MenuItem: React.FC<IMenuItemProps> = ({handleNavigation, view, activeView}) => {
    return (
        <li className="nav-item">
            <a className={`nav-link ${activeView ? "active" : ""}`} href="#" onClick={(e: React.FormEvent) => handleNavigation(e, view)}>{view}</a>
        </li>
    )
}

export default MenuItem
