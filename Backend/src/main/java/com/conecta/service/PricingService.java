package com.conecta.service;

import com.conecta.dto.PricingDataDTO;
import com.conecta.entity.JudicialPricing;
import com.conecta.entity.Plan;
import com.conecta.entity.TipoPrecio;
import com.conecta.repository.JudicialPricingRepository;
import com.conecta.repository.PlanRepository;
import com.conecta.repository.TipoPrecioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Service para gestión de precios
 * Patrón: Service Layer
 * Principio SOLID: Single Responsibility - Solo maneja lógica de precios
 */
@Service
@RequiredArgsConstructor
public class PricingService {
    
    private final JudicialPricingRepository pricingRepository;
    private final TipoPrecioRepository tipoPrecioRepository;
    private final PlanRepository planRepository;
    
    /**
     * Obtiene todos los precios estructurados para el frontend
     * Patrón: Builder/Factory - Construye el objeto complejo
     */
    @Transactional(readOnly = true)
    public PricingDataDTO getAllPricing() {
        PricingDataDTO dto = new PricingDataDTO();
        
        // Precios de Empleado (Planes A-G)
        dto.setEmpleado(buildPricingMap("empleado", List.of("A", "B", "C", "D", "E", "F", "G")));
        
        // Precios de Cónyuge (Planes A-G)
        dto.setConyuge(buildPricingMap("conyuge", List.of("A", "B", "C", "D", "E", "F", "G")));
        
        // Coberturas
        PricingDataDTO.CoberturasDTO coberturas = new PricingDataDTO.CoberturasDTO();
        coberturas.setVida(buildPricingMap("vida", List.of("A", "B", "C", "D", "E", "F", "G")));
        coberturas.setInvalidez(buildPricingMap("invalidez", List.of("A", "B", "C", "D", "E", "F", "G")));
        coberturas.setEnfermedadesGraves(buildPricingMap("enfermedades_graves", List.of("A", "B", "C", "D", "E", "F", "G")));
        coberturas.setAuxilioFunerario(getPricingWithoutPlan("auxilio_funerario"));
        coberturas.setBonoCanasta(buildPricingMap("bono_canasta", List.of("A", "B", "C", "D", "E", "F", "G")));
        coberturas.setAuxilioMaternidad(buildPricingMap("auxilio_maternidad", List.of("A", "B", "C", "D", "E", "F", "G")));
        coberturas.setMuerteAccidental(buildPricingMap("muerte_accidental", List.of("A", "B", "C", "D", "E", "F", "G")));
        coberturas.setInvalidezDesmembracion(buildPricingMap("invalidez_desmembracion", List.of("A", "B", "C", "D", "E", "F", "G")));
        dto.setCoberturas(coberturas);
        
        // Progenitores (Planes A-E solamente)
        PricingDataDTO.ProgenitoresDTO progenitores = new PricingDataDTO.ProgenitoresDTO();
        progenitores.setVida(buildPricingMap("progenitores_vida", List.of("A", "B", "C", "D", "E")));
        progenitores.setInvalidez(buildPricingMap("progenitores_invalidez", List.of("A", "B", "C", "D", "E")));
        progenitores.setFunerario(buildPricingMap("progenitores_funerario", List.of("A", "B", "C", "D", "E")));
        dto.setProgenitores(progenitores);
        
        // Otros (sin plan)
        PricingDataDTO.OtrosDTO otros = new PricingDataDTO.OtrosDTO();
        otros.setDesde(getPricingWithoutPlan("otros_desde"));
        otros.setHasta(getPricingWithoutPlan("otros_hasta"));
        otros.setSalud(getPricingWithoutPlan("otros_salud"));
        otros.setAutos(getPricingWithoutPlan("otros_autos"));
        otros.setMotos(getPricingWithoutPlan("otros_motos"));
        dto.setOtros(otros);
        
        return dto;
    }
    
    /**
     * Construye un mapa de precios para un tipo específico y planes dados
     * Helper method - Patrón: Template Method
     */
    private Map<String, String> buildPricingMap(String tipoCodigo, List<String> planes) {
        Map<String, String> map = new HashMap<>();
        
        TipoPrecio tipoPrecio = tipoPrecioRepository.findByCodigo(tipoCodigo).orElse(null);
        if (tipoPrecio == null) {
            System.err.println("⚠️ Tipo de precio no encontrado: " + tipoCodigo);
            return map; // Retornar mapa vacío en lugar de lanzar excepción
        }
        
        for (String planCodigo : planes) {
            Plan plan = planRepository.findByCodigo(planCodigo).orElse(null);
            if (plan == null) {
                System.err.println("⚠️ Plan no encontrado: " + planCodigo);
                continue;
            }
            
            pricingRepository.findByTipoPrecioAndPlan(tipoPrecio, plan)
                    .ifPresent(pricing -> map.put("plan" + planCodigo, pricing.getValor()));
        }
        
        return map;
    }
    
    /**
     * Obtiene un precio que no tiene plan asociado
     */
    private String getPricingWithoutPlan(String tipoCodigo) {
        return pricingRepository.findByTipoPrecioCodigoAndPlanIsNull(tipoCodigo)
                .map(JudicialPricing::getValor)
                .orElse("");
    }
    
    /**
     * Actualiza todos los precios
     * Patrón: Transaction Script
     */
    @Transactional
    public void updateAllPricing(PricingDataDTO dto) {
        // Actualizar empleado
        updatePricingMap("empleado", dto.getEmpleado(), List.of("A", "B", "C", "D", "E", "F", "G"));
        
        // Actualizar conyuge
        updatePricingMap("conyuge", dto.getConyuge(), List.of("A", "B", "C", "D", "E", "F", "G"));
        
        // Actualizar coberturas
        if (dto.getCoberturas() != null) {
            updatePricingMap("vida", dto.getCoberturas().getVida(), List.of("A", "B", "C", "D", "E", "F", "G"));
            updatePricingMap("invalidez", dto.getCoberturas().getInvalidez(), List.of("A", "B", "C", "D", "E", "F", "G"));
            updatePricingMap("enfermedades_graves", dto.getCoberturas().getEnfermedadesGraves(), List.of("A", "B", "C", "D", "E", "F", "G"));
            updatePricingWithoutPlan("auxilio_funerario", dto.getCoberturas().getAuxilioFunerario());
            updatePricingMap("bono_canasta", dto.getCoberturas().getBonoCanasta(), List.of("A", "B", "C", "D", "E", "F", "G"));
            updatePricingMap("auxilio_maternidad", dto.getCoberturas().getAuxilioMaternidad(), List.of("A", "B", "C", "D", "E", "F", "G"));
            updatePricingMap("muerte_accidental", dto.getCoberturas().getMuerteAccidental(), List.of("A", "B", "C", "D", "E", "F", "G"));
            updatePricingMap("invalidez_desmembracion", dto.getCoberturas().getInvalidezDesmembracion(), List.of("A", "B", "C", "D", "E", "F", "G"));
        }
        
        // Actualizar progenitores
        if (dto.getProgenitores() != null) {
            updatePricingMap("progenitores_vida", dto.getProgenitores().getVida(), List.of("A", "B", "C", "D", "E"));
            updatePricingMap("progenitores_invalidez", dto.getProgenitores().getInvalidez(), List.of("A", "B", "C", "D", "E"));
            updatePricingMap("progenitores_funerario", dto.getProgenitores().getFunerario(), List.of("A", "B", "C", "D", "E"));
        }
        
        // Actualizar otros
        if (dto.getOtros() != null) {
            updatePricingWithoutPlan("otros_desde", dto.getOtros().getDesde());
            updatePricingWithoutPlan("otros_hasta", dto.getOtros().getHasta());
            updatePricingWithoutPlan("otros_salud", dto.getOtros().getSalud());
            updatePricingWithoutPlan("otros_autos", dto.getOtros().getAutos());
            updatePricingWithoutPlan("otros_motos", dto.getOtros().getMotos());
        }
    }
    
    /**
     * Actualiza un mapa de precios
     */
    private void updatePricingMap(String tipoCodigo, Map<String, String> precios, List<String> planes) {
        if (precios == null) return;
        
        TipoPrecio tipoPrecio = tipoPrecioRepository.findByCodigo(tipoCodigo)
                .orElseThrow(() -> new RuntimeException("Tipo de precio no encontrado: " + tipoCodigo));
        
        for (String planCodigo : planes) {
            String key = "plan" + planCodigo;
            if (precios.containsKey(key)) {
                Plan plan = planRepository.findByCodigo(planCodigo)
                        .orElseThrow(() -> new RuntimeException("Plan no encontrado: " + planCodigo));
                
                JudicialPricing pricing = pricingRepository.findByTipoPrecioAndPlan(tipoPrecio, plan)
                        .orElse(new JudicialPricing());
                
                pricing.setTipoPrecio(tipoPrecio);
                pricing.setPlan(plan);
                pricing.setValor(precios.get(key));
                
                pricingRepository.save(pricing);
            }
        }
    }
    
    /**
     * Actualiza un precio sin plan
     */
    private void updatePricingWithoutPlan(String tipoCodigo, String valor) {
        if (valor == null || valor.isEmpty()) return;
        
        TipoPrecio tipoPrecio = tipoPrecioRepository.findByCodigo(tipoCodigo)
                .orElseThrow(() -> new RuntimeException("Tipo de precio no encontrado: " + tipoCodigo));
        
        JudicialPricing pricing = pricingRepository.findByTipoPrecioCodigoAndPlanIsNull(tipoCodigo)
                .orElse(new JudicialPricing());
        
        pricing.setTipoPrecio(tipoPrecio);
        pricing.setPlan(null);
        pricing.setValor(valor);
        
        pricingRepository.save(pricing);
    }
}

