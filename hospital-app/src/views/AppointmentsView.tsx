import AppointmentForm from "../components/AppointmentForm"
import { IFormCita } from "../interfaces/IFormCita"
import MainLayout from "../layouts/MainLayout"
import { createCita } from "../services/api"

const AppointmentsView = () => {
    const submitForm = async (data: IFormCita) => {
        try {
            const response = await createCita(data)
            if(response){
                alert("Cita agendada con éxito!")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <MainLayout>
            <AppointmentForm submitForm={submitForm}/>
        </MainLayout>
    )
}

export default AppointmentsView
