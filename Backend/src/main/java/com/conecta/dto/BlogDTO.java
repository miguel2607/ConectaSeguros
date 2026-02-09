package com.conecta.dto;

/**
 * DTO para Blog
 * Patrón: DTO (Data Transfer Object)
 */
public class BlogDTO {
    private Long id;
    private String title;
    private String excerpt;
    private String content;
    private String date;
    private String image;
    private String slug;
    
    // Constructors
    public BlogDTO() {}
    
    public BlogDTO(Long id, String title, String excerpt, String content, String date, String image, String slug) {
        this.id = id;
        this.title = title;
        this.excerpt = excerpt;
        this.content = content;
        this.date = date;
        this.image = image;
        this.slug = slug;
    }
    
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
}

