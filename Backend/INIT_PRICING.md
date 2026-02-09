# Inicialización de Precios - Rama Judicial

Este documento explica cómo inicializar o actualizar los precios de la Rama Judicial en la base de datos.

## Archivos relacionados

- `src/main/resources/data.sql` - Script de inicialización automática (se ejecuta al iniciar la aplicación si `spring.jpa.hibernate.ddl-auto=create`)
- `src/main/resources/init-pricing.sql` - Script manual para insertar/actualizar todos los precios

## Precios incluidos

El script `init-pricing.sql` incluye todos los precios actuales del frontend:

### Precios de Afiliados
- **Empleado (Planes A-G)**: 241,600 / 195,000 / 107,900 / 84,000 / 55,800 / 34,500 / 23,000
- **Cónyuge (Planes A-G)**: 241,600 / 195,000 / 107,900 / 84,000 / 55,800 / 34,500 / 23,000

### Coberturas (Planes A-G)
- **Vida**: 250M / 200M / 100M / 80M / 50M / 30M / 20M
- **Invalidez**: 250M / 200M / 100M / 80M / 50M / 30M / 20M
- **Enfermedades Graves**: 125M / 100M / 50M / 40M / 25M / 15M / 10M
- **Bono Canasta**: 8.4M / 7.2M / 6M / 4.8M / 3.6M / 2.4M / 1.2M
- **Auxilio Maternidad**: 1M / 1M / 1M / 800K / 500K / 300K / 200K
- **Muerte Accidental**: 250M / 200M / 100M / 80M / 50M / 30M / 20M
- **Invalidez Desmembración**: 250M / 200M / 100M / 80M / 50M / 30M / 20M
- **Auxilio Funerario**: 4.000.000 (sin plan)

### Progenitores (Planes A-E solamente)
- **Vida**: 50M / 40M / 30M / 20M / 10M
- **Invalidez**: 50M / 40M / 30M / 20M / 10M
- **Funerario**: 5M / 4M / 3M / 2M / 1M

### Otros (sin plan)
- **Desde**: 23.000
- **Hasta**: 250.000
- **Salud**: 179.900
- **Autos**: 91.700
- **Motos**: 41.700

## Cómo usar el script

### Opción 1: Ejecutar manualmente en MySQL

```bash
# Conectar a MySQL
mysql -u root -p

# Seleccionar la base de datos
USE conecta_db;

# Ejecutar el script
source Backend/src/main/resources/init-pricing.sql
```

O desde la línea de comandos:

```bash
mysql -u root -p conecta_db < Backend/src/main/resources/init-pricing.sql
```

### Opción 2: Usar la aplicación Spring Boot

Si la aplicación está configurada con `spring.jpa.hibernate.ddl-auto=create` o `update`, el archivo `data.sql` se ejecutará automáticamente al iniciar la aplicación.

### Opción 3: Usar el panel de administración

Una vez que los precios estén en la base de datos, puedes modificarlos desde el panel de administración en `/admin` (pestaña "Precios").

## Verificación

Después de ejecutar el script, puedes verificar que todos los precios se insertaron correctamente ejecutando:

```sql
SELECT 
    tp.codigo AS tipo_precio,
    p.codigo AS plan,
    jp.valor
FROM judicial_pricing jp
JOIN tipos_precio tp ON jp.tipo_precio_id = tp.id
LEFT JOIN planes p ON jp.plan_id = p.id
ORDER BY tp.codigo, p.orden;
```

## Notas importantes

1. **Constraint UNIQUE**: La tabla `judicial_pricing` tiene un constraint único en `(tipo_precio_id, plan_id)`. Esto significa que:
   - Para precios con plan: solo puede haber un precio por tipo y plan
   - Para precios sin plan (NULL): puede haber múltiples filas con el mismo `tipo_precio_id` y `plan_id = NULL`

2. **ON DUPLICATE KEY UPDATE**: El script usa `ON DUPLICATE KEY UPDATE` para actualizar precios existentes en lugar de crear duplicados.

3. **Valores NULL**: Para precios sin plan (como "Auxilio Funerario" y "Otros"), el script primero elimina los existentes y luego inserta los nuevos, ya que el constraint UNIQUE no funciona correctamente con valores NULL.

## Actualización de precios

Si necesitas actualizar los precios en el futuro:

1. Modifica los valores en `init-pricing.sql`
2. Ejecuta el script nuevamente (usará `ON DUPLICATE KEY UPDATE` para actualizar)
3. O usa el panel de administración en `/admin`

