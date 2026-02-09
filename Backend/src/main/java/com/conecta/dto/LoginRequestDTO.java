package com.conecta.dto;

import jakarta.validation.constraints.NotBlank;

/**
 * DTO para Login Request
 * Patrón: DTO (Data Transfer Object)
 */
public class LoginRequestDTO {
    @NotBlank(message = "Username es requerido")
    private String username;
    
    @NotBlank(message = "Password es requerido")
    private String password;
    
    public LoginRequestDTO() {}
    
    public LoginRequestDTO(String username, String password) {
        this.username = username;
        this.password = password;
    }
    
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}

