package com.conecta.service;

import com.conecta.dto.ServiceDTO;
import com.conecta.repository.ServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.Normalizer;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service para gestión de Services
 * Patrón: Service Layer
 * Principio SOLID: Single Responsibility
 */
@Service
@RequiredArgsConstructor
public class ServiceService {
    
    private final ServiceRepository serviceRepository;
    
    @Transactional(readOnly = true)
    public List<ServiceDTO> getAllServices() {
        return serviceRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public ServiceDTO getServiceById(Long id) {
        com.conecta.entity.Service service = serviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service no encontrado con id: " + id));
        return toDTO(service);
    }
    
    @Transactional(readOnly = true)
    public ServiceDTO getServiceBySlug(String slug) {
        com.conecta.entity.Service service = serviceRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Service no encontrado con slug: " + slug));
        return toDTO(service);
    }
    
    @Transactional
    public ServiceDTO createService(ServiceDTO dto) {
        com.conecta.entity.Service service = toEntity(dto);
        if (service.getSlug() == null || service.getSlug().isEmpty()) {
            service.setSlug(generateSlug(service.getTitle()));
        }
        com.conecta.entity.Service saved = serviceRepository.save(service);
        return toDTO(saved);
    }
    
    @Transactional
    public ServiceDTO updateService(Long id, ServiceDTO dto) {
        com.conecta.entity.Service service = serviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service no encontrado con id: " + id));
        
        service.setTitle(dto.getTitle());
        service.setDescription(dto.getDescription());
        service.setIcon(dto.getIcon());
        service.setPriceFrom(dto.getPriceFrom());
        service.setIncludes(dto.getIncludes());
        service.setHowItWorks(dto.getHowItWorks());
        service.setIdealFor(dto.getIdealFor());
        if (dto.getSlug() != null && !dto.getSlug().isEmpty()) {
            service.setSlug(dto.getSlug());
        }
        
        com.conecta.entity.Service updated = serviceRepository.save(service);
        return toDTO(updated);
    }
    
    @Transactional
    public void deleteService(Long id) {
        if (!serviceRepository.existsById(id)) {
            throw new RuntimeException("Service no encontrado con id: " + id);
        }
        serviceRepository.deleteById(id);
    }
    
    private ServiceDTO toDTO(com.conecta.entity.Service service) {
        return new ServiceDTO(
                service.getId(),
                service.getTitle(),
                service.getDescription(),
                service.getIcon(),
                service.getPriceFrom(),
                service.getIncludes(),
                service.getHowItWorks(),
                service.getIdealFor(),
                service.getSlug()
        );
    }
    
    private com.conecta.entity.Service toEntity(ServiceDTO dto) {
        com.conecta.entity.Service service = new com.conecta.entity.Service();
        service.setTitle(dto.getTitle());
        service.setDescription(dto.getDescription());
        service.setIcon(dto.getIcon());
        service.setPriceFrom(dto.getPriceFrom());
        service.setIncludes(dto.getIncludes());
        service.setHowItWorks(dto.getHowItWorks());
        service.setIdealFor(dto.getIdealFor());
        service.setSlug(dto.getSlug());
        return service;
    }
    
    private String generateSlug(String title) {
        return Normalizer.normalize(title, Normalizer.Form.NFD)
                .replaceAll("[^\\p{ASCII}]", "")
                .toLowerCase()
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("(^-|-$)", "");
    }
}

