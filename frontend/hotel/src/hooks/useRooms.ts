import { useState, useEffect } from "react";
import api from "../utils/api"; // Axios configurado
import { Room } from "../types/RoomData";

interface UseRooms {
  data: Room[];
  total: number;
  loading: boolean;
  error: string | null;
  fetchRooms: (page: number, filters?: string) => void;
}

const useRooms = (): UseRooms => {
  const [data, setData] = useState<Room[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get(`/habitaciones`);
      setData(response.data);
      setTotal(response.data);
      console.log(response.data)
    } catch (err) {
      setError("Error al cargar las habitaciones");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms(); // Carga inicial
  }, []);

  return { data, total, loading, error, fetchRooms };
};

export default useRooms;
