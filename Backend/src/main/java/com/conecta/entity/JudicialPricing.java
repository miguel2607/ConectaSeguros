package com.conecta.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

/**
 * Entidad principal que almacena los precios de la Rama Judicial
 * Relaciona: TipoPrecio + Plan (opcional) + Valor
 * Patrón: Entity (JPA)
 * Principio SOLID: Single Responsibility - Solo almacena datos de precios
 */
@Entity
@Table(name = "judicial_pricing",
       uniqueConstraints = {
           @UniqueConstraint(columnNames = {"tipo_precio_id", "plan_id"})
       })
public class JudicialPricing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "tipo_precio_id", nullable = false)
    private TipoPrecio tipoPrecio;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "plan_id", nullable = true)
    private Plan plan;

    @Column(nullable = false, length = 50)
    private String valor;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public TipoPrecio getTipoPrecio() { return tipoPrecio; }
    public void setTipoPrecio(TipoPrecio tipoPrecio) { this.tipoPrecio = tipoPrecio; }
    public Plan getPlan() { return plan; }
    public void setPlan(Plan plan) { this.plan = plan; }
    public String getValor() { return valor; }
    public void setValor(String valor) { this.valor = valor; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
