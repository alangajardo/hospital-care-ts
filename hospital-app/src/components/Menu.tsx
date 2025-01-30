import { useEffect, useState } from "react"
import MenuItem from "./MenuItem"
import { IMenuProps } from "../interfaces/IMenuProps"
import { IView } from "../interfaces/IView"

const Menu: React.FC<IMenuProps> = ({user, logout}) => {
    const menuStyle = {
        height: "100px"
    }

    const [views, setViews] = useState<IView[]>([])
    useEffect(() => {
        const updateViews = [
            {view: 'home', text: 'Home', condition: true},
            {view: 'equipo', text: 'Equipo', condition: true},
            {view: 'citas', text: 'Citas', condition: true},
            {view: 'login', text: 'Login', condition: !user},
            {view: 'reservas', text: 'Reservas', condition: user==='doctor'},
            {view: 'adm-equipo', text: 'Adm. Equipo', condition: user=='admin'},
            {view: 'logout', text: 'Logout', condition: !!user}
        ]
        setViews(updateViews)
    }, [user])

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
            <div className="container-fluid">
                <img className="navbar-brand" src="assets/logo.png" alt="logo hospital" style={menuStyle}/>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {
                            views.filter((view) => view.condition).map((view, index) => (
                                <MenuItem key={index} view={view.view} text={view.text} logout={view.view==='logout'  ? logout : undefined}/>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Menu
