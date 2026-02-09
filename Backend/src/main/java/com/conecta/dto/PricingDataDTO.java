package com.conecta.dto;

import java.util.Map;

/**
 * DTO que representa la estructura completa de precios para el frontend
 * Patrón: DTO (Data Transfer Object)
 * Principio SOLID: Single Responsibility - Solo transfiere datos
 */
public class PricingDataDTO {

    private Map<String, String> empleado;
    private Map<String, String> conyuge;
    private CoberturasDTO coberturas;
    private ProgenitoresDTO progenitores;
    private OtrosDTO otros;

    public PricingDataDTO() {}

    public PricingDataDTO(Map<String, String> empleado, Map<String, String> conyuge,
                          CoberturasDTO coberturas, ProgenitoresDTO progenitores, OtrosDTO otros) {
        this.empleado = empleado;
        this.conyuge = conyuge;
        this.coberturas = coberturas;
        this.progenitores = progenitores;
        this.otros = otros;
    }

    public Map<String, String> getEmpleado() { return empleado; }
    public void setEmpleado(Map<String, String> empleado) { this.empleado = empleado; }
    public Map<String, String> getConyuge() { return conyuge; }
    public void setConyuge(Map<String, String> conyuge) { this.conyuge = conyuge; }
    public CoberturasDTO getCoberturas() { return coberturas; }
    public void setCoberturas(CoberturasDTO coberturas) { this.coberturas = coberturas; }
    public ProgenitoresDTO getProgenitores() { return progenitores; }
    public void setProgenitores(ProgenitoresDTO progenitores) { this.progenitores = progenitores; }
    public OtrosDTO getOtros() { return otros; }
    public void setOtros(OtrosDTO otros) { this.otros = otros; }

    public static class CoberturasDTO {
        private Map<String, String> vida;
        private Map<String, String> invalidez;
        private Map<String, String> enfermedadesGraves;
        private String auxilioFunerario;
        private Map<String, String> bonoCanasta;
        private Map<String, String> auxilioMaternidad;
        private Map<String, String> muerteAccidental;
        private Map<String, String> invalidezDesmembracion;

        public CoberturasDTO() {}

        public Map<String, String> getVida() { return vida; }
        public void setVida(Map<String, String> vida) { this.vida = vida; }
        public Map<String, String> getInvalidez() { return invalidez; }
        public void setInvalidez(Map<String, String> invalidez) { this.invalidez = invalidez; }
        public Map<String, String> getEnfermedadesGraves() { return enfermedadesGraves; }
        public void setEnfermedadesGraves(Map<String, String> enfermedadesGraves) { this.enfermedadesGraves = enfermedadesGraves; }
        public String getAuxilioFunerario() { return auxilioFunerario; }
        public void setAuxilioFunerario(String auxilioFunerario) { this.auxilioFunerario = auxilioFunerario; }
        public Map<String, String> getBonoCanasta() { return bonoCanasta; }
        public void setBonoCanasta(Map<String, String> bonoCanasta) { this.bonoCanasta = bonoCanasta; }
        public Map<String, String> getAuxilioMaternidad() { return auxilioMaternidad; }
        public void setAuxilioMaternidad(Map<String, String> auxilioMaternidad) { this.auxilioMaternidad = auxilioMaternidad; }
        public Map<String, String> getMuerteAccidental() { return muerteAccidental; }
        public void setMuerteAccidental(Map<String, String> muerteAccidental) { this.muerteAccidental = muerteAccidental; }
        public Map<String, String> getInvalidezDesmembracion() { return invalidezDesmembracion; }
        public void setInvalidezDesmembracion(Map<String, String> invalidezDesmembracion) { this.invalidezDesmembracion = invalidezDesmembracion; }
    }

    public static class ProgenitoresDTO {
        private Map<String, String> vida;
        private Map<String, String> invalidez;
        private Map<String, String> funerario;

        public ProgenitoresDTO() {}

        public Map<String, String> getVida() { return vida; }
        public void setVida(Map<String, String> vida) { this.vida = vida; }
        public Map<String, String> getInvalidez() { return invalidez; }
        public void setInvalidez(Map<String, String> invalidez) { this.invalidez = invalidez; }
        public Map<String, String> getFunerario() { return funerario; }
        public void setFunerario(Map<String, String> funerario) { this.funerario = funerario; }
    }

    public static class OtrosDTO {
        private String desde;
        private String hasta;
        private String salud;
        private String autos;
        private String motos;

        public OtrosDTO() {}

        public String getDesde() { return desde; }
        public void setDesde(String desde) { this.desde = desde; }
        public String getHasta() { return hasta; }
        public void setHasta(String hasta) { this.hasta = hasta; }
        public String getSalud() { return salud; }
        public void setSalud(String salud) { this.salud = salud; }
        public String getAutos() { return autos; }
        public void setAutos(String autos) { this.autos = autos; }
        public String getMotos() { return motos; }
        public void setMotos(String motos) { this.motos = motos; }
    }
}
