import React from 'react'
import { MainLayout } from '../layouts/MainLayout'
import RoomsTable from '../components/RoomsTable'

export const HabitacionesPages: React.FC = () => {
  return (
    <>
    <MainLayout>
        <RoomsTable />
    </MainLayout>
    </>
  )
}
