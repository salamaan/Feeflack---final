package pl.marcinsalamandra.microbloggingapp.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import pl.marcinsalamandra.microbloggingapp.security.filter.UserAuthenticationFilter;
import pl.marcinsalamandra.microbloggingapp.security.filter.UserAuthorizationFilter;

import java.util.Locale;

import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@SuppressWarnings("NullableProblems")
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfigurer {

    private final AuthenticationConfiguration authenticationConfiguration;

    @Bean
    public SecurityFilterChain configure(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity.csrf().disable().cors().and()
                .sessionManagement().sessionCreationPolicy(STATELESS).and()
                .authorizeRequests().antMatchers("/api/login").permitAll().and()
                .authorizeRequests().antMatchers(POST, "/api/users").permitAll().and()
                .authorizeRequests().antMatchers("/api/users/issuer").permitAll().and()
                .authorizeRequests().antMatchers(GET, "/api/users/*/picture").permitAll().and()
                .authorizeRequests().antMatchers(GET, "/api/posts/*/picture").permitAll().and()
                .authorizeRequests().anyRequest().authenticated().and()
                .addFilter(new UserAuthenticationFilter(authenticationManager(authenticationConfiguration)))
                .addFilterBefore(new UserAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public MessageSource messageSource() {
        Locale.setDefault(Locale.ENGLISH);
        ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
        messageSource.addBasenames("classpath:org/springframework/security/messages");
        return messageSource;
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000")
                        .allowedMethods("GET", "PUT", "POST", "PATCH", "DELETE")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
