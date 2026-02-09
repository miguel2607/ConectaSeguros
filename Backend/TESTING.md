# Guía de Pruebas - Backend Conecta

## 🧪 Prueba de Endpoints

### 1. Herramientas Recomendadas

- **Postman** (Recomendado): https://www.postman.com/downloads/
- **Thunder Client** (Extensión VS Code)
- **curl** (Línea de comandos)
- **Navegador** (Solo para GET)

### 2. Endpoints Disponibles

#### 🔐 Autenticación (Público)

**Login**
```
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

**Respuesta exitosa:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "username": "admin",
  "message": "Login exitoso"
}
```

---

#### 💰 Precios (Requiere autenticación)

**Obtener todos los precios**
```
GET http://localhost:8080/api/pricing
Authorization: Bearer <token>
```

**Actualizar precios**
```
PUT http://localhost:8080/api/pricing
Authorization: Bearer <token>
Content-Type: application/json

{
  "empleado": {
    "planA": "241,600",
    "planB": "195,000",
    ...
  },
  "conyuge": {
    "planA": "241,600",
    ...
  },
  ...
}
```

---

#### 📝 Blogs (Requiere autenticación para POST/PUT/DELETE)

**Listar todos los blogs**
```
GET http://localhost:8080/api/blogs
```

**Obtener blog por ID**
```
GET http://localhost:8080/api/blogs/1
```

**Obtener blog por slug**
```
GET http://localhost:8080/api/blogs/slug/5-tips-seguro-adecuado
```

**Crear blog**
```
POST http://localhost:8080/api/blogs
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Nuevo Blog Post",
  "excerpt": "Resumen del blog...",
  "content": "Contenido completo...",
  "date": "15 Ene 2024",
  "image": "📝",
  "slug": "nuevo-blog-post"
}
```

**Actualizar blog**
```
PUT http://localhost:8080/api/blogs/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Título actualizado",
  "excerpt": "Resumen actualizado...",
  ...
}
```

**Eliminar blog**
```
DELETE http://localhost:8080/api/blogs/1
Authorization: Bearer <token>
```

---

#### 🛡️ Servicios (Requiere autenticación para POST/PUT/DELETE)

**Listar todos los servicios**
```
GET http://localhost:8080/api/services
```

**Obtener servicio por ID**
```
GET http://localhost:8080/api/services/1
```

**Obtener servicio por slug**
```
GET http://localhost:8080/api/services/slug/seguro-hogar
```

**Crear servicio**
```
POST http://localhost:8080/api/services
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Nuevo Servicio",
  "description": "Descripción del servicio...",
  "icon": "🛡️",
  "priceFrom": "$50.000 COP",
  "slug": "nuevo-servicio"
}
```

**Actualizar servicio**
```
PUT http://localhost:8080/api/services/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Título actualizado",
  ...
}
```

**Eliminar servicio**
```
DELETE http://localhost:8080/api/services/1
Authorization: Bearer <token>
```

---

## 📋 Ejemplos con curl (PowerShell)

### 1. Login
```powershell
$body = @{
    username = "admin"
    password = "admin123"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:8080/api/auth/login" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body

$token = $response.token
Write-Host "Token: $token"
```

### 2. Obtener Precios
```powershell
$headers = @{
    Authorization = "Bearer $token"
}

$pricing = Invoke-RestMethod -Uri "http://localhost:8080/api/pricing" `
    -Method GET `
    -Headers $headers

$pricing | ConvertTo-Json -Depth 10
```

### 3. Crear Blog
```powershell
$blog = @{
    title = "Mi Nuevo Blog"
    excerpt = "Este es un resumen..."
    content = "Contenido completo del blog..."
    date = "15 Ene 2024"
    image = "📝"
    slug = "mi-nuevo-blog"
} | ConvertTo-Json

$headers = @{
    Authorization = "Bearer $token"
    "Content-Type" = "application/json"
}

$response = Invoke-RestMethod -Uri "http://localhost:8080/api/blogs" `
    -Method POST `
    -Headers $headers `
    -Body $blog

$response | ConvertTo-Json
```

---

## 🌐 Prueba desde el Navegador

Para endpoints GET (sin autenticación), puedes probar directamente:

1. **Listar blogs**: http://localhost:8080/api/blogs
2. **Listar servicios**: http://localhost:8080/api/services

**Nota**: Los endpoints que requieren autenticación mostrarán un error 401 desde el navegador.

---

## 🔗 Integración con Frontend

### Paso 1: Crear archivo de configuración API

En tu proyecto React, crea `src/config/api.ts`:

```typescript
const API_BASE_URL = 'http://localhost:8080/api';

export const api = {
  baseURL: API_BASE_URL,
  
  // Helper para hacer peticiones con autenticación
  async request(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('admin_token');
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },
  
  // Métodos específicos
  async login(username: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    
    const data = await response.json();
    if (data.token) {
      localStorage.setItem('admin_token', data.token);
    }
    return data;
  },
  
  async getPricing() {
    return this.request('/pricing');
  },
  
  async updatePricing(pricingData: any) {
    return this.request('/pricing', {
      method: 'PUT',
      body: JSON.stringify(pricingData),
    });
  },
  
  async getBlogs() {
    return this.request('/blogs');
  },
  
  async createBlog(blog: any) {
    return this.request('/blogs', {
      method: 'POST',
      body: JSON.stringify(blog),
    });
  },
  
  async updateBlog(id: number, blog: any) {
    return this.request(`/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(blog),
    });
  },
  
  async deleteBlog(id: number) {
    return this.request(`/blogs/${id}`, {
      method: 'DELETE',
    });
  },
  
  async getServices() {
    return this.request('/services');
  },
  
  async createService(service: any) {
    return this.request('/services', {
      method: 'POST',
      body: JSON.stringify(service),
    });
  },
  
  async updateService(id: number, service: any) {
    return this.request(`/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(service),
    });
  },
  
  async deleteService(id: number) {
    return this.request(`/services/${id}`, {
      method: 'DELETE',
    });
  },
};
```

### Paso 2: Actualizar Admin.tsx para usar la API

Reemplazar `localStorage` por llamadas a la API real.

### Paso 3: Actualizar componentes para cargar datos del backend

Modificar `Blog.tsx`, `Services.tsx`, `JudicialSura.tsx` para cargar datos desde el backend.

---

## ✅ Checklist de Pruebas

- [ ] Backend corriendo en http://localhost:8080
- [ ] Login funciona y devuelve token
- [ ] GET /api/pricing devuelve datos
- [ ] PUT /api/pricing actualiza correctamente
- [ ] GET /api/blogs lista blogs
- [ ] POST /api/blogs crea nuevo blog
- [ ] PUT /api/blogs/{id} actualiza blog
- [ ] DELETE /api/blogs/{id} elimina blog
- [ ] GET /api/services lista servicios
- [ ] POST /api/services crea nuevo servicio
- [ ] Frontend se conecta al backend
- [ ] Autenticación funciona desde frontend
- [ ] Datos se cargan desde backend en frontend

---

## 🐛 Troubleshooting

### Error 401 (Unauthorized)
- Verifica que el token esté incluido en el header `Authorization: Bearer <token>`
- Verifica que el token no haya expirado (24 horas por defecto)

### Error 403 (Forbidden)
- Verifica que el usuario tenga los roles correctos

### Error 500 (Internal Server Error)
- Revisa los logs del backend
- Verifica que la base de datos esté corriendo
- Verifica que las tablas existan

### CORS Error
- Verifica que `application.properties` tenga configurado CORS correctamente
- Verifica que la URL del frontend esté en la lista de orígenes permitidos

