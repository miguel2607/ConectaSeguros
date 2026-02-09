package com.conecta.repository;

import com.conecta.entity.JudicialPricing;
import com.conecta.entity.Plan;
import com.conecta.entity.TipoPrecio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository para la entidad JudicialPricing
 * Patrón: Repository (Data Access Layer)
 */
@Repository
public interface JudicialPricingRepository extends JpaRepository<JudicialPricing, Long> {
    Optional<JudicialPricing> findByTipoPrecioAndPlan(TipoPrecio tipoPrecio, Plan plan);
    List<JudicialPricing> findByTipoPrecio(TipoPrecio tipoPrecio);
    List<JudicialPricing> findByTipoPrecioCodigo(String codigo);
    List<JudicialPricing> findByPlanIsNull(); // Para precios sin plan (otros)
    
    @Query("SELECT jp FROM JudicialPricing jp WHERE jp.tipoPrecio.codigo = :codigo AND jp.plan IS NULL")
    Optional<JudicialPricing> findByTipoPrecioCodigoAndPlanIsNull(@Param("codigo") String codigo);
}

