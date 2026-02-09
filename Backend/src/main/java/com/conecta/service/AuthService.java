package com.conecta.service;

import com.conecta.dto.LoginRequestDTO;
import com.conecta.dto.LoginResponseDTO;
import com.conecta.entity.UsuarioAdmin;
import com.conecta.repository.UsuarioAdminRepository;
import com.conecta.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service para autenticación
 * Patrón: Service Layer
 * Principio SOLID: Single Responsibility
 */
@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final UsuarioAdminRepository usuarioAdminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    
    @Transactional(readOnly = true)
    public LoginResponseDTO login(LoginRequestDTO request) {
        UsuarioAdmin usuario = usuarioAdminRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Credenciales inválidas"));
        
        if (!passwordEncoder.matches(request.getPassword(), usuario.getPasswordHash())) {
            throw new RuntimeException("Credenciales inválidas");
        }
        
        String token = jwtUtil.generateToken(usuario.getUsername());
        
        return new LoginResponseDTO(
                token,
                "Bearer",
                usuario.getUsername(),
                "Login exitoso"
        );
    }
}

