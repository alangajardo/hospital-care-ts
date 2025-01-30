import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { AuthProvider } from "../context/AuthContext"
import DoctorsView from "../views/DoctorsView"
import AppointmentsView from "../views/AppointmentsView"
import HomeView from "../views/HomeView"
import DoctorProvider from "../context/DoctorContext"
import ReservasView from "../views/ReservasView"
import AdministrarEquipoView from "../views/AdministrarEquipoView"
import ProtectedRoute from "./ProtectedRoute"
import LoginView from "../views/LoginView"

const AppRoutes = () => {
    return(
        <AuthProvider>
            <Router>
                <Routes>
                    
                    <Route path="/" element={ <HomeView /> }/>
                    <Route path="/equipo" element={ <DoctorProvider><DoctorsView /></DoctorProvider> }/>
                    <Route path="/citas" element={ <DoctorProvider><AppointmentsView /></DoctorProvider> }/>
                    <Route path="/login" element={ <LoginView /> }/>
                    <Route path="/reservas" element={
                        <ProtectedRoute allowRoles={['doctor']}>
                            <ReservasView />
                        </ProtectedRoute>
                    }/>
                    <Route path="/adm-equipo" element={
                        <ProtectedRoute allowRoles={['admin','doctor']}>
                            <DoctorProvider>
                                <AdministrarEquipoView />
                            </DoctorProvider>
                        </ProtectedRoute>
                    }/>
                </Routes>
            </Router>
        </AuthProvider>
    )
}

export default AppRoutes
