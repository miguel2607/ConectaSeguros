package com.conecta.entity;

import jakarta.persistence.*;

import java.util.List;

/**
 * Entidad que representa un Tipo de Precio
 * Ejemplos: 'empleado', 'conyuge', 'vida', 'invalidez', etc.
 * Patrón: Entity (JPA)
 */
@Entity
@Table(name = "tipos_precio")
public class TipoPrecio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 50)
    private String codigo;

    @Column(length = 100)
    private String nombre;

    @Column(length = 50)
    private String categoria;

    @OneToMany(mappedBy = "tipoPrecio", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<JudicialPricing> precios;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCodigo() { return codigo; }
    public void setCodigo(String codigo) { this.codigo = codigo; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getCategoria() { return categoria; }
    public void setCategoria(String categoria) { this.categoria = categoria; }
    public List<JudicialPricing> getPrecios() { return precios; }
    public void setPrecios(List<JudicialPricing> precios) { this.precios = precios; }
}
