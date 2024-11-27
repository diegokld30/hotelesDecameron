import React from 'react'
import HotelRegister from '../components/HotelRegister'
import { MainLayout } from '../layouts/MainLayout'

export const RegistrarHotelPage: React.FC = () => {
  return (
    <>
      <MainLayout>
        <div className='w-full flex gap-2 bg-gray-200'>
          <img className='w-[40%]' src="imagenfondo.jpg" alt="" />
          <HotelRegister />
        </div>
      </MainLayout>
    </>
  )
}
