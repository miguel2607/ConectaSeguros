package com.conecta.controller;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * Health check para monitoreo (UptimeRobot, Render).
 * GET /api/health/db ejecuta una consulta mínima a la BD para evitar que Supabase pause el proyecto por inactividad.
 */
@RestController
@RequestMapping("/api")
public class HealthController {

    private final JdbcTemplate jdbcTemplate;

    public HealthController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of("status", "ok"));
    }

    /**
     * Health check que toca la BD (SELECT 1). Útil para que cron-job.org o similar llame cada 5 días
     * y Supabase no pause el proyecto por inactividad.
     */
    @GetMapping("/health/db")
    public ResponseEntity<Map<String, String>> healthDb() {
        jdbcTemplate.queryForObject("SELECT 1", Integer.class);
        return ResponseEntity.ok(Map.of("status", "ok", "db", "connected"));
    }
}
