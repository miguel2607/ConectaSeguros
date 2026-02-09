package com.conecta.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

/**
 * Entidad que representa un Servicio de Seguros
 * Patrón: Entity (JPA)
 */
@Entity
@Table(name = "services")
public class Service {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 255)
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(columnDefinition = "TEXT")
    private String icon; // Emoji o data URL (imagen en base64, hasta ~16MB)
    
    @Column(length = 50)
    private String priceFrom; // Opcional: '$50.000 COP'
    
    @Column(columnDefinition = "TEXT")
    private String includes; // ¿Qué incluye este servicio? (separado por líneas)
    
    @Column(columnDefinition = "TEXT")
    private String howItWorks; // ¿Cómo funciona? (separado por líneas, cada línea es un paso)
    
    @Column(columnDefinition = "TEXT")
    private String idealFor; // ¿Para quién es ideal este servicio?
    
    @Column(unique = true, nullable = false, length = 255)
    private String slug;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }
    public String getPriceFrom() { return priceFrom; }
    public void setPriceFrom(String priceFrom) { this.priceFrom = priceFrom; }
    public String getIncludes() { return includes; }
    public void setIncludes(String includes) { this.includes = includes; }
    public String getHowItWorks() { return howItWorks; }
    public void setHowItWorks(String howItWorks) { this.howItWorks = howItWorks; }
    public String getIdealFor() { return idealFor; }
    public void setIdealFor(String idealFor) { this.idealFor = idealFor; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}

