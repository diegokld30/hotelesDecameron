import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Hotel } from "../types/Hotel";
import { Input } from "@nextui-org/react";
import useRegisterHabitacion from "../hooks/useRegisterHabitacion";
import { baseurlimagenes } from "../utils/baseurlimagenes";
const RegistrarHabitacion: React.FC = () => {

  const location = useLocation();
  const hotel: Hotel = location.state?.hotel;
  const [tipo, setTipo] = useState<string>("ESTANDAR");
  const [acomodacion, setAcomodacion] = useState<string>("SENCILLA");
  const [cantidad, setCantidad] = useState<number>(1);
  const [opcionesAcomodacion, setOpcionesAcomodacion] = useState<string[]>(["SENCILLA", "DOBLE"]);
  const { registerHabitacion, loading, error: registerError } = useRegisterHabitacion();
  const navigate = useNavigate();
  
  useEffect(() => {
    switch (tipo) {
      case "ESTANDAR":
        setOpcionesAcomodacion(["SENCILLA", "DOBLE"]);
        setAcomodacion("SENCILLA");
        break;
      case "JUNIOR":
        setOpcionesAcomodacion(["TRIPLE", "CUADRUPLE"]);
        setAcomodacion("TRIPLE");
        break;
      case "SUITE":
        setOpcionesAcomodacion(["SENCILLA", "DOBLE", "TRIPLE"]);
        setAcomodacion("SENCILLA");
        break;
      default:
        setOpcionesAcomodacion(["SENCILLA", "DOBLE"]);
    }
  }, [tipo]);

  const handleCantidadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCantidad = Number(e.target.value);
    setCantidad(newCantidad);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!tipo || !acomodacion || cantidad <= 0) {
      alert("Por favor, complete todos los campos correctamente.");
      return;
    }

    const habitacionData = {
      hotel_id: hotel.id,
      tipo,
      acomodacion,
      cantidad,
    };

    registerHabitacion(habitacionData);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-sky-500 rounded-lg shadow-lg px-6 py-2 mb-8">
      <div
          className="absolute w-14 h-14 flex justify-center items-center rounded-full text-xl bg-gray-300 cursor-pointer"
          onClick={() => navigate('/')} // Usar la función navigate dentro del onClick
        >
          Atras
        </div>
        <div className="flex items-center justify-between">
          <div className="text-3xl font-semibold text-white">{hotel.nombre}</div>
          <img
            src={`${baseurlimagenes}/${hotel.imagen}`}
            alt={hotel.nombre}
            className="w-44 h-44 object-cover rounded-full border-2 border-gray-200"
          />
        </div>
        <p className="mt-2 text-lg text-white">Ciudad: {hotel.ciudad}</p>
        <p className="text-lg text-white">Dirección: {hotel.direccion}</p>
      </div>

      <h1 className="text-3xl font-bold text-center mb-6">Registrar Habitación</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo de habitación</label>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="ESTANDAR">ESTANDAR</option>
            <option value="JUNIOR">JUNIOR</option>
            <option value="SUITE">SUITE</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Acomodación</label>
          <select
            value={acomodacion}
            onChange={(e) => setAcomodacion(e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
          >
            {opcionesAcomodacion.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Cantidad max 42</label>
          <Input
            type="number"
            value={String(cantidad)}
            onChange={handleCantidadChange}
            className="mt-1 w-full"
            min={1}
            max={42}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-3 rounded-md hover:bg-blue-600 transition duration-200"
        >
          {loading ? "Registrando..." : "Registrar Habitación"}
        </button>

        {registerError && <p className="text-red-500 text-sm">{registerError}</p>}
      </form>
    </div>
  );
};

export default RegistrarHabitacion;
