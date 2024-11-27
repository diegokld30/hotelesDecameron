import React, { useEffect, useState } from "react";
import useUpdateHotel from "../hooks/useUpdateHotel";
import { Hotel } from "../types/Hotel";
import { Input, Button } from "@nextui-org/react";

interface UpdateHotelModalProps {
  isOpen: boolean;
  onClose: () => void;
  hotelId: number | null;
  hotelData: { nombre: string; direccion: string; ciudad: string; nit: string; numero_habitaciones: number } | null;
}

const UpdateHotelModal: React.FC<UpdateHotelModalProps> = ({ isOpen, onClose, hotelId, hotelData }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    ciudad: "",
    nit: "",
    numero_habitaciones: 0,
  });

  const { updateHotel, loading, error } = useUpdateHotel();

  useEffect(() => {
    if (hotelData) {
      setFormData({ ...hotelData });
    }
  }, [hotelData]);

  const handleSaveChanges = async () => {
    if (hotelId && formData) {
      const updatedHotel: Hotel = {
        id: hotelId,
        nombre: formData.nombre,
        direccion: formData.direccion,
        ciudad: formData.ciudad,
        nit: formData.nit,
        numero_habitaciones: formData.numero_habitaciones,
        created_at: "",
        updated_at: new Date().toISOString(),
        imagen: "",
        imagents: "",
        imagenes: [] 
      };

      const result = await updateHotel(updatedHotel);

      if (result) {
        onClose();
      }
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h3 className="text-xl font-semibold mb-4">Actualizar Hotel</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre del Hotel</label>
              <Input
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                fullWidth
                className="mb-4"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Dirección</label>
              <Input
                value={formData.direccion}
                onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                fullWidth
                className="mb-4"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Ciudad</label>
              <Input
                value={formData.ciudad}
                onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
                fullWidth
                className="mb-4"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">NIT</label>
              <Input
                
                value={formData.nit}
                onChange={(e) => setFormData({ ...formData, nit: e.target.value })}
                fullWidth
                className="mb-4"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Número de Habitaciones</label>
              <Input
                type="number"
                value={String(formData.numero_habitaciones)}
                onChange={(e) => setFormData({ ...formData, numero_habitaciones: parseInt(e.target.value) })}
                fullWidth
                className="mb-4"
              />
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <div className="flex justify-end gap-4">
              <Button
                onClick={onClose}
                disabled={loading}
                color="secondary"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSaveChanges}
                disabled={loading}
                color="primary"
              >
                {loading ? "Guardando..." : "Guardar Cambios"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateHotelModal;
