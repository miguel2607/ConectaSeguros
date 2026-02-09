-- Script de creación de tablas para PostgreSQL
-- Crear la base de datos manualmente: createdb conecta_db
-- Luego conéctate a conecta_db y ejecuta este script

-- Tabla de Planes
CREATE TABLE IF NOT EXISTS planes (
    id BIGSERIAL PRIMARY KEY,
    codigo VARCHAR(10) UNIQUE NOT NULL,
    nombre VARCHAR(100),
    orden INTEGER NOT NULL
);

-- Tabla de Tipos de Precio
CREATE TABLE IF NOT EXISTS tipos_precio (
    id BIGSERIAL PRIMARY KEY,
    codigo VARCHAR(50) UNIQUE NOT NULL,
    nombre VARCHAR(100),
    categoria VARCHAR(50)
);

-- Tabla principal de Precios
CREATE TABLE IF NOT EXISTS judicial_pricing (
    id BIGSERIAL PRIMARY KEY,
    tipo_precio_id BIGINT NOT NULL REFERENCES tipos_precio(id) ON DELETE CASCADE,
    plan_id BIGINT REFERENCES planes(id) ON DELETE CASCADE,
    valor VARCHAR(50) NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (tipo_precio_id, plan_id)
);

-- Tabla de Blogs
CREATE TABLE IF NOT EXISTS blogs (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    excerpt TEXT,
    content TEXT,
    date VARCHAR(50),
    image TEXT,
    slug VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Services
CREATE TABLE IF NOT EXISTS services (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    icon TEXT,
    price_from VARCHAR(50),
    includes TEXT,
    how_it_works TEXT,
    ideal_for TEXT,
    slug VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Usuarios Admin
CREATE TABLE IF NOT EXISTS usuarios_admin (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    roles VARCHAR(50) DEFAULT 'ROLE_ADMIN',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
