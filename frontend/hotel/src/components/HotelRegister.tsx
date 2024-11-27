import React, { useState, useRef } from "react";
import { Button, Input } from "@nextui-org/react";
import useRegisterHotel from "../hooks/useRegisterHotel";
import { HotelData } from "../types/HotelData";
import { useNavigate } from "react-router-dom";


const HotelRegister: React.FC = () => {

    const navigate = useNavigate();

    const [hotel, setHotel] = useState<HotelData>({
        nombre: "",
        direccion: "",
        ciudad: "",
        nit: "",
        numero_habitaciones: 0,
        imagen: "",
    });
    const { registerHotel, loading, error } = useRegisterHotel();
    const [formErrors, setFormErrors] = useState({
        nombre: "",
        direccion: "",
        ciudad: "",
        nit: "",
        numero_habitaciones: "",
    });

    const fileInputRef = useRef<HTMLInputElement | null>(null);
 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHotel({
            ...hotel,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            setHotel({
                ...hotel,
                imagen: file.name,
            });
        }
    };

    const validateForm = () => {
        let isValid = true;
        let errors = { ...formErrors };

        if (!hotel.nombre) {
            errors.nombre = "El nombre es obligatorio";
            isValid = false;
        } else {
            errors.nombre = "";
        }

        if (!hotel.direccion) {
            errors.direccion = "La dirección es obligatoria";
            isValid = false;
        } else {
            errors.direccion = "";
        }

        if (!hotel.ciudad) {
            errors.ciudad = "La ciudad es obligatoria";
            isValid = false;
        } else {
            errors.ciudad = "";
        }

        if (!hotel.nit) {
            errors.nit = "El NIT es obligatorio";
            isValid = false;
        } else {
            errors.nit = "";
        }

        if (hotel.numero_habitaciones <= 0) {
            errors.numero_habitaciones = "El número de habitaciones debe ser mayor que 0";
            isValid = false;
        } else if (hotel.numero_habitaciones > 42) {
            errors.numero_habitaciones = "El número de habitaciones no puede ser mayor que 42";
            isValid = false;
        } else {
            errors.numero_habitaciones = "";
        }

        setFormErrors(errors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) {
            return; // No enviamos si el formulario no es válido
        }

        const formData = new FormData();
        formData.append("nombre", hotel.nombre);
        formData.append("direccion", hotel.direccion);
        formData.append("ciudad", hotel.ciudad);
        formData.append("nit", hotel.nit);
        formData.append("numero_habitaciones", hotel.numero_habitaciones.toString());

        if (hotel.imagen && fileInputRef.current?.files) {
            const file = fileInputRef.current.files[0];
            if (file) {
                formData.append("imagen", file);
            }
        }

        try {
            await registerHotel(formData);
            navigate("/");
        } catch (err) {
            console.error("Error al registrar el hotel:", err);
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <Input
                            size="lg"
                            label="Nombre"
                            fullWidth
                            name="nombre"
                            value={hotel.nombre}
                            onChange={handleChange}
                            placeholder="Nombre del Hotel"
                            className="rounded-md p-2"
                        />
                        {formErrors.nombre && <p className="text-red-500">{formErrors.nombre}</p>}
                    </div>

                    <div>
                        <Input
                            size="lg"
                            label="Dirección"
                            fullWidth
                            name="direccion"
                            value={hotel.direccion}
                            onChange={handleChange}
                            placeholder="Dirección"
                            className="rounded-md p-2"
                        />
                        {formErrors.direccion && <p className="text-red-500">{formErrors.direccion}</p>}
                    </div>

                    <div>
                        <Input
                            size="lg"
                            label="Ciudad"
                            fullWidth
                            name="ciudad"
                            value={hotel.ciudad}
                            onChange={handleChange}
                            placeholder="Ciudad"
                            className="rounded-md p-2"
                        />
                        {formErrors.ciudad && <p className="text-red-500">{formErrors.ciudad}</p>}
                    </div>

                    <div>
                        <Input
                            size="lg"
                            label="Código Único"
                            fullWidth
                            name="nit"
                            value={hotel.nit}
                            onChange={handleChange}
                            placeholder="NIT"
                            className="rounded-md p-2"
                        />
                        {formErrors.nit && <p className="text-red-500">{formErrors.nit}</p>}
                    </div>

                    <div>
                        <Input
                            size="lg"
                            label="Cantidad max 42"
                            fullWidth
                            name="numero_habitaciones"
                            type="number"
                            value={String(hotel.numero_habitaciones)}
                            onChange={handleChange}
                            placeholder="Número de Habitaciones"
                            className="rounded-md p-2"
                        />
                        {formErrors.numero_habitaciones && <p className="text-red-500">{formErrors.numero_habitaciones}</p>}
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <Input
                            size="lg"
                            type="file"
                            name="imagen"
                            onChange={handleFileChange}
                            label="Seleccionar Imagen"
                            ref={fileInputRef}
                            className="rounded-md p-2"
                        />
                        {hotel.imagen && fileInputRef.current?.files && fileInputRef.current.files[0] && (
                            <div className="mt-4">
                                <img
                                    src={URL.createObjectURL(fileInputRef.current.files[0])}
                                    alt="Vista previa"
                                    className="w-full h-auto rounded-md shadow-md"
                                />
                            </div>
                        )}
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 text-white rounded-md py-2 mt-4 hover:bg-blue-600"
                    >
                        {loading ? "Registrando..." : "Registrar Hotel"}
                    </Button>
                    {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                </div>
            </form>
        </div>
    );
};

export default HotelRegister;
