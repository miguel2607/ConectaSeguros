package com.conecta.controller;

import com.conecta.dto.PricingDataDTO;
import com.conecta.service.PricingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller para gestión de precios
 * Patrón: REST Controller
 * Principio SOLID: Single Responsibility
 */
@RestController
@RequestMapping("/api/pricing")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class PricingController {
    
    private final PricingService pricingService;
    
    @GetMapping
    public ResponseEntity<PricingDataDTO> getAllPricing() {
        try {
            PricingDataDTO pricing = pricingService.getAllPricing();
            return ResponseEntity.ok(pricing);
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Error en getAllPricing: " + e.getMessage());
            return ResponseEntity.status(500).build();
        }
    }
    
    @PutMapping
    public ResponseEntity<PricingDataDTO> updatePricing(@RequestBody PricingDataDTO dto) {
        pricingService.updateAllPricing(dto);
        PricingDataDTO updated = pricingService.getAllPricing();
        return ResponseEntity.ok(updated);
    }
}

