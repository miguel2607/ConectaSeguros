# Backend - Conecta API

Backend desarrollado con **Spring Boot 3.2.0** y **Java 17**, siguiendo principios SOLID y patrones de diseño.

## 🏗️ Arquitectura

### Estructura por Capas

```
com.conecta/
├── entity/          # Entidades JPA (Modelos de base de datos)
├── repository/      # Interfaces JPA (Acceso a datos)
├── dto/             # Data Transfer Objects (Transferencia de datos)
├── service/         # Lógica de negocio (Services)
├── controller/      # REST Controllers (Endpoints API)
├── config/          # Configuraciones (Security, CORS, etc.)
├── security/        # Filtros y componentes de seguridad
└── util/            # Utilidades (JWT, etc.)
```

## 🛠️ Tecnologías

- **Spring Boot 3.2.0**: Framework principal
- **Spring Data JPA**: Persistencia de datos
- **Spring Security**: Autenticación y autorización
- **MySQL**: Base de datos
- **JWT (JSON Web Tokens)**: Autenticación stateless
- **Lombok**: Reducción de boilerplate
- **Maven**: Gestión de dependencias

## 📋 Principios SOLID Aplicados

1. **Single Responsibility**: Cada clase tiene una única responsabilidad
2. **Open/Closed**: Extensible sin modificar código existente
3. **Liskov Substitution**: Interfaces bien definidas
4. **Interface Segregation**: Interfaces específicas y pequeñas
5. **Dependency Inversion**: Dependencias a través de interfaces

## 🎨 Patrones de Diseño

- **Repository Pattern**: Acceso a datos abstraído
- **Service Layer**: Lógica de negocio separada
- **DTO Pattern**: Separación de entidades y transferencia
- **Filter Chain**: Autenticación JWT
- **Builder/Factory**: Construcción de objetos complejos

## 🚀 Configuración

### 1. Base de Datos

Crear la base de datos MySQL:

```sql
CREATE DATABASE conecta_db;
```

### 2. Variables de Entorno (Recomendado)

**⚠️ IMPORTANTE: No hardcodees contraseñas en el código**

Configurar variables de entorno antes de ejecutar:

**Windows (PowerShell):**
```powershell
$env:DB_USERNAME="root"
$env:DB_PASSWORD="tu_password"
$env:JWT_SECRET="tu_jwt_secret_muy_seguro"
```

**Windows (CMD):**
```cmd
set DB_USERNAME=root
set DB_PASSWORD=tu_password
set JWT_SECRET=tu_jwt_secret_muy_seguro
```

**Linux/Mac:**
```bash
export DB_USERNAME=root
export DB_PASSWORD=tu_password
export JWT_SECRET=tu_jwt_secret_muy_seguro
```

### 3. Configuración de aplicación

El archivo `application.properties` usa variables de entorno con valores por defecto:

```properties
spring.datasource.username=${DB_USERNAME:root}
spring.datasource.password=${DB_PASSWORD:}
jwt.secret=${JWT_SECRET:default_secret}
```

Si no defines las variables de entorno, se usarán los valores por defecto (no recomendado para producción).

### 4. Ejecutar la aplicación

```bash
mvn spring-boot:run
```

O desde tu IDE, ejecutar `ConectaApplication.java`

## 📡 Endpoints API

### Autenticación

- `POST /api/auth/login` - Login (público)

### Precios

- `GET /api/pricing` - Obtener todos los precios
- `PUT /api/pricing` - Actualizar todos los precios (requiere autenticación)

### Blogs

- `GET /api/blogs` - Listar todos los blogs
- `GET /api/blogs/{id}` - Obtener blog por ID
- `GET /api/blogs/slug/{slug}` - Obtener blog por slug
- `POST /api/blogs` - Crear blog (requiere autenticación)
- `PUT /api/blogs/{id}` - Actualizar blog (requiere autenticación)
- `DELETE /api/blogs/{id}` - Eliminar blog (requiere autenticación)

### Servicios

- `GET /api/services` - Listar todos los servicios
- `GET /api/services/{id}` - Obtener servicio por ID
- `GET /api/services/slug/{slug}` - Obtener servicio por slug
- `POST /api/services` - Crear servicio (requiere autenticación)
- `PUT /api/services/{id}` - Actualizar servicio (requiere autenticación)
- `DELETE /api/services/{id}` - Eliminar servicio (requiere autenticación)

## 🔐 Autenticación

### Usuario por defecto

- **Username**: `admin`
- **Password**: `admin123`

### Uso de JWT

1. Hacer login en `/api/auth/login`
2. Recibir el token JWT en la respuesta
3. Incluir el token en las peticiones protegidas:

```
Authorization: Bearer <token>
```

## 📊 Modelo de Datos

### Tablas Principales

- **planes**: Planes A-G
- **tipos_precio**: Tipos de precios (empleado, conyuge, vida, etc.)
- **judicial_pricing**: Precios (relaciona tipo + plan + valor)
- **blogs**: Posts del blog
- **services**: Servicios de seguros
- **usuarios_admin**: Usuarios administradores

### Consideraciones

- Algunos precios tienen planes A-G (empleado, conyuge, coberturas)
- Algunos tienen planes A-E solamente (progenitores)
- Algunos no tienen plan (auxilio_funerario, otros)

## 🔧 Desarrollo

### Compilar

```bash
mvn clean install
```

### Ejecutar tests

```bash
mvn test
```

### Generar JAR

```bash
mvn package
```

El JAR se generará en `target/conecta-backend-1.0.0.jar`

## 📝 Notas

- El puerto por defecto es `8080`
- CORS está configurado para `http://localhost:5173` y `http://localhost:3000`
- Los scripts SQL se ejecutan automáticamente si `spring.jpa.hibernate.ddl-auto=create`

