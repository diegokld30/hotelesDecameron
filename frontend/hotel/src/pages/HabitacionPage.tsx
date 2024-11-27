import React from 'react'
import RegistrarHabitacion from '../components/RegistrarHabitacion'
import { MainLayout } from '../layouts/MainLayout'

export const HabitacionPage: React.FC = () => {
  return (
    <>
      <MainLayout>
        <RegistrarHabitacion />
      </MainLayout>
    </>
  )
}
