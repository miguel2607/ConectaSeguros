package com.conecta.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

/**
 * Entidad que representa un Blog Post
 * Patrón: Entity (JPA)
 */
@Entity
@Table(name = "blogs")
public class Blog {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 255)
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String excerpt;
    
    @Column(columnDefinition = "TEXT")
    private String content;
    
    @Column(length = 50)
    private String date; // Formato: '15 Ene 2024'
    
    @Column(columnDefinition = "TEXT")
    private String image; // Emoji, URL o data URL (base64)
    
    @Column(unique = true, nullable = false, length = 255)
    private String slug;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Constructors
    public Blog() {}
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getExcerpt() { return excerpt; }
    public void setExcerpt(String excerpt) { this.excerpt = excerpt; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}

