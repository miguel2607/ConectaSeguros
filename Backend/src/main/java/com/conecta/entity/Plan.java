package com.conecta.entity;

import jakarta.persistence.*;

import java.util.List;

/**
 * Entidad que representa un Plan (A, B, C, D, E, F, G)
 * Patrón: Entity (JPA)
 */
@Entity
@Table(name = "planes")
public class Plan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 10)
    private String codigo;

    @Column(length = 100)
    private String nombre;

    @Column(nullable = false)
    private Integer orden;

    @OneToMany(mappedBy = "plan", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<JudicialPricing> precios;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCodigo() { return codigo; }
    public void setCodigo(String codigo) { this.codigo = codigo; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public Integer getOrden() { return orden; }
    public void setOrden(Integer orden) { this.orden = orden; }
    public List<JudicialPricing> getPrecios() { return precios; }
    public void setPrecios(List<JudicialPricing> precios) { this.precios = precios; }
}
