package com.conecta.dto;

/**
 * DTO para Service
 * Patrón: DTO (Data Transfer Object)
 */
public class ServiceDTO {
    private Long id;
    private String title;
    private String description;
    private String icon;
    private String priceFrom;
    private String includes;
    private String howItWorks;
    private String idealFor;
    private String slug;
    
    public ServiceDTO() {}
    
    public ServiceDTO(Long id, String title, String description, String icon, String priceFrom, String includes, String howItWorks, String idealFor, String slug) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.icon = icon;
        this.priceFrom = priceFrom;
        this.includes = includes;
        this.howItWorks = howItWorks;
        this.idealFor = idealFor;
        this.slug = slug;
    }
    
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
}

