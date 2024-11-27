import React, { ReactNode } from 'react';
import Navbar from '../components/Navbar';
import ToastNotification from '../components/ToastNotification';


interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <main className="container mx-auto w-full">
      <Navbar />
      <div className='mt-32'>{children}</div>
      <ToastNotification />
    </main>
  );
};
