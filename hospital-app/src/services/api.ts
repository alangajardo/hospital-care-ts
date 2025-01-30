import axios from "axios";
import { IDoctor } from "../interfaces/IDoctor";
import { IFormCita } from "../interfaces/IFormCita";

const apiCliente = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 1000
});

//Doctores
export const getDoctors = async () => {
    try {
        const response = await apiCliente.get("/doctores")
        return response.data;
    } catch (error) {
        throw new Error("Fallo al rescatar datos" + error);
    }
}

export const createDoctor = async (token: string, doctor: IDoctor) => {
    try {
        const response = await apiCliente.post("/doctores", doctor, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data;
    } catch (error) {
        throw new Error("Fallo al rescatar datos" + error);
    }
}

export const deleteDoctor = async (token: string, id: string) => {
    try {
        const response = await apiCliente.delete(`/doctores/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data;
    } catch (error) {
        throw new Error("Fallo al rescatar datos" + error);
    }
}

//Citas
export const getCitas = async (token: string) => {
    try {
        const response = await apiCliente.get('/citas', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        console.log("Error al obtener los datos protegidos", error)
        throw new Error("Fallo al rescatar datos" + error);
    }
}

export const createCita = async (cita: IFormCita) => {
    try {
        const response = await apiCliente.post("/citas", cita)
        return response.data;
    } catch (error) {
        throw new Error("Fallo al rescatar datos" + error);
    }
}
