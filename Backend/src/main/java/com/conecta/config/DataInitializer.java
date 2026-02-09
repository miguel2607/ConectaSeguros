package com.conecta.config;

import com.conecta.entity.UsuarioAdmin;
import com.conecta.repository.UsuarioAdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Inicializador de datos
 * Crea el usuario admin por defecto si no existe
 */
@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    
    private final UsuarioAdminRepository usuarioAdminRepository;
    private final PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) {
        // Verificar si existe el usuario admin
        if (!usuarioAdminRepository.findByUsername("admin").isPresent()) {
            System.out.println("🔧 Creando usuario admin por defecto...");
            
            UsuarioAdmin admin = new UsuarioAdmin();
            admin.setUsername("admin");
            // Hash BCrypt de "admin123" - se genera automáticamente
            admin.setPasswordHash(passwordEncoder.encode("admin123"));
            admin.setRoles("ROLE_ADMIN");
            
            usuarioAdminRepository.save(admin);
            System.out.println("✅ Usuario admin creado exitosamente!");
            System.out.println("   Username: admin");
            System.out.println("   Password: admin123");
        } else {
            System.out.println("✅ Usuario admin ya existe en la base de datos");
        }
    }
}

