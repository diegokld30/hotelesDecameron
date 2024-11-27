// src/hooks/useRegisterHotel.ts
import { useState } from "react";
import api from "../utils/api";  // Importa tu instancia personalizada de axios
import toast from "react-hot-toast";

const useRegisterHotel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerHotel = async (hotelData: FormData) => {
    try {
      setLoading(true);
      setError(null);
      await api.post("/hoteles", hotelData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      toast.success('Hotel registrado exitoso');
    } catch (err) {
      setError("Error al registrar el hotel");
      toast.error('Error al registrar el hotel')
    } finally {
      setLoading(false);
    }
  };

  return { registerHotel, loading, error };
};

export default useRegisterHotel;
