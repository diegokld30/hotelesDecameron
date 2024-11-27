import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Pagination,
  Button,
} from "@nextui-org/react"; // Importar Button correctamente
import useFetchHotels from "../hooks/useFetchHotels";
import useDeleteHotel from "../hooks/useDeleteHotel";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const HotelsTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data, loading, error } = useFetchHotels();
  const { deleteHotel } = useDeleteHotel();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHotelId, setSelectedHotelId] = useState<number | null>(null); // Aseguramos que sea un número o null

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    setPage(1); // Restablecer a la primera página al realizar una búsqueda
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const openModal = (hotelId: string) => {
    setSelectedHotelId(parseInt(hotelId, 10)); // Convertimos el ID a número
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedHotelId(null);
  };

  const handleConfirmDeletion = async () => {
    if (selectedHotelId !== null) {
      const success = await deleteHotel(String(selectedHotelId));
      if (success) {
        closeModal();
      }
    }
  };

  return (
    <div className="hotels-table">
      <Input
        placeholder="Buscar por nombre, NIT o ciudad"
        value={search}
        onChange={handleSearch}
        className="mb-4"
        isClearable
      />
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <Table aria-label="Gestión de Hoteles">
            <TableHeader>
              <TableColumn>ID</TableColumn>
              <TableColumn>Nombre</TableColumn>
              <TableColumn>Dirección</TableColumn>
              <TableColumn>Ciudad</TableColumn>
              <TableColumn>NIT</TableColumn>
              <TableColumn>Habitaciones</TableColumn>
              <TableColumn>Acciones</TableColumn>
            </TableHeader>
            <TableBody>
              {data && data.length > 0 ? (
                data.map((hotel) => (
                  <TableRow key={hotel.id}>
                    <TableCell>{hotel.id}</TableCell>
                    <TableCell>{hotel.nombre}</TableCell>
                    <TableCell>{hotel.direccion}</TableCell>
                    <TableCell>{hotel.ciudad}</TableCell>
                    <TableCell>{hotel.nit}</TableCell>
                    <TableCell>{hotel.numero_habitaciones}</TableCell>
                    <TableCell>
                      <Button
                        color="danger"
                        size="sm"
                        onPress={() => openModal(hotel.id.toString())}
                      >
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7}>No se encontraron hoteles</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <Pagination
            total={10} // Convertimos total a número si es posible
            page={page}
            onChange={handlePageChange}
            className="mt-4"
            showControls
          />
        </>
      )}

      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleConfirmDeletion}
        itemId={selectedHotelId} // Pasar el itemId correctamente como número
      />
    </div>
  );
};

export default HotelsTable;
