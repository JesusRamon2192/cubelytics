package com.speedcube.timer.security;

import com.speedcube.timer.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.boot.CommandLineRunner;
import com.speedcube.timer.model.entity.User;
import com.speedcube.timer.model.enums.Role;
import com.speedcube.timer.model.enums.SubscriptionPlan;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

    private final UserRepository repository;

    @Bean
    public UserDetailsService userDetailsService() {
        return username -> repository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CommandLineRunner initAdminUser() {
        return args -> {
            if (repository.findByEmail("jesus.ramon2192@gmail.com").isEmpty()) {
                var adminUser = User.builder()
                        .name("Admin")
                        .email("jesus.ramon2192@gmail.com")
                        .passwordHash(passwordEncoder().encode("Sopristec123$"))
                        .role(Role.ADMIN)
                        .subscriptionPlan(SubscriptionPlan.PRO)
                        .isActive(true)
                        .build();
                repository.save(adminUser);
            }
        };
    }
}
