import React, { useState } from "react";
import { Input } from "@nextui-org/react"; // Importar el Input de Next UI
import useFetchHotels from "../hooks/useFetchHotels";
import HotelCard from "./HotelCard";

const HotelList: React.FC = () => {

  const { data: hotels, loading, error } = useFetchHotels();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredHotels = hotels
    ? hotels.filter((hotel) => {
        return (
          hotel.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          hotel.nit.toLowerCase().includes(searchTerm.toLowerCase()) ||
          hotel.ciudad.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    : [];

  if (loading) {
    return <p className="text-center text-gray-700">Cargando hoteles...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <Input
          size="lg"
          label="Buscar por nombre, NIT o ciudad"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Escribe para buscar..."
        />
      </div>

      {/* Mostrar mensaje si no hay resultados */}
      {filteredHotels.length === 0 && searchTerm && (
        <p className="text-center text-gray-700">No se encontraron resultados.</p>
      )}

      {/* Mostrar los hoteles filtrados */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {filteredHotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default HotelList;
