package com.conecta.config;

import com.conecta.dto.PricingDataDTO;
import com.conecta.entity.Plan;
import com.conecta.entity.TipoPrecio;
import com.conecta.repository.JudicialPricingRepository;
import com.conecta.repository.PlanRepository;
import com.conecta.repository.TipoPrecioRepository;
import com.conecta.service.PricingService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

/**
 * Inicializador de precios
 * Crea los precios por defecto si no existen en la base de datos
 * Orden 2 para ejecutarse después del DataInitializer
 */
@Component
@Order(2)
@RequiredArgsConstructor
public class PricingInitializer implements CommandLineRunner {
    
    private final PricingService pricingService;
    private final JudicialPricingRepository pricingRepository;
    private final PlanRepository planRepository;
    private final TipoPrecioRepository tipoPrecioRepository;
    
    @Override
    public void run(String... args) {
        // Primero inicializar planes y tipos de precio si no existen
        initializePlanes();
        initializeTiposPrecio();
        
        // Verificar si ya existen precios en la base de datos
        long count = pricingRepository.count();
        
        if (count == 0) {
            System.out.println("🔧 Inicializando precios de la Rama Judicial...");
            
            try {
                PricingDataDTO defaultPricing = createDefaultPricing();
                pricingService.updateAllPricing(defaultPricing);
                
                System.out.println("✅ Precios inicializados exitosamente!");
                System.out.println("   Total de precios insertados: " + pricingRepository.count());
            } catch (Exception e) {
                System.err.println("❌ Error al inicializar precios: " + e.getMessage());
                e.printStackTrace();
            }
        } else {
            System.out.println("✅ Precios ya existen en la base de datos (" + count + " registros)");
        }
    }
    
    /**
     * Inicializa los planes si no existen
     */
    private void initializePlanes() {
        String[] planesCodigos = {"A", "B", "C", "D", "E", "F", "G"};
        String[] planesNombres = {"Plan A", "Plan B", "Plan C", "Plan D", "Plan E", "Plan F", "Plan G"};
        
        for (int i = 0; i < planesCodigos.length; i++) {
            if (!planRepository.findByCodigo(planesCodigos[i]).isPresent()) {
                Plan plan = new Plan();
                plan.setCodigo(planesCodigos[i]);
                plan.setNombre(planesNombres[i]);
                plan.setOrden(i + 1);
                planRepository.save(plan);
                System.out.println("✅ Plan creado: " + planesCodigos[i]);
            }
        }
    }
    
    /**
     * Inicializa los tipos de precio si no existen
     */
    private void initializeTiposPrecio() {
        // Afiliados
        createTipoPrecioIfNotExists("empleado", "Afiliado Principal", "afiliado");
        createTipoPrecioIfNotExists("conyuge", "Cónyuge y Familiares", "afiliado");
        
        // Coberturas
        createTipoPrecioIfNotExists("vida", "Cobertura de Vida", "cobertura");
        createTipoPrecioIfNotExists("invalidez", "Invalidez o pérdida por accidente o enfermedad", "cobertura");
        createTipoPrecioIfNotExists("enfermedades_graves", "Enfermedades Graves (50% de anticipo)", "cobertura");
        createTipoPrecioIfNotExists("bono_canasta", "Bono Canasta", "cobertura");
        createTipoPrecioIfNotExists("auxilio_funerario", "Auxilio Funerario", "cobertura");
        createTipoPrecioIfNotExists("auxilio_maternidad", "Auxilio maternidad/paternidad", "cobertura");
        createTipoPrecioIfNotExists("muerte_accidental", "Muerte Accidental", "cobertura");
        createTipoPrecioIfNotExists("invalidez_desmembracion", "Invalidez, desmembración o inutilización", "cobertura");
        
        // Progenitores
        createTipoPrecioIfNotExists("progenitores_vida", "Progenitores - Vida", "progenitores");
        createTipoPrecioIfNotExists("progenitores_invalidez", "Progenitores - Invalidez", "progenitores");
        createTipoPrecioIfNotExists("progenitores_funerario", "Progenitores - Bono Funerario", "progenitores");
        
        // Otros
        createTipoPrecioIfNotExists("otros_desde", "Otros - Desde", "otros");
        createTipoPrecioIfNotExists("otros_hasta", "Otros - Hasta", "otros");
        createTipoPrecioIfNotExists("otros_salud", "Otros - Salud", "otros");
        createTipoPrecioIfNotExists("otros_autos", "Otros - Autos", "otros");
        createTipoPrecioIfNotExists("otros_motos", "Otros - Motos", "otros");
    }
    
    private void createTipoPrecioIfNotExists(String codigo, String nombre, String categoria) {
        if (!tipoPrecioRepository.findByCodigo(codigo).isPresent()) {
            TipoPrecio tipoPrecio = new TipoPrecio();
            tipoPrecio.setCodigo(codigo);
            tipoPrecio.setNombre(nombre);
            tipoPrecio.setCategoria(categoria);
            tipoPrecioRepository.save(tipoPrecio);
            System.out.println("✅ Tipo de precio creado: " + codigo);
        }
    }
    
    /**
     * Crea el objeto PricingDataDTO con los precios por defecto del frontend
     */
    private PricingDataDTO createDefaultPricing() {
        PricingDataDTO dto = new PricingDataDTO();
        
        // Precios de Empleado (Planes A-G)
        Map<String, String> empleado = new HashMap<>();
        empleado.put("planA", "241,600");
        empleado.put("planB", "195,000");
        empleado.put("planC", "107,900");
        empleado.put("planD", "84,000");
        empleado.put("planE", "55,800");
        empleado.put("planF", "34,500");
        empleado.put("planG", "23,000");
        dto.setEmpleado(empleado);
        
        // Precios de Cónyuge (Planes A-G)
        Map<String, String> conyuge = new HashMap<>();
        conyuge.put("planA", "241,600");
        conyuge.put("planB", "195,000");
        conyuge.put("planC", "107,900");
        conyuge.put("planD", "84,000");
        conyuge.put("planE", "55,800");
        conyuge.put("planF", "34,500");
        conyuge.put("planG", "23,000");
        dto.setConyuge(conyuge);
        
        // Coberturas
        PricingDataDTO.CoberturasDTO coberturas = new PricingDataDTO.CoberturasDTO();
        
        // Vida
        Map<String, String> vida = new HashMap<>();
        vida.put("planA", "250M");
        vida.put("planB", "200M");
        vida.put("planC", "100M");
        vida.put("planD", "80M");
        vida.put("planE", "50M");
        vida.put("planF", "30M");
        vida.put("planG", "20M");
        coberturas.setVida(vida);
        
        // Invalidez
        Map<String, String> invalidez = new HashMap<>();
        invalidez.put("planA", "250M");
        invalidez.put("planB", "200M");
        invalidez.put("planC", "100M");
        invalidez.put("planD", "80M");
        invalidez.put("planE", "50M");
        invalidez.put("planF", "30M");
        invalidez.put("planG", "20M");
        coberturas.setInvalidez(invalidez);
        
        // Enfermedades Graves
        Map<String, String> enfermedadesGraves = new HashMap<>();
        enfermedadesGraves.put("planA", "125M");
        enfermedadesGraves.put("planB", "100M");
        enfermedadesGraves.put("planC", "50M");
        enfermedadesGraves.put("planD", "40M");
        enfermedadesGraves.put("planE", "25M");
        enfermedadesGraves.put("planF", "15M");
        enfermedadesGraves.put("planG", "10M");
        coberturas.setEnfermedadesGraves(enfermedadesGraves);
        
        // Auxilio Funerario
        coberturas.setAuxilioFunerario("4.000.000");
        
        // Bono Canasta
        Map<String, String> bonoCanasta = new HashMap<>();
        bonoCanasta.put("planA", "8.4M");
        bonoCanasta.put("planB", "7.2M");
        bonoCanasta.put("planC", "6M");
        bonoCanasta.put("planD", "4.8M");
        bonoCanasta.put("planE", "3.6M");
        bonoCanasta.put("planF", "2.4M");
        bonoCanasta.put("planG", "1.2M");
        coberturas.setBonoCanasta(bonoCanasta);
        
        // Auxilio Maternidad
        Map<String, String> auxilioMaternidad = new HashMap<>();
        auxilioMaternidad.put("planA", "1M");
        auxilioMaternidad.put("planB", "1M");
        auxilioMaternidad.put("planC", "1M");
        auxilioMaternidad.put("planD", "800K");
        auxilioMaternidad.put("planE", "500K");
        auxilioMaternidad.put("planF", "300K");
        auxilioMaternidad.put("planG", "200K");
        coberturas.setAuxilioMaternidad(auxilioMaternidad);
        
        // Muerte Accidental
        Map<String, String> muerteAccidental = new HashMap<>();
        muerteAccidental.put("planA", "250M");
        muerteAccidental.put("planB", "200M");
        muerteAccidental.put("planC", "100M");
        muerteAccidental.put("planD", "80M");
        muerteAccidental.put("planE", "50M");
        muerteAccidental.put("planF", "30M");
        muerteAccidental.put("planG", "20M");
        coberturas.setMuerteAccidental(muerteAccidental);
        
        // Invalidez Desmembración
        Map<String, String> invalidezDesmembracion = new HashMap<>();
        invalidezDesmembracion.put("planA", "250M");
        invalidezDesmembracion.put("planB", "200M");
        invalidezDesmembracion.put("planC", "100M");
        invalidezDesmembracion.put("planD", "80M");
        invalidezDesmembracion.put("planE", "50M");
        invalidezDesmembracion.put("planF", "30M");
        invalidezDesmembracion.put("planG", "20M");
        coberturas.setInvalidezDesmembracion(invalidezDesmembracion);
        
        dto.setCoberturas(coberturas);
        
        // Progenitores
        PricingDataDTO.ProgenitoresDTO progenitores = new PricingDataDTO.ProgenitoresDTO();
        
        // Progenitores - Vida
        Map<String, String> progenitoresVida = new HashMap<>();
        progenitoresVida.put("planA", "50M");
        progenitoresVida.put("planB", "40M");
        progenitoresVida.put("planC", "30M");
        progenitoresVida.put("planD", "20M");
        progenitoresVida.put("planE", "10M");
        progenitores.setVida(progenitoresVida);
        
        // Progenitores - Invalidez
        Map<String, String> progenitoresInvalidez = new HashMap<>();
        progenitoresInvalidez.put("planA", "50M");
        progenitoresInvalidez.put("planB", "40M");
        progenitoresInvalidez.put("planC", "30M");
        progenitoresInvalidez.put("planD", "20M");
        progenitoresInvalidez.put("planE", "10M");
        progenitores.setInvalidez(progenitoresInvalidez);
        
        // Progenitores - Funerario
        Map<String, String> progenitoresFunerario = new HashMap<>();
        progenitoresFunerario.put("planA", "5M");
        progenitoresFunerario.put("planB", "4M");
        progenitoresFunerario.put("planC", "3M");
        progenitoresFunerario.put("planD", "2M");
        progenitoresFunerario.put("planE", "1M");
        progenitores.setFunerario(progenitoresFunerario);
        
        dto.setProgenitores(progenitores);
        
        // Otros
        PricingDataDTO.OtrosDTO otros = new PricingDataDTO.OtrosDTO();
        otros.setDesde("23.000");
        otros.setHasta("250.000");
        otros.setSalud("179.900");
        otros.setAutos("91.700");
        otros.setMotos("41.700");
        dto.setOtros(otros);
        
        return dto;
    }
}

