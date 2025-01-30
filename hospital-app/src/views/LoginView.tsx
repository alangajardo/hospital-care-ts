import LoginForm from "../components/LoginForm"
import MainLayout from "../layouts/MainLayout"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { IFormLogin } from "../interfaces/IFormLogin"

const LoginView = () => {
    const {login} = useAuth()
    const navigate = useNavigate()

    const submitForm = (formLogin: IFormLogin) => {
        if(formLogin.usuario=="admin" && formLogin.clave=="admin"){
            login("admin")
            navigate("/")
        }else if(formLogin.usuario=="doctor" && formLogin.clave=="doctor"){
            login("doctor")
            navigate("/")
        }else{
            alert("Credenciales incorrectas")
        }

    }
    
    return (
        <MainLayout>
            <LoginForm submitForm={submitForm}/>
        </MainLayout>
    )
}

export default LoginView
