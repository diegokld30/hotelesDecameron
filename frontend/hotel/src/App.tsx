import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { RegistrarHotelPage } from './pages/RegistrarHotelPage'
import { HabitacionPage } from './pages/HabitacionPage'
import { HabitacionesPages } from './pages/HabitacionesPages'


const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/registrar-hotel' element={<RegistrarHotelPage />} />
        <Route path='/registrar-habitacion' element={<HabitacionPage />} />
        <Route path='/gestion-habitaciones' element={<HabitacionesPages />} />
      </Routes>
    </>
  )
}

export default App