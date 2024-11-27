import { useState } from "react";
import api from "../utils/api"; // Importa la instancia de axios
import toast from "react-hot-toast";

const useRegisterHabitacion = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerHabitacion = async (habitacionData: { hotel_id: number, tipo: string, acomodacion: string, cantidad: number }) => {
    try {
      setLoading(true);
      setError(null);

      await api.post("/habitaciones", habitacionData);
      toast.success('Hotel registrado exitoso');
    } catch (err: any) {
      setError("Error al registrar la habitación");
      toast.error('Error al registrar el hotel')
    } finally {
      setLoading(false);
    }
  };

  return { registerHabitacion, loading, error };
};

export default useRegisterHabitacion;
