package com.conecta.repository;

import com.conecta.entity.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository para la entidad Service
 * Patrón: Repository (Data Access Layer)
 */
@Repository
public interface ServiceRepository extends JpaRepository<Service, Long> {
    Optional<Service> findBySlug(String slug);
}

