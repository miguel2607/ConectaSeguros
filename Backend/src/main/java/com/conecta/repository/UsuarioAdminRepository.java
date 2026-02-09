package com.conecta.repository;

import com.conecta.entity.UsuarioAdmin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository para la entidad UsuarioAdmin
 * Patrón: Repository (Data Access Layer)
 */
@Repository
public interface UsuarioAdminRepository extends JpaRepository<UsuarioAdmin, Long> {
    Optional<UsuarioAdmin> findByUsername(String username);
}

