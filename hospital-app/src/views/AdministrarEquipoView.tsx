import { useContext, useState } from "react"
import { useAuth } from "../context/AuthContext"
import MainLayout from "../layouts/MainLayout"
import { DoctorContext } from "../context/DoctorContext"
import DoctorForm from "../components/DoctorForm"
import { IDoctor } from "../interfaces/IDoctor"
import { createDoctor, deleteDoctor } from "../services/api"

const AdministrarEquipoView = () => {
    const {user} = useAuth()
    
    const context = useContext(DoctorContext)
    if (!context){
        throw new Error('La lista de doctores debe usarse dentro de un DoctorProvider')
    }
    const {doctores, error} = context
    
    const [errorCreate, setErrorCreate] = useState<string | null>(null)
    const submitForm = async (data: IDoctor) => {
        try {
            const token = localStorage.getItem('user')
            if(!token){
                setErrorCreate("No se encontró un token válido. Inicia sesión de nuevo")
                return
            }
            await createDoctor(token, data)
        } catch (error) {
            setErrorCreate(`Token inválido o no autorizado ${error}`)
        }
    }
    
    const eliminarDoctor = async (id: number | undefined) => {
        try {
            const token = localStorage.getItem('user')
            if(!token){
                setErrorCreate("No se encontró un token válido. Inicia sesión de nuevo")
                return
            }
            if(id){
                console.log(id)
                await deleteDoctor(token, id.toString())
            }
        } catch (error) {
            setErrorCreate(`Token inválido o no autorizado ${error}`)
        }
    }

    if(error) return <p style={{color: 'red'}}>Error: {error}</p>
    if(!doctores) return <p>Loading...</p>

    return (
        <MainLayout>
            <div className="container mt-4">
                <h2 className="text-center mb-4">Registro de Doctores</h2>
                {user==='admin' && (
                    <>
                        {errorCreate && <p style={{color: 'red'}}>{errorCreate}</p>}
                        <DoctorForm submitForm={submitForm}/>
                        <h3 className="mt-5 text-center">Lista de Doctores</h3>
                        <ul className="list-group mt-3">
                            {doctores.map(doctor => (
                                <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-action" key={doctor.id}>
                                    <span>{doctor.nombre}</span>
                                    <button className="btn btn-danger btn-sm" onClick={() => eliminarDoctor(doctor.id)}>Eliminar</button>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
                {user!=='admin' && (
                    <>
                        <p>Bienvenido, no tienes acceso</p>
                        <p>Consulta con el administrador para más información</p>
                    </>
                )}
            </div>
        </MainLayout>
    )
}

export default AdministrarEquipoView
