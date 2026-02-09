-- Script para inicializar el usuario admin (PostgreSQL)
-- Ejecutar conectado a la base conecta_db (psql -d conecta_db -f init-admin.sql)

DELETE FROM usuarios_admin WHERE username = 'admin';

-- Insertar usuario admin con password: admin123 (hash BCrypt)
INSERT INTO usuarios_admin (username, password_hash, roles) VALUES
('admin', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'ROLE_ADMIN');

SELECT id, username, roles, created_at FROM usuarios_admin WHERE username = 'admin';
