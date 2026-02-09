# Permisos de Endpoints - Backend Conecta

## 🔓 Endpoints Públicos (Sin Autenticación)

### Autenticación
- `POST /api/auth/login` - Login (obtener token)

### Lectura Pública
- `GET /api/blogs` - Listar todos los blogs
- `GET /api/blogs/{id}` - Obtener blog por ID
- `GET /api/blogs/slug/{slug}` - Obtener blog por slug
- `GET /api/services` - Listar todos los servicios
- `GET /api/services/{id}` - Obtener servicio por ID
- `GET /api/services/slug/{slug}` - Obtener servicio por slug

---

## 🔒 Endpoints Protegidos (Requieren Token JWT)

**Todos estos endpoints requieren el header:**
```
Authorization: Bearer <token>
```

### Precios (Solo Admin)
- `GET /api/pricing` - Obtener todos los precios
- `PUT /api/pricing` - Actualizar precios

### Blogs (Solo Admin)
- `POST /api/blogs` - Crear nuevo blog
- `PUT /api/blogs/{id}` - Actualizar blog
- `DELETE /api/blogs/{id}` - Eliminar blog

### Servicios (Solo Admin)
- `POST /api/services` - Crear nuevo servicio
- `PUT /api/services/{id}` - Actualizar servicio
- `DELETE /api/services/{id}` - Eliminar servicio

---

## 📋 Resumen

| Endpoint | Método | Público | Requiere Token |
|----------|--------|--------|----------------|
| `/api/auth/login` | POST | ✅ | ❌ |
| `/api/blogs` | GET | ✅ | ❌ |
| `/api/blogs/{id}` | GET | ✅ | ❌ |
| `/api/blogs/slug/{slug}` | GET | ✅ | ❌ |
| `/api/blogs` | POST | ❌ | ✅ |
| `/api/blogs/{id}` | PUT | ❌ | ✅ |
| `/api/blogs/{id}` | DELETE | ❌ | ✅ |
| `/api/services` | GET | ✅ | ❌ |
| `/api/services/{id}` | GET | ✅ | ❌ |
| `/api/services/slug/{slug}` | GET | ✅ | ❌ |
| `/api/services` | POST | ❌ | ✅ |
| `/api/services/{id}` | PUT | ❌ | ✅ |
| `/api/services/{id}` | DELETE | ❌ | ✅ |
| `/api/pricing` | GET | ❌ | ✅ |
| `/api/pricing` | PUT | ❌ | ✅ |

---

## 🔐 Cómo Obtener el Token

1. Hacer POST a `/api/auth/login` con:
   ```json
   {
     "username": "admin",
     "password": "admin123"
   }
   ```

2. Recibirás una respuesta:
   ```json
   {
     "token": "eyJhbGciOiJIUzM4NCJ9...",
     "type": "Bearer",
     "username": "admin",
     "message": "Login exitoso"
   }
   ```

3. Usar el token en las peticiones protegidas:
   ```
   Authorization: Bearer eyJhbGciOiJIUzM4NCJ9...
   ```

---

## ⚠️ Errores Comunes

### 401 Unauthorized
- **Causa**: Token no enviado, token inválido o token expirado
- **Solución**: Hacer login nuevamente para obtener un nuevo token

### 403 Forbidden
- **Causa**: Intentando acceder a un endpoint protegido sin token
- **Solución**: Incluir el header `Authorization: Bearer <token>`

### Token Expirado
- **Duración**: 24 horas por defecto
- **Solución**: Hacer login nuevamente

