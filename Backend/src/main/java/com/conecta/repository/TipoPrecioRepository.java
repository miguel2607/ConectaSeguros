package com.conecta.repository;

import com.conecta.entity.TipoPrecio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository para la entidad TipoPrecio
 * Patrón: Repository (Data Access Layer)
 */
@Repository
public interface TipoPrecioRepository extends JpaRepository<TipoPrecio, Long> {
    Optional<TipoPrecio> findByCodigo(String codigo);
    List<TipoPrecio> findByCategoria(String categoria);
}

