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
import useFetchHotels from "../hooks/useFetchHotels";
import useDeleteHotel from "../hooks/useDeleteHotel";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import UpdateHotelModal from "./UpdateHotelModal";

const HotelsTable: React.FC = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const { data, loading, error } = useFetchHotels();
    const { deleteHotel } = useDeleteHotel();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedHotelId, setSelectedHotelId] = useState<number | null>(null);
    const [selectedHotelData, setSelectedHotelData] = useState<any | null>(null);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);
        setPage(1);
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const openDeleteModal = (hotelId: string) => {
        setSelectedHotelId(parseInt(hotelId, 10));
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedHotelId(null);
        
    };

    const handleConfirmDeletion = async () => {
        if (selectedHotelId !== null) {
          await deleteHotel(String(selectedHotelId));
            closeDeleteModal();
            window.location.reload()
        }
    };

    const openUpdateModal = (hotelId: number) => {
        if (data !== null) {
            const selectedHotel = data.find((hotel) => hotel.id === hotelId);
            setSelectedHotelId(hotelId);
            setSelectedHotelData(selectedHotel);
            setIsUpdateModalOpen(true);
        } else {
            console.error("No se pudo encontrar el hotel: data es null");
        }
    };

    const closeUpdateModal = () => {
        setIsUpdateModalOpen(false);
        setSelectedHotelId(null);
        setSelectedHotelData(null);
        window.location.reload()
    };

    const filteredData = data?.filter(
        (hotel) =>
            hotel.nombre.toLowerCase().includes(search.toLowerCase()) ||
            hotel.nit.toLowerCase().includes(search.toLowerCase()) ||
            hotel.ciudad.toLowerCase().includes(search.toLowerCase())
    );

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
                    {filteredData && filteredData.length > 0 ? (
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
                                    {filteredData.map((hotel) => (
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
                                                    onPress={() => openDeleteModal(hotel.id.toString())}
                                                >
                                                    Eliminar
                                                </Button>
                                                <Button
                                                    color="primary"
                                                    size="sm"
                                                    onPress={() => openUpdateModal(hotel.id)}
                                                    className="ml-2"
                                                >
                                                    Actualizar
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Pagination
                                total={Math.ceil(filteredData.length / 10)}
                                page={page}
                                onChange={handlePageChange}
                                className="mt-4"
                                showControls
                            />
                        </>
                    ) : (
                        <p>No se encontraron hoteles</p> 
                    )}
                </>
            )}

            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={closeDeleteModal}
                onConfirm={handleConfirmDeletion}
                itemId={selectedHotelId}
            />

            <UpdateHotelModal
                isOpen={isUpdateModalOpen}
                onClose={closeUpdateModal}
                hotelId={selectedHotelId}
                hotelData={selectedHotelData}
            />
        </div>
    );
};

export default HotelsTable;
