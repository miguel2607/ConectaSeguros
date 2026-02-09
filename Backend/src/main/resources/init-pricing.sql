-- Script para inicializar/actualizar todos los precios de la Rama Judicial (PostgreSQL)
-- Ejecutar conectado a la base conecta_db (debe existir planes y tipos_precio)

-- PRECIOS DE EMPLEADO (Planes A-G)
INSERT INTO judicial_pricing (tipo_precio_id, plan_id, valor) VALUES
((SELECT id FROM tipos_precio WHERE codigo = 'empleado'), (SELECT id FROM planes WHERE codigo = 'A'), '241,600'),
((SELECT id FROM tipos_precio WHERE codigo = 'empleado'), (SELECT id FROM planes WHERE codigo = 'B'), '195,000'),
((SELECT id FROM tipos_precio WHERE codigo = 'empleado'), (SELECT id FROM planes WHERE codigo = 'C'), '107,900'),
((SELECT id FROM tipos_precio WHERE codigo = 'empleado'), (SELECT id FROM planes WHERE codigo = 'D'), '84,000'),
((SELECT id FROM tipos_precio WHERE codigo = 'empleado'), (SELECT id FROM planes WHERE codigo = 'E'), '55,800'),
((SELECT id FROM tipos_precio WHERE codigo = 'empleado'), (SELECT id FROM planes WHERE codigo = 'F'), '34,500'),
((SELECT id FROM tipos_precio WHERE codigo = 'empleado'), (SELECT id FROM planes WHERE codigo = 'G'), '23,000')
ON CONFLICT (tipo_precio_id, plan_id) DO UPDATE SET valor = EXCLUDED.valor;

-- PRECIOS DE CÓNYUGE (Planes A-G)
INSERT INTO judicial_pricing (tipo_precio_id, plan_id, valor) VALUES
((SELECT id FROM tipos_precio WHERE codigo = 'conyuge'), (SELECT id FROM planes WHERE codigo = 'A'), '241,600'),
((SELECT id FROM tipos_precio WHERE codigo = 'conyuge'), (SELECT id FROM planes WHERE codigo = 'B'), '195,000'),
((SELECT id FROM tipos_precio WHERE codigo = 'conyuge'), (SELECT id FROM planes WHERE codigo = 'C'), '107,900'),
((SELECT id FROM tipos_precio WHERE codigo = 'conyuge'), (SELECT id FROM planes WHERE codigo = 'D'), '84,000'),
((SELECT id FROM tipos_precio WHERE codigo = 'conyuge'), (SELECT id FROM planes WHERE codigo = 'E'), '55,800'),
((SELECT id FROM tipos_precio WHERE codigo = 'conyuge'), (SELECT id FROM planes WHERE codigo = 'F'), '34,500'),
((SELECT id FROM tipos_precio WHERE codigo = 'conyuge'), (SELECT id FROM planes WHERE codigo = 'G'), '23,000')
ON CONFLICT (tipo_precio_id, plan_id) DO UPDATE SET valor = EXCLUDED.valor;

-- COBERTURAS - VIDA, INVALIDEZ, ENFERMEDADES GRAVES, BONO CANASTA, AUXILIO MATERNIDAD, MUERTE ACCIDENTAL, INVALIDEZ DESMEMBRACIÓN
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

-- Auxilio funerario (sin plan)
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

-- Progenitores (Planes A-E)
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

-- Otros (sin plan)
INSERT INTO judicial_pricing (tipo_precio_id, plan_id, valor) VALUES
((SELECT id FROM tipos_precio WHERE codigo = 'otros_desde'), NULL, '23.000'),
((SELECT id FROM tipos_precio WHERE codigo = 'otros_hasta'), NULL, '250.000'),
((SELECT id FROM tipos_precio WHERE codigo = 'otros_salud'), NULL, '179.900'),
((SELECT id FROM tipos_precio WHERE codigo = 'otros_autos'), NULL, '91.700'),
((SELECT id FROM tipos_precio WHERE codigo = 'otros_motos'), NULL, '41.700')
ON CONFLICT (tipo_precio_id, plan_id) DO UPDATE SET valor = EXCLUDED.valor;

-- Verificación
SELECT tp.codigo AS tipo_precio, p.codigo AS plan, jp.valor
FROM judicial_pricing jp
JOIN tipos_precio tp ON jp.tipo_precio_id = tp.id
LEFT JOIN planes p ON jp.plan_id = p.id
ORDER BY tp.codigo, p.orden;
