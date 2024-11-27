import { useState } from "react";
import api from "../utils/api"; // Importa tu instancia personalizada de axios
import toast from "react-hot-toast";

const useDeleteConfirmation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const eliminarHabitacion = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      // Asegúrate de incluir el ID en la URL correctamente
      await api.delete(`/habitaciones/${id}`);
      toast.success("Habitación eliminada correctamente");
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Error al eliminar la habitación";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return { eliminarHabitacion, loading, error };
};

export default useDeleteConfirmation;
