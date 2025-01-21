import React, { useContext, useEffect, useRef, useState } from "react";
import { DoctorContext } from "../context/DoctorContext";
import { getDoctors } from "../services/api";
import { IAppointmentFormProps } from "../interfaces/IAppointmentFormProps";
import { IFormCita } from "../interfaces/IFormCita";
import { IDoctor } from "../interfaces/IDoctor";

const AppointmentForm: React.FC<IAppointmentFormProps> = ({submitForm}) => {
    const context = useContext(DoctorContext)
    if (!context){
        throw new Error('La lista de doctores debe usarse dentro de un DoctorProvider')
    }

    const {doctores, setDoctores, setError} = context
    const [formCita, setFormCita] = useState<IFormCita>({
        nombre: '',
        especialidad: '',
        fecha: ''
    })

    const nombreRef = useRef<HTMLInputElement>(null)
    const doctorRef = useRef<HTMLSelectElement>(null)
    const especialidadRef = useRef<HTMLInputElement>(null)
    const fechaRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if(nombreRef.current){
            nombreRef.current.focus()
        }
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormCita({...formCita, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        submitForm(formCita)
        if(nombreRef.current && doctorRef.current && especialidadRef.current && fechaRef.current){
            nombreRef.current.value = ''
            doctorRef.current.value = ''
            especialidadRef.current.value = ''
            fechaRef.current.value = ''
            nombreRef.current.focus()
        }
    }

    const selectEspecialidad = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormCita({...formCita, especialidad: e.target.value})
    }

    const recargarDoctores = async () => {
        try {
            const data: IDoctor[] = await getDoctors()
            setDoctores(data)
        } catch (error) {
            if(error instanceof Error){
                setError(error.message)
                setDoctores([])
            }
        }
    }

    return (
<form className="bg-light p-4 shadow rounded" onSubmit={handleSubmit}>
            <h1 className="text-center mb-4">Formulario de Citas</h1>
            <div className="mb-3">
                <label className="form-label">Nombre</label>
                <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-person-fill"></i></span>
                    <input className="form-control" type="text" name="nombre" value={formCita.nombre} ref={nombreRef} onChange={handleChange} placeholder="Ingrese su nombre" required/>
                </div>
            </div>
            <div className="mb-3">
                <label className="form-label">Doctor</label>
                <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-capsule"></i></span>
                    <select ref={doctorRef} className="form-select" onChange={selectEspecialidad} required>
                        <option value="">Seleccionar Doctor</option>
                        {
                            doctores.map(doctor=>(
                                <option key={doctor.id} value={doctor.especialidad}>{doctor.nombre}</option>
                            ))
                        }
                    </select>
                    <button className="btn btn-outline-secondary" onClick={() => recargarDoctores()}><i className="bi bi-arrow-clockwise"></i></button>
                </div>
            </div>
            <div className="mb-3">
                <label className="form-label">Especialidad</label>
                <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-capsule"></i></span>
                    <input className="form-control" type="text" name="especialidad" value={formCita.especialidad} ref={especialidadRef} required disabled/>
                </div>
            </div>
            <div className="mb-3">
                <label className="form-label">Fecha</label>
                <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-calendar"></i></span>
                    <input className="form-control" type="date" name="fecha" value={formCita.fecha} ref={fechaRef} onChange={handleChange} required/>
                </div>
            </div>
            <button type="submit" className="btn btn-outline-secondary w-100">
                <i className="bi bi-send-fill"></i> Enviar
            </button>
        </form>
    )
}

export default AppointmentForm
