import AppointmentForm from "../components/AppointmentForm"
import { IFormCita } from "../interfaces/IFormCita"

const AppointmentsView = () => {
    const submitForm = (data: IFormCita) => {
        console.log(data)
    }

    return (
        <AppointmentForm submitForm={submitForm}/>
    )
}

export default AppointmentsView
