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
} from "@nextui-org/react";
import useRooms from "../hooks/useRooms";
import useDeleteConfirmation from "../hooks/useDeleteConfirmation"; // Importa el hook
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const RoomsTable: React.FC = () => {
  const { data, total, loading, error, fetchRooms } = useRooms();
  const { eliminarHabitacion } =
    useDeleteConfirmation(); // Usa el hook aquí

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    fetchRooms(1, value);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    fetchRooms(newPage, search);
  };

  const openModal = (itemId: number) => {
    setSelectedItemId(itemId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItemId(null);
  };

  const handleConfirm = async () => {
    if (selectedItemId) {
      await eliminarHabitacion(selectedItemId.toString());
      closeModal();
      fetchRooms(page, search);
    }
  };

  return (
    <div className="rooms-table">
      <Input
        placeholder="Buscar por tipo o acomodación"
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
          <Table aria-label="Gestión de Habitaciones">
            <TableHeader>
              <TableColumn>ID</TableColumn>
              <TableColumn>Hotel</TableColumn>
              <TableColumn>Tipo</TableColumn>
              <TableColumn>Acomodación</TableColumn>
              <TableColumn>Cantidad</TableColumn>
              <TableColumn>Ciudad</TableColumn>
              <TableColumn>Acciones</TableColumn>
            </TableHeader>
            <TableBody>
              {data.map((room) => (
                <TableRow key={room.id}>
                  <TableCell>{room.id}</TableCell>
                  <TableCell>{room.hotel.nombre}</TableCell>
                  <TableCell>{room.tipo}</TableCell>
                  <TableCell>{room.acomodacion}</TableCell>
                  <TableCell>{room.cantidad}</TableCell>
                  <TableCell>{room.hotel.ciudad}</TableCell>
                  <TableCell>
                    <Button
                      color="danger"
                      onPress={() => openModal(room.id)}
                      size="sm"
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Pagination
            total={Math.ceil(total / 10)}
            initialPage={1}
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
        onConfirm={handleConfirm}
        itemId={selectedItemId}
      />
    </div>
  );
};

export default RoomsTable;
