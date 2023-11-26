// WebConfig: Konfigurálja a Spring Web MVC környezetet, beleértve a CORS beállításokat.

package hu.szoftmern.project.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    // addCorsMappings: CORS beállításokat definiál különböző végpontokhoz.
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // CORS beállítások a /truck URI-hoz: engedélyezi a kéréseket a localhost:3000-től.
        registry.addMapping("/truck/**") // Allow CORS for localhost:8081/truck
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(true);

        // CORS beállítások a /email URI-hoz: engedélyezi a kéréseket a localhost:3000-től.
        registry.addMapping("/email/**") // Allow CORS for localhost:8081/email
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(true);

        // CORS beállítások a /driver URI-hoz: engedélyezi a kéréseket a localhost:3000-től.
        registry.addMapping("/driver/**") // Allow CORS for localhost:8081/driver
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(true);

        // CORS beállítások a /freight URI-hoz: engedélyezi a kéréseket a localhost:3000-től.
        registry.addMapping("/freight/**") // Allow CORS for localhost:8081/freight
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
