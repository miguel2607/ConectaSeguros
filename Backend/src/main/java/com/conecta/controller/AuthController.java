package com.conecta.controller;

import com.conecta.dto.LoginRequestDTO;
import com.conecta.dto.LoginResponseDTO;
import com.conecta.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller para autenticación
 * Patrón: REST Controller
 * Principio SOLID: Single Responsibility
 */
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class AuthController {
    
    private final AuthService authService;
    
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@Valid @RequestBody LoginRequestDTO request) {
        try {
            LoginResponseDTO response = authService.login(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(
                    new LoginResponseDTO(null, null, null, "Credenciales inválidas")
            );
        }
    }
}

