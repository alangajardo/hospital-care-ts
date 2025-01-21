import axios from "axios";

const apiCliente = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 1000,
});

export const getDoctors = async () => {
    try {
        const response = await apiCliente.get("/doctores")
        return response.data;
    } catch (error) {
        throw new Error("Fallo al rescatar datos" + error);
    }
}