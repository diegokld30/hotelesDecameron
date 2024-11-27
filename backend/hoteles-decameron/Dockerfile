# Usar la imagen oficial de PHP con Apache
FROM php:8.2-apache

# Instalar extensiones necesarias
RUN apt-get update && apt-get install -y \
    libpq-dev \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    zip \
    unzip \
    git \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd zip pdo pdo_pgsql

# Habilitar mod_rewrite para Laravel
RUN a2enmod rewrite

# Instalar Composer
COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

# Establecer directorio de trabajo
WORKDIR /var/www/html

# Copiar el código del proyecto
COPY . .

# Instalar dependencias de Laravel
RUN composer install --optimize-autoloader --no-dev

# Ajustar permisos
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Exponer el puerto 8080
EXPOSE 8080

# Comando por defecto
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8080"]
