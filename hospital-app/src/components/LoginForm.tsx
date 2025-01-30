import React, { useRef, useState } from "react"
import { ILoginFormProps } from "../interfaces/ILoginFormProps"
import { IFormLogin } from "../interfaces/IFormLogin"

const LoginForm: React.FC<ILoginFormProps> = ({submitForm}) => {
    const [formLogin, setFormLogin] = useState<IFormLogin>({usuario: '', clave: ''})
    const usuarioRef = useRef<HTMLInputElement>(null)
    const claveRef = useRef<HTMLInputElement>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormLogin({...formLogin, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        submitForm(formLogin)
    }

    return (
        <form className="border p-4 rounded shadow" onSubmit={handleSubmit}>
            <h1 className="text-center mb-4">Ingreso de usuario</h1>
            <div className="mb-3">
                <label className="form-label" htmlFor="usuario">Usuario</label>
                <input className="form-control" type="text" placeholder="Ingrese usuario" id="usuario" name="usuario" ref={usuarioRef} value={formLogin.usuario} onChange={handleChange} required/>
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="clave">Clave</label>
                <input className="form-control" type="password" placeholder="Ingrese clave" id="clave" name="clave" ref={claveRef} value={formLogin.clave} onChange={handleChange} required/>
            </div>
            <div>
                <button className="btn btn-outline-primary w-100" type="submit">Login</button>
            </div>
        </form>
    )
}

export default LoginForm
