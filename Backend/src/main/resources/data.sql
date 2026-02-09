-- Script de inicialización de datos para PostgreSQL
-- Se ejecuta automáticamente si spring.jpa.hibernate.ddl-auto=create (solo para pruebas; en producción usar update)

-- Insertar Planes
INSERT INTO planes (codigo, nombre, orden) VALUES
('A', 'Plan A', 1),
('B', 'Plan B', 2),
('C', 'Plan C', 3),
('D', 'Plan D', 4),
('E', 'Plan E', 5),
('F', 'Plan F', 6),
('G', 'Plan G', 7)
ON CONFLICT (codigo) DO UPDATE SET nombre = EXCLUDED.nombre, orden = EXCLUDED.orden;

-- Insertar Tipos de Precio
INSERT INTO tipos_precio (codigo, nombre, categoria) VALUES
('empleado', 'Afiliado Principal', 'afiliado'),
('conyuge', 'Cónyuge y Familiares', 'afiliado'),
('vida', 'Cobertura de Vida', 'cobertura'),
('invalidez', 'Invalidez o pérdida por accidente o enfermedad', 'cobertura'),
('enfermedades_graves', 'Enfermedades Graves (50% de anticipo)', 'cobertura'),
('bono_canasta', 'Bono Canasta', 'cobertura'),
('auxilio_funerario', 'Auxilio Funerario', 'cobertura'),
('auxilio_maternidad', 'Auxilio maternidad/paternidad', 'cobertura'),
('muerte_accidental', 'Muerte Accidental', 'cobertura'),
('invalidez_desmembracion', 'Invalidez, desmembración o inutilización', 'cobertura'),
('progenitores_vida', 'Progenitores - Vida', 'progenitores'),
('progenitores_invalidez', 'Progenitores - Invalidez', 'progenitores'),
('progenitores_funerario', 'Progenitores - Bono Funerario', 'progenitores'),
('otros_desde', 'Otros - Desde', 'otros'),
('otros_hasta', 'Otros - Hasta', 'otros'),
('otros_salud', 'Otros - Salud', 'otros'),
('otros_autos', 'Otros - Autos', 'otros'),
('otros_motos', 'Otros - Motos', 'otros')
ON CONFLICT (codigo) DO UPDATE SET nombre = EXCLUDED.nombre, categoria = EXCLUDED.categoria;

-- Precios (dependen de planes y tipos_precio; usar ON CONFLICT en (tipo_precio_id, plan_id))
INSERT INTO judicial_pricing (tipo_precio_id, plan_id, valor) VALUES
((SELECT id FROM tipos_precio WHERE codigo = 'empleado'), (SELECT id FROM planes WHERE codigo = 'A'), '241,600'),
((SELECT id FROM tipos_precio WHERE codigo = 'empleado'), (SELECT id FROM planes WHERE codigo = 'B'), '195,000'),
((SELECT id FROM tipos_precio WHERE codigo = 'empleado'), (SELECT id FROM planes WHERE codigo = 'C'), '107,900'),
((SELECT id FROM tipos_precio WHERE codigo = 'empleado'), (SELECT id FROM planes WHERE codigo = 'D'), '84,000'),
((SELECT id FROM tipos_precio WHERE codigo = 'empleado'), (SELECT id FROM planes WHERE codigo = 'E'), '55,800'),
((SELECT id FROM tipos_precio WHERE codigo = 'empleado'), (SELECT id FROM planes WHERE codigo = 'F'), '34,500'),
((SELECT id FROM tipos_precio WHERE codigo = 'empleado'), (SELECT id FROM planes WHERE codigo = 'G'), '23,000')
ON CONFLICT (tipo_precio_id, plan_id) DO UPDATE SET valor = EXCLUDED.valor;

INSERT INTO judicial_pricing (tipo_precio_id, plan_id, valor) VALUES
((SELECT id FROM tipos_precio WHERE codigo = 'conyuge'), (SELECT id FROM planes WHERE codigo = 'A'), '241,600'),
((SELECT id FROM tipos_precio WHERE codigo = 'conyuge'), (SELECT id FROM planes WHERE codigo = 'B'), '195,000'),
((SELECT id FROM tipos_precio WHERE codigo = 'conyuge'), (SELECT id FROM planes WHERE codigo = 'C'), '107,900'),
((SELECT id FROM tipos_precio WHERE codigo = 'conyuge'), (SELECT id FROM planes WHERE codigo = 'D'), '84,000'),
((SELECT id FROM tipos_precio WHERE codigo = 'conyuge'), (SELECT id FROM planes WHERE codigo = 'E'), '55,800'),
((SELECT id FROM tipos_precio WHERE codigo = 'conyuge'), (SELECT id FROM planes WHERE codigo = 'F'), '34,500'),
((SELECT id FROM tipos_precio WHERE codigo = 'conyuge'), (SELECT id FROM planes WHERE codigo = 'G'), '23,000')
ON CONFLICT (tipo_precio_id, plan_id) DO UPDATE SET valor = EXCLUDED.valor;

INSERT INTO judicial_pricing (tipo_precio_id, plan_id, valor) VALUES
((SELECT id FROM tipos_precio WHERE codigo = 'vida'), (SELECT id FROM planes WHERE codigo = 'A'), '250M'),
((SELECT id FROM tipos_precio WHERE codigo = 'vida'), (SELECT id FROM planes WHERE codigo = 'B'), '200M'),
((SELECT id FROM tipos_precio WHERE codigo = 'vida'), (SELECT id FROM planes WHERE codigo = 'C'), '100M'),
((SELECT id FROM tipos_precio WHERE codigo = 'vida'), (SELECT id FROM planes WHERE codigo = 'D'), '80M'),
((SELECT id FROM tipos_precio WHERE codigo = 'vida'), (SELECT id FROM planes WHERE codigo = 'E'), '50M'),
((SELECT id FROM tipos_precio WHERE codigo = 'vida'), (SELECT id FROM planes WHERE codigo = 'F'), '30M'),
((SELECT id FROM tipos_precio WHERE codigo = 'vida'), (SELECT id FROM planes WHERE codigo = 'G'), '20M')
ON CONFLICT (tipo_precio_id, plan_id) DO UPDATE SET valor = EXCLUDED.valor;

INSERT INTO judicial_pricing (tipo_precio_id, plan_id, valor) VALUES
((SELECT id FROM tipos_precio WHERE codigo = 'invalidez'), (SELECT id FROM planes WHERE codigo = 'A'), '250M'),
((SELECT id FROM tipos_precio WHERE codigo = 'invalidez'), (SELECT id FROM planes WHERE codigo = 'B'), '200M'),
((SELECT id FROM tipos_precio WHERE codigo = 'invalidez'), (SELECT id FROM planes WHERE codigo = 'C'), '100M'),
((SELECT id FROM tipos_precio WHERE codigo = 'invalidez'), (SELECT id FROM planes WHERE codigo = 'D'), '80M'),
((SELECT id FROM tipos_precio WHERE codigo = 'invalidez'), (SELECT id FROM planes WHERE codigo = 'E'), '50M'),
((SELECT id FROM tipos_precio WHERE codigo = 'invalidez'), (SELECT id FROM planes WHERE codigo = 'F'), '30M'),
((SELECT id FROM tipos_precio WHERE codigo = 'invalidez'), (SELECT id FROM planes WHERE codigo = 'G'), '20M')
ON CONFLICT (tipo_precio_id, plan_id) DO UPDATE SET valor = EXCLUDED.valor;

INSERT INTO judicial_pricing (tipo_precio_id, plan_id, valor) VALUES
((SELECT id FROM tipos_precio WHERE codigo = 'enfermedades_graves'), (SELECT id FROM planes WHERE codigo = 'A'), '125M'),
((SELECT id FROM tipos_precio WHERE codigo = 'enfermedades_graves'), (SELECT id FROM planes WHERE codigo = 'B'), '100M'),
((SELECT id FROM tipos_precio WHERE codigo = 'enfermedades_graves'), (SELECT id FROM planes WHERE codigo = 'C'), '50M'),
((SELECT id FROM tipos_precio WHERE codigo = 'enfermedades_graves'), (SELECT id FROM planes WHERE codigo = 'D'), '40M'),
((SELECT id FROM tipos_precio WHERE codigo = 'enfermedades_graves'), (SELECT id FROM planes WHERE codigo = 'E'), '25M'),
((SELECT id FROM tipos_precio WHERE codigo = 'enfermedades_graves'), (SELECT id FROM planes WHERE codigo = 'F'), '15M'),
((SELECT id FROM tipos_precio WHERE codigo = 'enfermedades_graves'), (SELECT id FROM planes WHERE codigo = 'G'), '10M')
ON CONFLICT (tipo_precio_id, plan_id) DO UPDATE SET valor = EXCLUDED.valor;

INSERT INTO judicial_pricing (tipo_precio_id, plan_id, valor) VALUES
((SELECT id FROM tipos_precio WHERE codigo = 'auxilio_funerario'), NULL, '4.000.000')
ON CONFLICT (tipo_precio_id, plan_id) DO UPDATE SET valor = EXCLUDED.valor;

INSERT INTO judicial_pricing (tipo_precio_id, plan_id, valor) VALUES
((SELECT id FROM tipos_precio WHERE codigo = 'bono_canasta'), (SELECT id FROM planes WHERE codigo = 'A'), '8.4M'),
((SELECT id FROM tipos_precio WHERE codigo = 'bono_canasta'), (SELECT id FROM planes WHERE codigo = 'B'), '7.2M'),
((SELECT id FROM tipos_precio WHERE codigo = 'bono_canasta'), (SELECT id FROM planes WHERE codigo = 'C'), '6M'),
((SELECT id FROM tipos_precio WHERE codigo = 'bono_canasta'), (SELECT id FROM planes WHERE codigo = 'D'), '4.8M'),
((SELECT id FROM tipos_precio WHERE codigo = 'bono_canasta'), (SELECT id FROM planes WHERE codigo = 'E'), '3.6M'),
((SELECT id FROM tipos_precio WHERE codigo = 'bono_canasta'), (SELECT id FROM planes WHERE codigo = 'F'), '2.4M'),
((SELECT id FROM tipos_precio WHERE codigo = 'bono_canasta'), (SELECT id FROM planes WHERE codigo = 'G'), '1.2M')
ON CONFLICT (tipo_precio_id, plan_id) DO UPDATE SET valor = EXCLUDED.valor;

INSERT INTO judicial_pricing (tipo_precio_id, plan_id, valor) VALUES
((SELECT id FROM tipos_precio WHERE codigo = 'auxilio_maternidad'), (SELECT id FROM planes WHERE codigo = 'A'), '1M'),
((SELECT id FROM tipos_precio WHERE codigo = 'auxilio_maternidad'), (SELECT id FROM planes WHERE codigo = 'B'), '1M'),
((SELECT id FROM tipos_precio WHERE codigo = 'auxilio_maternidad'), (SELECT id FROM planes WHERE codigo = 'C'), '1M'),
((SELECT id FROM tipos_precio WHERE codigo = 'auxilio_maternidad'), (SELECT id FROM planes WHERE codigo = 'D'), '800K'),
((SELECT id FROM tipos_precio WHERE codigo = 'auxilio_maternidad'), (SELECT id FROM planes WHERE codigo = 'E'), '500K'),
((SELECT id FROM tipos_precio WHERE codigo = 'auxilio_maternidad'), (SELECT id FROM planes WHERE codigo = 'F'), '300K'),
((SELECT id FROM tipos_precio WHERE codigo = 'auxilio_maternidad'), (SELECT id FROM planes WHERE codigo = 'G'), '200K')
ON CONFLICT (tipo_precio_id, plan_id) DO UPDATE SET valor = EXCLUDED.valor;

INSERT INTO judicial_pricing (tipo_precio_id, plan_id, valor) VALUES
((SELECT id FROM tipos_precio WHERE codigo = 'muerte_accidental'), (SELECT id FROM planes WHERE codigo = 'A'), '250M'),
((SELECT id FROM tipos_precio WHERE codigo = 'muerte_accidental'), (SELECT id FROM planes WHERE codigo = 'B'), '200M'),
((SELECT id FROM tipos_precio WHERE codigo = 'muerte_accidental'), (SELECT id FROM planes WHERE codigo = 'C'), '100M'),
((SELECT id FROM tipos_precio WHERE codigo = 'muerte_accidental'), (SELECT id FROM planes WHERE codigo = 'D'), '80M'),
((SELECT id FROM tipos_precio WHERE codigo = 'muerte_accidental'), (SELECT id FROM planes WHERE codigo = 'E'), '50M'),
((SELECT id FROM tipos_precio WHERE codigo = 'muerte_accidental'), (SELECT id FROM planes WHERE codigo = 'F'), '30M'),
((SELECT id FROM tipos_precio WHERE codigo = 'muerte_accidental'), (SELECT id FROM planes WHERE codigo = 'G'), '20M')
ON CONFLICT (tipo_precio_id, plan_id) DO UPDATE SET valor = EXCLUDED.valor;

INSERT INTO judicial_pricing (tipo_precio_id, plan_id, valor) VALUES
((SELECT id FROM tipos_precio WHERE codigo = 'invalidez_desmembracion'), (SELECT id FROM planes WHERE codigo = 'A'), '250M'),
((SELECT id FROM tipos_precio WHERE codigo = 'invalidez_desmembracion'), (SELECT id FROM planes WHERE codigo = 'B'), '200M'),
((SELECT id FROM tipos_precio WHERE codigo = 'invalidez_desmembracion'), (SELECT id FROM planes WHERE codigo = 'C'), '100M'),
((SELECT id FROM tipos_precio WHERE codigo = 'invalidez_desmembracion'), (SELECT id FROM planes WHERE codigo = 'D'), '80M'),
((SELECT id FROM tipos_precio WHERE codigo = 'invalidez_desmembracion'), (SELECT id FROM planes WHERE codigo = 'E'), '50M'),
((SELECT id FROM tipos_precio WHERE codigo = 'invalidez_desmembracion'), (SELECT id FROM planes WHERE codigo = 'F'), '30M'),
((SELECT id FROM tipos_precio WHERE codigo = 'invalidez_desmembracion'), (SELECT id FROM planes WHERE codigo = 'G'), '20M')
ON CONFLICT (tipo_precio_id, plan_id) DO UPDATE SET valor = EXCLUDED.valor;

INSERT INTO judicial_pricing (tipo_precio_id, plan_id, valor) VALUES
((SELECT id FROM tipos_precio WHERE codigo = 'progenitores_vida'), (SELECT id FROM planes WHERE codigo = 'A'), '50M'),
((SELECT id FROM tipos_precio WHERE codigo = 'progenitores_vida'), (SELECT id FROM planes WHERE codigo = 'B'), '40M'),
((SELECT id FROM tipos_precio WHERE codigo = 'progenitores_vida'), (SELECT id FROM planes WHERE codigo = 'C'), '30M'),
((SELECT id FROM tipos_precio WHERE codigo = 'progenitores_vida'), (SELECT id FROM planes WHERE codigo = 'D'), '20M'),
((SELECT id FROM tipos_precio WHERE codigo = 'progenitores_vida'), (SELECT id FROM planes WHERE codigo = 'E'), '10M')
ON CONFLICT (tipo_precio_id, plan_id) DO UPDATE SET valor = EXCLUDED.valor;

INSERT INTO judicial_pricing (tipo_precio_id, plan_id, valor) VALUES
((SELECT id FROM tipos_precio WHERE codigo = 'progenitores_invalidez'), (SELECT id FROM planes WHERE codigo = 'A'), '50M'),
((SELECT id FROM tipos_precio WHERE codigo = 'progenitores_invalidez'), (SELECT id FROM planes WHERE codigo = 'B'), '40M'),
((SELECT id FROM tipos_precio WHERE codigo = 'progenitores_invalidez'), (SELECT id FROM planes WHERE codigo = 'C'), '30M'),
((SELECT id FROM tipos_precio WHERE codigo = 'progenitores_invalidez'), (SELECT id FROM planes WHERE codigo = 'D'), '20M'),
((SELECT id FROM tipos_precio WHERE codigo = 'progenitores_invalidez'), (SELECT id FROM planes WHERE codigo = 'E'), '10M')
ON CONFLICT (tipo_precio_id, plan_id) DO UPDATE SET valor = EXCLUDED.valor;

INSERT INTO judicial_pricing (tipo_precio_id, plan_id, valor) VALUES
((SELECT id FROM tipos_precio WHERE codigo = 'progenitores_funerario'), (SELECT id FROM planes WHERE codigo = 'A'), '5M'),
((SELECT id FROM tipos_precio WHERE codigo = 'progenitores_funerario'), (SELECT id FROM planes WHERE codigo = 'B'), '4M'),
((SELECT id FROM tipos_precio WHERE codigo = 'progenitores_funerario'), (SELECT id FROM planes WHERE codigo = 'C'), '3M'),
((SELECT id FROM tipos_precio WHERE codigo = 'progenitores_funerario'), (SELECT id FROM planes WHERE codigo = 'D'), '2M'),
((SELECT id FROM tipos_precio WHERE codigo = 'progenitores_funerario'), (SELECT id FROM planes WHERE codigo = 'E'), '1M')
ON CONFLICT (tipo_precio_id, plan_id) DO UPDATE SET valor = EXCLUDED.valor;

INSERT INTO judicial_pricing (tipo_precio_id, plan_id, valor) VALUES
((SELECT id FROM tipos_precio WHERE codigo = 'otros_desde'), NULL, '23.000'),
((SELECT id FROM tipos_precio WHERE codigo = 'otros_hasta'), NULL, '250.000'),
((SELECT id FROM tipos_precio WHERE codigo = 'otros_salud'), NULL, '179.900'),
((SELECT id FROM tipos_precio WHERE codigo = 'otros_autos'), NULL, '91.700'),
((SELECT id FROM tipos_precio WHERE codigo = 'otros_motos'), NULL, '41.700')
ON CONFLICT (tipo_precio_id, plan_id) DO UPDATE SET valor = EXCLUDED.valor;

-- Usuario admin por defecto (password: admin123)
INSERT INTO usuarios_admin (username, password_hash, roles) VALUES
('admin', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'ROLE_ADMIN')
ON CONFLICT (username) DO UPDATE SET password_hash = EXCLUDED.password_hash, roles = EXCLUDED.roles;
