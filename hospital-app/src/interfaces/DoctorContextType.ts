import { Dispatch, SetStateAction } from "react";
import { IDoctor } from "./IDoctor";

export interface DoctorContextType {
    doctores: IDoctor[];
    error: string | null;
    setDoctores: Dispatch<SetStateAction<IDoctor[]>>;
    setError: Dispatch<SetStateAction<string | null>>;
};