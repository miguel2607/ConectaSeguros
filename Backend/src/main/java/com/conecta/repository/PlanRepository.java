package com.conecta.repository;

import com.conecta.entity.Plan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository para la entidad Plan
 * Patrón: Repository (Data Access Layer)
 * Principio SOLID: Interface Segregation - Solo métodos necesarios
 */
@Repository
public interface PlanRepository extends JpaRepository<Plan, Long> {
    Optional<Plan> findByCodigo(String codigo);
}

