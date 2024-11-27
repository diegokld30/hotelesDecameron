import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-slate-100 w-[80%] left-1/2 transform -translate-x-1/2 fixed top-4 2xl:top-6 py-2.5 rounded-full shadow-md z-50">
      <div className="container mx-auto px-8 py-2 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-x-2">
          <span className="text-3xl font-bold text-sky-700">Hoteles</span>
          <span className="text-3xl font-bold text-slate-600"> Decamerón</span>
        </div>
        
        {/* Menú de navegación */}
        <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <Link to="/">
          <li className="hover:text-blue-600">Home</li>
          </Link>

          <Link to="/registrar-hotel">
          <li className="hover:text-blue-600">Hoteles</li>
          </Link>

          <Link to="/gestion-habitaciones">
          <li className="hover:text-blue-600">Habitaciones</li>
          </Link>

        </ul>

      </div>
    </nav>
  );
};

export default Navbar;
