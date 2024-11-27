export interface Hotel {
    id: number;
    nombre: string;
    direccion: string;
    ciudad: string;
    nit: string;
    numero_habitaciones: number;
    imagen: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface Room {
    id: number;
    hotel_id: number;
    tipo: string;
    acomodacion: string;
    cantidad: number;
    created_at: string;
    updated_at: string;
    hotel: Hotel;
  }
  