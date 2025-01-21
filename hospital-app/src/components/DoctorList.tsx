import { useContext } from "react"
import { DoctorContext } from "../context/DoctorContext"
import DoctorCard from "./DoctorCard";
import { IDoctor } from "../interfaces/IDoctor";

const DoctorList = () => {
    const context = useContext(DoctorContext)
    if (!context){
        throw new Error('La lista de doctores debe usarse dentro de un DoctorProvider')
    }

    const {doctores, error} = context

    if(error) return <p style={{color: 'red'}}>Error: {error}</p>
    if(!doctores) return <p>Loading...</p>
    return (
        <section className="row px-5">
            {
                doctores.map((doctor: IDoctor) => (
                    <DoctorCard
                        key = {doctor.id}
                        img = {doctor.img}
                        nombre = {doctor.nombre}
                        especialidad = {doctor.especialidad}
                        aniosExp = {doctor.aniosExp}
                        descripcion = {doctor.descripcion}
                    />
            ))
            }
        </section>
    )
}

export default DoctorList
