package com.conecta.service;

import com.conecta.dto.BlogDTO;
import com.conecta.entity.Blog;
import com.conecta.repository.BlogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.Normalizer;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service para gestión de Blogs
 * Patrón: Service Layer
 * Principio SOLID: Single Responsibility
 */
@Service
@RequiredArgsConstructor
public class BlogService {
    
    private final BlogRepository blogRepository;
    
    @Transactional(readOnly = true)
    public List<BlogDTO> getAllBlogs() {
        return blogRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public BlogDTO getBlogById(Long id) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog no encontrado con id: " + id));
        return toDTO(blog);
    }
    
    @Transactional(readOnly = true)
    public BlogDTO getBlogBySlug(String slug) {
        Blog blog = blogRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Blog no encontrado con slug: " + slug));
        return toDTO(blog);
    }
    
    @Transactional
    public BlogDTO createBlog(BlogDTO dto) {
        Blog blog = toEntity(dto);
        if (blog.getSlug() == null || blog.getSlug().isEmpty()) {
            blog.setSlug(generateSlug(blog.getTitle()));
        }
        Blog saved = blogRepository.save(blog);
        return toDTO(saved);
    }
    
    @Transactional
    public BlogDTO updateBlog(Long id, BlogDTO dto) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog no encontrado con id: " + id));
        
        blog.setTitle(dto.getTitle());
        blog.setExcerpt(dto.getExcerpt());
        blog.setContent(dto.getContent());
        blog.setDate(dto.getDate());
        blog.setImage(dto.getImage());
        if (dto.getSlug() != null && !dto.getSlug().isEmpty()) {
            blog.setSlug(dto.getSlug());
        }
        
        Blog updated = blogRepository.save(blog);
        return toDTO(updated);
    }
    
    @Transactional
    public void deleteBlog(Long id) {
        if (!blogRepository.existsById(id)) {
            throw new RuntimeException("Blog no encontrado con id: " + id);
        }
        blogRepository.deleteById(id);
    }
    
    private BlogDTO toDTO(Blog blog) {
        return new BlogDTO(
                blog.getId(),
                blog.getTitle(),
                blog.getExcerpt(),
                blog.getContent(),
                blog.getDate(),
                blog.getImage(),
                blog.getSlug()
        );
    }
    
    private Blog toEntity(BlogDTO dto) {
        Blog blog = new Blog();
        blog.setTitle(dto.getTitle());
        blog.setExcerpt(dto.getExcerpt());
        blog.setContent(dto.getContent());
        blog.setDate(dto.getDate());
        blog.setImage(dto.getImage());
        blog.setSlug(dto.getSlug());
        return blog;
    }
    
    private String generateSlug(String title) {
        return Normalizer.normalize(title, Normalizer.Form.NFD)
                .replaceAll("[^\\p{ASCII}]", "")
                .toLowerCase()
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("(^-|-$)", "");
    }
}

