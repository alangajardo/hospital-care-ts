import React, { useState } from 'react'
import './App.css'
import Menu from './components/Menu'
import HomeView from './views/HomeView'
import DoctorProvider from './context/DoctorContext'
import DoctorsView from './views/DoctorsView'
import AppointmentsView from './views/AppointmentsView'
import Footer from './components/Footer'

function App() {
  const [view, setView] = useState<string>('Home')

  return (
    <React.Fragment>
      <Menu setView={setView} activeView={view}/>
        {view ==='Home' && <HomeView />}
        <br/>
        <DoctorProvider>
          {view === "Equipo" && <DoctorsView />}
          {view === "Citas" && <AppointmentsView />}
        </DoctorProvider>
        <br/>
      <Footer />
    </React.Fragment>
  )
}

export default App
