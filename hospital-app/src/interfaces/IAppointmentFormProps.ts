import { IFormCita } from "./IFormCita";

export interface IAppointmentFormProps {
    submitForm: (FormCita: IFormCita) => void;
}
