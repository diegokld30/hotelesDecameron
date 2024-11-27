// hooks/useDeleteHotel.ts
import { useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";
import useFetchHotels from "./useFetchHotels";

const useDeleteHotel = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteHotel = async (hotelId: string) => {
        setLoading(true);
        try {
            await api.delete(`/hoteles/${hotelId}`);
            setLoading(false);
            toast.success("Hotel eliminado correctamente");
            useFetchHotels();
            return true;
        } catch (err: any) {
            setError(err.message || "Error al eliminar el hotel");
            setLoading(false);
            return false;
        }
    };

    return { deleteHotel, loading, error };
};

export default useDeleteHotel;
