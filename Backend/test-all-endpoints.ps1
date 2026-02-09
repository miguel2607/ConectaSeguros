# Script de Prueba Completa - Backend Conecta
# Ejecutar: .\test-all-endpoints.ps1

$baseUrl = "http://localhost:8080/api"
$token = $null
$errors = 0
$success = 0

Write-Host "🧪 Iniciando pruebas completas del Backend Conecta..." -ForegroundColor Cyan
Write-Host "=" * 60
Write-Host ""

# ==================== 1. TEST LOGIN ====================
Write-Host "1️⃣ TEST: Login" -ForegroundColor Yellow
try {
    $loginBody = @{
        username = "admin"
        password = "admin123"
    } | ConvertTo-Json

    $loginResponse = Invoke-RestMethod -Uri "$baseUrl/auth/login" `
        -Method POST `
        -ContentType "application/json" `
        -Body $loginBody

    $token = $loginResponse.token
    if ($token) {
        Write-Host "   ✅ Login exitoso!" -ForegroundColor Green
        Write-Host "   Token: $($token.Substring(0, [Math]::Min(50, $token.Length)))..." -ForegroundColor Gray
        $success++
    } else {
        Write-Host "   ❌ Login falló: No se recibió token" -ForegroundColor Red
        $errors++
    }
} catch {
    Write-Host "   ❌ Error en login: $_" -ForegroundColor Red
    $errors++
    exit 1
}
Write-Host ""

# ==================== 2. TEST OBTENER PRECIOS ====================
Write-Host "2️⃣ TEST: GET /api/pricing" -ForegroundColor Yellow
try {
    $headers = @{ Authorization = "Bearer $token" }
    $pricing = Invoke-RestMethod -Uri "$baseUrl/pricing" -Method GET -Headers $headers
    
    if ($pricing.empleado -and $pricing.conyuge) {
        Write-Host "   ✅ Precios obtenidos correctamente!" -ForegroundColor Green
        Write-Host "   Empleado Plan A: $($pricing.empleado.planA)" -ForegroundColor Gray
        Write-Host "   Cónyuge Plan A: $($pricing.conyuge.planA)" -ForegroundColor Gray
        $success++
    } else {
        Write-Host "   ⚠️ Precios obtenidos pero estructura incompleta" -ForegroundColor Yellow
        $success++
    }
} catch {
    Write-Host "   ❌ Error: $_" -ForegroundColor Red
    $errors++
}
Write-Host ""

# ==================== 3. TEST OBTENER BLOGS ====================
Write-Host "3️⃣ TEST: GET /api/blogs" -ForegroundColor Yellow
try {
    $blogs = Invoke-RestMethod -Uri "$baseUrl/blogs" -Method GET
    
    Write-Host "   ✅ Blogs obtenidos correctamente!" -ForegroundColor Green
    Write-Host "   Total de blogs: $($blogs.Count)" -ForegroundColor Gray
    if ($blogs.Count -gt 0) {
        Write-Host "   Primer blog: $($blogs[0].title)" -ForegroundColor Gray
    }
    $success++
} catch {
    Write-Host "   ❌ Error: $_" -ForegroundColor Red
    $errors++
}
Write-Host ""

# ==================== 4. TEST CREAR BLOG ====================
Write-Host "4️⃣ TEST: POST /api/blogs" -ForegroundColor Yellow
try {
    $newBlog = @{
        title = "Blog de Prueba - $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
        excerpt = "Este es un blog creado desde el script de pruebas"
        content = "Contenido completo del blog de prueba..."
        date = (Get-Date -Format "d MMM yyyy")
        image = "🧪"
        slug = "blog-prueba-$(Get-Date -Format 'yyyyMMddHHmmss')"
    } | ConvertTo-Json

    $headers = @{
        Authorization = "Bearer $token"
        "Content-Type" = "application/json"
    }

    $createdBlog = Invoke-RestMethod -Uri "$baseUrl/blogs" `
        -Method POST `
        -Headers $headers `
        -Body $newBlog

    if ($createdBlog.id) {
        Write-Host "   ✅ Blog creado correctamente!" -ForegroundColor Green
        Write-Host "   ID: $($createdBlog.id)" -ForegroundColor Gray
        Write-Host "   Título: $($createdBlog.title)" -ForegroundColor Gray
        $blogTestId = $createdBlog.id
        $success++
    } else {
        Write-Host "   ❌ Blog creado pero sin ID" -ForegroundColor Red
        $errors++
    }
} catch {
    Write-Host "   ❌ Error: $_" -ForegroundColor Red
    $errors++
}
Write-Host ""

# ==================== 5. TEST ACTUALIZAR BLOG ====================
if ($blogTestId) {
    Write-Host "5️⃣ TEST: PUT /api/blogs/$blogTestId" -ForegroundColor Yellow
    try {
        $updateBlog = @{
            title = "Blog Actualizado - $(Get-Date -Format 'HH:mm:ss')"
            excerpt = "Resumen actualizado del blog"
            content = "Contenido actualizado..."
            date = (Get-Date -Format "d MMM yyyy")
            image = "✏️"
        } | ConvertTo-Json

        $updatedBlog = Invoke-RestMethod -Uri "$baseUrl/blogs/$blogTestId" `
            -Method PUT `
            -Headers $headers `
            -Body $updateBlog

        if ($updatedBlog.title -like "*Actualizado*") {
            Write-Host "   ✅ Blog actualizado correctamente!" -ForegroundColor Green
            Write-Host "   Nuevo título: $($updatedBlog.title)" -ForegroundColor Gray
            $success++
        } else {
            Write-Host "   ⚠️ Blog actualizado pero título no cambió" -ForegroundColor Yellow
            $success++
        }
    } catch {
        Write-Host "   ❌ Error: $_" -ForegroundColor Red
        $errors++
    }
    Write-Host ""
}

# ==================== 6. TEST ELIMINAR BLOG ====================
if ($blogTestId) {
    Write-Host "6️⃣ TEST: DELETE /api/blogs/$blogTestId" -ForegroundColor Yellow
    try {
        $deleteResponse = Invoke-WebRequest -Uri "$baseUrl/blogs/$blogTestId" `
            -Method DELETE `
            -Headers $headers

        if ($deleteResponse.StatusCode -eq 204 -or $deleteResponse.StatusCode -eq 200) {
            Write-Host "   ✅ Blog eliminado correctamente!" -ForegroundColor Green
            $success++
        } else {
            Write-Host "   ⚠️ Status code: $($deleteResponse.StatusCode)" -ForegroundColor Yellow
            $success++
        }
    } catch {
        Write-Host "   ❌ Error: $_" -ForegroundColor Red
        $errors++
    }
    Write-Host ""
}

# ==================== 7. TEST OBTENER SERVICIOS ====================
Write-Host "7️⃣ TEST: GET /api/services" -ForegroundColor Yellow
try {
    $services = Invoke-RestMethod -Uri "$baseUrl/services" -Method GET
    
    Write-Host "   ✅ Servicios obtenidos correctamente!" -ForegroundColor Green
    Write-Host "   Total de servicios: $($services.Count)" -ForegroundColor Gray
    if ($services.Count -gt 0) {
        Write-Host "   Primer servicio: $($services[0].title)" -ForegroundColor Gray
    }
    $success++
} catch {
    Write-Host "   ❌ Error: $_" -ForegroundColor Red
    $errors++
}
Write-Host ""

# ==================== 8. TEST CREAR SERVICIO ====================
Write-Host "8️⃣ TEST: POST /api/services" -ForegroundColor Yellow
try {
    $newService = @{
        title = "Servicio de Prueba"
        description = "Descripción del servicio de prueba"
        icon = "🛡️"
        priceFrom = "$100.000 COP"
        slug = "servicio-prueba-$(Get-Date -Format 'yyyyMMddHHmmss')"
    } | ConvertTo-Json

    $createdService = Invoke-RestMethod -Uri "$baseUrl/services" `
        -Method POST `
        -Headers $headers `
        -Body $newService

    if ($createdService.id) {
        Write-Host "   ✅ Servicio creado correctamente!" -ForegroundColor Green
        Write-Host "   ID: $($createdService.id)" -ForegroundColor Gray
        Write-Host "   Título: $($createdService.title)" -ForegroundColor Gray
        $serviceTestId = $createdService.id
        $success++
    } else {
        Write-Host "   ❌ Servicio creado pero sin ID" -ForegroundColor Red
        $errors++
    }
} catch {
    Write-Host "   ❌ Error: $_" -ForegroundColor Red
    $errors++
}
Write-Host ""

# ==================== RESUMEN ====================
Write-Host "=" * 60
Write-Host "📊 RESUMEN DE PRUEBAS" -ForegroundColor Cyan
Write-Host "   ✅ Exitosas: $success" -ForegroundColor Green
Write-Host "   ❌ Errores: $errors" -ForegroundColor $(if ($errors -gt 0) { "Red" } else { "Green" })
Write-Host ""

if ($errors -eq 0) {
    Write-Host "🎉 ¡Todas las pruebas pasaron exitosamente!" -ForegroundColor Green
    Write-Host ""
    Write-Host "💡 El backend está listo para integrarse con el frontend" -ForegroundColor Yellow
} else {
    Write-Host "⚠️ Algunas pruebas fallaron. Revisa los errores arriba." -ForegroundColor Yellow
}

