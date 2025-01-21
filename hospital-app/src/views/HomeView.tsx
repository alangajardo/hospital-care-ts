import React, { Profiler, useEffect, useState } from "react"
import HospitalInfo from "../components/HospitalInfo";
import ServiceList from "../components/ServiceList";
import { IServicio } from "../interfaces/IServicio";

function onRenderCallBack(id: string, phase: 'mount' | 'update' | 'nested-update', actualDuration: number, baseDuration: number, startTime: number, commitTime: number){
    console.log({id, phase, actualDuration, baseDuration, startTime, commitTime});
}

const HomeView = () => {
    const [servicios, setServicios] = useState<IServicio[]>([])
    useEffect(() => {
        const fetchServicios = async () => {
            const data: IServicio[] = [
                {id: 1, nombre: "Urgencia", descripcion: "El servicio de urgencia de un hospital ofrece atención médica inmediata a pacientes en condiciones críticas, funcionando las 24 horas con personal especializado y equipamiento para estabilizar y diagnosticar.", img: "/assets/servicios/servicio_1.jpg"},
                {id: 2, nombre: "Telemedicina", descripcion: "El servicio de telemedicina proporciona atención médica a distancia mediante tecnologías como videollamadas y chats, permitiendo consultas sin desplazamientos y optimizando recursos sanitarios, manteniendo la confidencialidad y calidad del cuidado.", img: "/assets/servicios/servicio_2.jpg"},
                {id: 3, nombre: "Paliativos", descripcion: "El servicio de cuidados paliativos mejora la calidad de vida de pacientes con enfermedades avanzadas sin cura, como el cáncer terminal, aliviando el dolor y síntomas, y brindando apoyo a las familias mientras prioriza el confort del paciente.", img: "/assets/servicios/servicio_3.jpg"}
            ]
            setServicios(data)
        }
        fetchServicios()
    }, [])

    const MemoizedComponent = React.memo(ServiceList)

    return (
        <Profiler id="ServicesList" onRender={onRenderCallBack}>
            <HospitalInfo />
            <MemoizedComponent servicios={servicios} />
        </Profiler>
    )
}

export default HomeView
