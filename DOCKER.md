# Docker – Probar y desplegar

## Probar en local

Desde la **raíz del proyecto** (donde está `docker-compose.yml`):

```bash
docker-compose up --build
```

- **Backend:** http://localhost:8082  
- **PostgreSQL:** `localhost:5432`, usuario `postgres`, contraseña `postgres`, base `conecta_db`.

El frontend no va en el compose: ejecútalo aparte con `npm run dev` y usa `VITE_API_URL=http://localhost:8082/api` si hace falta.

Para parar:

```bash
docker-compose down
```

## Desplegar en Render con Docker

1. **Backend:** En Render → **New → Web Service**.
2. Conecta el repo de GitHub.
3. **Root Directory:** `Backend`.
4. **Runtime:** `Docker` (Render usará el `Dockerfile` de esa carpeta).
5. Variables de entorno (obligatorias):
   - `SPRING_DATASOURCE_URL` → URL JDBC de tu PostgreSQL (ej. de Render PostgreSQL).
   - `DB_USERNAME` / `DB_PASSWORD`
   - `JWT_SECRET` (cadena larga aleatoria)
   - `CORS_ORIGINS` → URL del frontend (ej. `https://tu-frontend.onrender.com`)
6. Crear. La API quedará en `https://tu-backend.onrender.com/api`.

El frontend en Render se despliega como **Static Site** (sin Docker): build `npm run build`, publicar `dist`, y variable `VITE_API_URL` apuntando al backend.
