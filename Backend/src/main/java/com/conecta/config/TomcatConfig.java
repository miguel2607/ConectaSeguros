package com.conecta.config;

import org.apache.catalina.connector.Connector;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Aumenta el límite de tamaño del body HTTP (POST/PUT) para permitir
 * imágenes en base64 en JSON (blogs y servicios). Por defecto Tomcat usa ~2MB.
 */
@Configuration
public class TomcatConfig {

    private static final int MAX_POST_SIZE_MB = 20;

    @Bean
    public WebServerFactoryCustomizer<TomcatServletWebServerFactory> tomcatMaxPostSizeCustomizer() {
        return factory -> factory.addConnectorCustomizers(this::customizeConnector);
    }

    private void customizeConnector(Connector connector) {
        connector.setMaxPostSize(MAX_POST_SIZE_MB * 1024 * 1024);
    }
}
