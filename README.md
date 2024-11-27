# Hoteles Decameron API

Este proyecto es una API REST creada con Laravel (backend) y React + TypeScript (frontend). A continuación, se describe el proceso para instalar, configurar y ejecutar el proyecto.

<hr>
Requisitos previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas en tu sistema:

* PHP 8.2 o superior con las extensiones necesarias para Laravel.
* Composer para gestionar las dependencias de PHP.
* Node.js 18 o superior y npm.
* PostgreSQL como base de datos.
* Git para clonar el repositorio.


# Paso 1: Crear la base de datos en PostgreSQL

- Abre tu terminal y accede al cliente de PostgreSQL:

psql -U postgres

- Una vez dentro, crea una base de datos llamada hoteles:

CREATE DATABASE hoteles;


- Sal del cliente de PostgreSQL:
\q

<hr>

# Paso 2: Clonar el repositorio

- Clona este repositorio en tu máquina local:
git clone https://github.com/diegokld30/hotelesDecameron.git

- Accede al directorio del proyecto:
cd hotelesDecameron


<hr>
# Paso 3: Configurar y ejecutar el backend

- Ve al directorio del backend:
cd hotel/backend/hoteles-decameron

- Instala las dependencias de Laravel con Composer:
composer install

- Genera una clave única para la aplicación:
php artisan key:generate

-Configura el archivo .env en el directorio del backend:

Asegúrate de que los parámetros de conexión a la base de datos sean correctos:<br>
<br>
DB_CONNECTION=pgsql

DB_HOST=127.0.0.1<br>

DB_PORT=5432<br>

DB_DATABASE=hoteles<br>

DB_USERNAME=postgres<br>

DB_PASSWORD=postgres<br>

-Ejecuta las migraciones para crear las tablas en la base de datos:
php artisan migrate

-Inicia el servidor de desarrollo de Laravel:
php artisan serve


El backend estará disponible en: http://127.0.0.1:8000.
La documentación estara disponible en: http://127.0.0.1:8000/api/documentation


# Paso 4: Configurar y ejecutar el frontend

-Abre una nueva terminal y accede al directorio del frontend:
cd hotel/frontend/hoteles-decameron

-Instala las dependencias de React:
npm install

-Inicia el servidor de desarrollo del frontend:
npm run dev

El frontend estará disponible en el puerto indicado por el terminal (por defecto, http://127.0.0.1:5173).


