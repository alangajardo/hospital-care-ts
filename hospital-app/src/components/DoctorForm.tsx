import { useRef, useState } from "react"
import { IDoctor } from "../interfaces/IDoctor"
import { IDoctorFormProps } from "../interfaces/IDoctorFormProps"

const DoctorForm: React.FC<IDoctorFormProps> = ({submitForm}) => {
    const nombreRef = useRef<HTMLInputElement>(null)
    const imagenRef = useRef<HTMLInputElement>(null)
    const especialidadRef = useRef<HTMLSelectElement>(null)
    const aniosRef = useRef<HTMLInputElement>(null)
    const descripcionRef = useRef<HTMLTextAreaElement>(null)

    const [formDoctor, setFormDoctor] = useState<IDoctor>({
            nombre: '',
            img: '',
            especialidad: '',
            aniosExp: 0,
            descripcion: ''
        })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormDoctor({...formDoctor, [e.target.name]: e.target.value})
    }
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if(file){
            setFormDoctor({...formDoctor, [e.target.name]: "/assets/doctores/"+file.name})
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        submitForm(formDoctor)
        if(nombreRef.current && imagenRef.current && especialidadRef.current && aniosRef.current && descripcionRef.current){
            nombreRef.current.value = ''
            imagenRef.current.value = ''
            especialidadRef.current.value = ''
            aniosRef.current.value = ''
            descripcionRef.current.value = ''
            nombreRef.current.focus()
        }
    }

    return (
        <>
            <form className="border p-4 rounded shadow" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre del Doctor</label>
                    <input onChange={handleChange} ref={nombreRef} type="text" className="form-control" name="nombre" placeholder="ingrese nombre" value={formDoctor.nombre}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Imagen</label>
                    <input onChange={handleFileChange} ref={imagenRef} type="file" className="form-control" name="img"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Especialidad</label>
                    <select onChange={handleChange} ref={especialidadRef} className="form-select" name="especialidad" value={formDoctor.especialidad}>
                        <option value="seleccionar">Seleccionar</option>
                        <option value="Traumatología">Traumatología</option>
                        <option value="Ginecología">Ginecología</option>
                        <option value="Pediatría">Pediatría</option>
                        <option value="Neurología">Neurología</option>
                        <option value="Otro">Otro</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Años de Experiencia</label>
                    <input onChange={handleChange} ref={aniosRef} type="number" className="form-control" min="0" name="aniosExp" placeholder="Ingrese años experiencia" value={formDoctor.aniosExp}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <textarea onChange={handleChange} ref={descripcionRef} className="form-control" rows={3} name="descripcion" placeholder="Ingrese descripción" value={formDoctor.descripcion}></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100">Guardar Doctor</button>
            </form>
        </>
    )
}

export default DoctorForm
