# Despliegue en GitHub y Render

Guía para subir el proyecto a GitHub y desplegarlo en Render (frontend + backend).

---

## 1. Subir a GitHub

### Requisitos
- Cuenta en [GitHub](https://github.com)
- Git instalado

### Pasos

1. **Inicializar repositorio** (si aún no está en Git):
   ```bash
   cd C:\Users\MIGUEL\OneDrive\Desktop\PruebaConecta
   git init
   ```

2. **Configurar usuario** (si no lo has hecho antes):
   ```bash
   git config user.name "Tu Nombre"
   git config user.email "tu@email.com"
   ```

3. **Crear repositorio en GitHub**
   - Ve a https://github.com/new
   - Nombre ej.: `conecta-seguros`
   - No marques "Add a README" si ya tienes código local
   - Crear repositorio

4. **Conectar y subir**:
   ```bash
   git add .
   git status
   git commit -m "Preparar proyecto para despliegue en Render"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/conecta-seguros.git
   git push -u origin main
   ```

**Importante:** En tu máquina, para desarrollo local, define la variable de entorno `DB_PASSWORD` (o crea un archivo `Backend/src/main/resources/application-local.properties` con `spring.datasource.password=tu_password` y no lo subas a Git).

---

## 2. Base de datos para producción (PostgreSQL)

El proyecto usa **PostgreSQL**. En Render puedes crear una base de datos PostgreSQL desde el panel:

1. En Render: **New → PostgreSQL**.
2. Crea la base (ej. `conecta_db`) y anota las variables que Render te da (o la **Internal Database URL**).
3. **Importante:** Render da una URL tipo `postgresql://usuario:contraseña@host:5432/base`. En el backend debes usar **tres variables por separado**; **no** pegues usuario ni contraseña dentro de la URL.
   - **SPRING_DATASOURCE_URL** = solo: `jdbc:postgresql://HOST:5432/NOMBRE_BASE`  
     Sin `usuario:contraseña@`. HOST debe ser el host completo (ej. `dpg-d6502k6r433s73egukn0-a.oregon-postgres.render.com`). Si en Render solo ves `dpg-xxxxx-a`, añade `.oregon-postgres.render.com`. Puerto `:5432` obligatorio.
   - **DB_USERNAME** = el usuario (ej. `conecta_db_ter6_user`).
   - **DB_PASSWORD** = la contraseña (la que va después de `usuario:` en la Internal URL).
   - Ejemplo correcto: **SPRING_DATASOURCE_URL** = `jdbc:postgresql://dpg-d6502k6r433s73egukn0-a.oregon-postgres.render.com:5432/conecta_db_ter6`, **DB_USERNAME** = `conecta_db_ter6_user`, **DB_PASSWORD** = (tu contraseña). **Incorrecto:** poner `jdbc:postgresql://usuario:password@host/base` en SPRING_DATASOURCE_URL.

Si usas otro proveedor (Railway, Aiven, etc.), crea una base PostgreSQL y anota URL, usuario y contraseña.

**Crear tablas:** Con `spring.jpa.hibernate.ddl-auto=update` el backend crea/actualiza las tablas al arrancar. Si prefieres hacerlo a mano, ejecuta `Backend/src/main/resources/schema.sql` en tu base. Luego ejecuta `init-admin.sql` para crear el usuario admin (password por defecto: admin123).

---

## 3. Desplegar Backend en Render

Tienes dos opciones: **Docker** (recomendado) o **Native (Java)**.

### Opción A: Backend con Docker (recomendado)

1. Entra en [Render](https://render.com) y crea una cuenta o inicia sesión.

2. **New → Web Service**.

3. Conecta el repositorio de GitHub (autoriza si pide permisos).

4. Configuración del servicio:
   - **Name:** `conecta-backend` (o el que prefieras)
   - **Region:** el más cercano a tus usuarios
   - **Branch:** `main`
   - **Root Directory:** `Backend`
   - **Runtime:** `Docker`
   - (Render detecta el `Dockerfile` dentro de `Backend` y lo usa automáticamente. No hace falta Build Command ni Start Command.)

5. **Environment Variables** (obligatorias):
   - Las mismas que en la tabla de abajo (opción B).

6. Crear Web Service. La API quedará en `https://conecta-backend.onrender.com/api`.

### Opción B: Backend nativo (Java, sin Docker)

1. Entra en [Render](https://render.com) y **New → Web Service**.

2. Conecta el repositorio de GitHub.

3. Configuración del servicio:
   - **Name:** `conecta-backend`
   - **Branch:** `main`
   - **Root Directory:** `Backend`
   - **Runtime:** `Java`
   - **Build Command:** `mvn clean package -DskipTests`
   - **Start Command:** `java -jar target/conecta-backend-1.0.0.jar`

4. **Environment Variables** (obligatorias):

   | Key | Value |
   |-----|--------|
   | `PORT` | (Render lo asigna; el backend ya usa `${PORT}`) |
   | `SPRING_DATASOURCE_URL` | `jdbc:postgresql://TU_HOST:5432/TU_DB` (o la URL que te dé Render/PostgreSQL) |
   | `DB_USERNAME` | usuario de la BD |
   | `DB_PASSWORD` | contraseña de la BD |
   | `JWT_SECRET` | una cadena larga y aleatoria (ej. generada con un generador de contraseñas) |
   | `CORS_ORIGINS` | Origen exacto del frontend, ej. `https://conectaseguros.onrender.com` (sin `/` al final; sin esto el login desde el admin dará error CORS) |

5. Crear Web Service. Cuando termine el deploy, anota la URL del backend (ej. `https://conecta-backend.onrender.com`). La API quedará en `https://conecta-backend.onrender.com/api`.

---

## 4. Desplegar Frontend en Render

1. En Render: **New → Static Site**.

2. Conecta el mismo repositorio de GitHub.

3. Configuración:
   - **Name:** `conecta-frontend` (o el que prefieras)
   - **Branch:** `main`
   - **Root Directory:** (dejar vacío; el frontend está en la raíz)
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`

4. **Environment Variables** (para que el frontend llame al backend en producción):

   | Key | Value |
   |-----|--------|
   | `VITE_API_URL` | `https://TU-BACKEND.onrender.com/api` |

   Sustituye `TU-BACKEND` por el nombre real del servicio backend en Render.

5. Crear Static Site. Cuando termine, tendrás la URL del sitio (ej. `https://conecta-frontend.onrender.com`).

6. **Redirects/Rewrites (obligatorio para ver el panel Admin):** Si al ir a `/admin` solo ves "Not Found" o la URL sin contenido, falta esta regla:
   - En [Render Dashboard](https://dashboard.render.com) → tu **Static Site** (ej. conectaseguros) → pestaña **Redirects/Rewrites**.
   - Pulsa **Add Rule** y configura:
     - **Source:** `/*`
     - **Destination:** `/index.html`
     - **Action:** **Rewrite** (no Redirect)
   - Guarda. Con esto, todas las rutas (`/admin`, `/blog`, etc.) sirven `index.html` y React Router muestra el panel correcto.

7. **CORS:** En el backend de Render, la variable `CORS_ORIGINS` debe incluir exactamente la URL del frontend (ej. `https://conecta-frontend.onrender.com`). Si ya la definiste en el paso 3, no hace falta cambiar nada; si cambias la URL del frontend, actualiza `CORS_ORIGINS` en el backend.

---

## 5. Resumen de URLs y variables

- **Frontend (producción):** `https://conecta-frontend.onrender.com`  
  Variable: `VITE_API_URL` = URL del backend + `/api`

- **Backend (producción):** `https://conecta-backend.onrender.com`  
  Variables: `SPRING_DATASOURCE_URL`, `DB_USERNAME`, `DB_PASSWORD`, `JWT_SECRET`, `CORS_ORIGINS`

- **Admin:** Entra a `https://conecta-frontend.onrender.com/admin` y usa el usuario creado con `init-admin.sql` en la base de datos de producción. (Para que `/admin` no dé "Not Found", debe estar configurada la Rewrite `/*` → `/index.html` en Redirects/Rewrites del Static Site; ver paso 6 anterior.)

---

## 6. Ejecutar con Docker en local

En la raíz del proyecto puedes levantar backend + PostgreSQL con Docker:

```bash
docker-compose up --build
```

- **Backend:** http://localhost:8082  
- **PostgreSQL:** localhost:5432 (usuario `postgres`, contraseña `postgres`, base `conecta_db`).

El frontend sigue ejecutándose con `npm run dev` en tu máquina (no está en el compose). Configura `VITE_API_URL=http://localhost:8082/api` si hace falta.

---

## 7. Notas

- En el plan gratuito de Render, el backend puede “dormirse” tras inactividad; la primera petición puede tardar más.
- No subas `application.properties` con contraseñas; el proyecto ya usa variables de entorno. Para desarrollo local, usa `DB_PASSWORD` en el sistema o un `application-local.properties` que no esté en Git.
- Si usas **Docker** en Render, no hace falta Build/Start Command; si usas **Java** nativo, ajusta el Start Command si cambias el nombre del JAR en `pom.xml`.
