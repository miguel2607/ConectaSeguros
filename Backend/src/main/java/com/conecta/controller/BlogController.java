package com.conecta.controller;

import com.conecta.dto.BlogDTO;
import com.conecta.service.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller para gestión de Blogs
 * Patrón: REST Controller
 * Principio SOLID: Single Responsibility
 */
@RestController
@RequestMapping("/api/blogs")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class BlogController {
    
    private final BlogService blogService;
    
    @GetMapping
    public ResponseEntity<List<BlogDTO>> getAllBlogs() {
        List<BlogDTO> blogs = blogService.getAllBlogs();
        return ResponseEntity.ok(blogs);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<BlogDTO> getBlogById(@PathVariable Long id) {
        try {
            BlogDTO blog = blogService.getBlogById(id);
            return ResponseEntity.ok(blog);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/slug/{slug}")
    public ResponseEntity<BlogDTO> getBlogBySlug(@PathVariable String slug) {
        try {
            BlogDTO blog = blogService.getBlogBySlug(slug);
            return ResponseEntity.ok(blog);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping
    public ResponseEntity<BlogDTO> createBlog(@RequestBody BlogDTO dto) {
        try {
            BlogDTO created = blogService.createBlog(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<BlogDTO> updateBlog(@PathVariable Long id, @RequestBody BlogDTO dto) {
        try {
            BlogDTO updated = blogService.updateBlog(id, dto);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBlog(@PathVariable Long id) {
        try {
            blogService.deleteBlog(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}

