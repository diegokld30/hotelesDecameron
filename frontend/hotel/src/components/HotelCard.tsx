import React from "react";
import { Hotel } from '../types/Hotel';
import { useNavigate } from "react-router-dom";
import { baseurlimagenes } from "../utils/baseurlimagenes";

interface HotelCardProps {
  hotel: Hotel;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/registrar-habitacion", { state: { hotel } });
  };

  return (
    <div className="w-full h-[300px] bg-white rounded-lg shadow-md overflow-hidden relative">
      {/* Encabezado */}
      <div className="absolute top-4 left-4 z-10 bg-white p-1 rounded-lg bg-opacity-60">
        <p className="text-sm text-gray-600 font-semibold">Ciudad: {hotel.ciudad}</p>
        <h4 className="text-lg font-bold text-gray-900">{hotel.nombre}</h4>
      </div>
      {/* Imagen de fondo */}
      <img
        src={`${baseurlimagenes}/${hotel.imagen}`}
        alt={hotel.nombre}
        className="w-full h-full object-cover scale-110"
      />
      {/* Pie de la tarjeta */}
      <div className="absolute bottom-0 bg-gray-100/90 w-full p-4 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-800">Habitaciones: {hotel.numero_habitaciones}</p>
          <p className="text-sm text-gray-600">{hotel.direccion}</p>
        </div>
        <button
          className="text-sm bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={handleRegisterClick} // Manejar el clic
        >
          Registrar
        </button>
      </div>
    </div>
  );
};

export default HotelCard;
