import React, { createContext, useEffect, useState } from "react"
import { getDoctors } from "../services/api";
import { IDoctor } from "../interfaces/IDoctor";
import { DoctorProviderProps } from "../interfaces/DoctorProviderProps";
import { DoctorContextType } from "../interfaces/DoctorContextType";

export const DoctorContext = createContext<DoctorContextType | undefined>(undefined)

const DoctorProvider: React.FC<DoctorProviderProps> = ({children}) => {
    const [doctores, setDoctores] = useState<IDoctor[]>([])
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchDoctores = async () => {
            try {
                const data: IDoctor[] = await getDoctors()
                setDoctores(data)
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message)
                }
            }
        }
        fetchDoctores()
    }, [doctores])

    return (
        <DoctorContext.Provider value={{doctores, error, setDoctores, setError}}>
            {children}
        </DoctorContext.Provider>
    )
}

export default DoctorProvider
