import { useState, useEffect } from "react";
import { Hotel } from "../types/Hotel"; 
import api from "../utils/api";

interface UseFetchHotelsResult {
  data: Hotel[] | null; // Datos de la petición
  loading: boolean;     // Estado de carga
  error: string | null; // Mensaje de error si ocurre
}

const useFetchHotels = (): UseFetchHotelsResult => {
  const [data, setData] = useState<Hotel[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        const response = await api.get<Hotel[]>('/hoteles');
        setData(response.data);
      } catch (err: any) {
        setError(err.message || "Error al obtener los datos");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  return { data, loading, error };
};

export default useFetchHotels;
