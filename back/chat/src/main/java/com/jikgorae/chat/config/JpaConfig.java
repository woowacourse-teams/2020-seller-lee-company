package com.jikgorae.chat.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories(basePackages = {"com.jikgorae.common.*", "com.jikgorae.chat.*"})
@EntityScan(basePackages = {"com.jikgorae.common.*", "com.jikgorae.chat.*"})
@EnableJpaAuditing
@Configuration
public class JpaConfig {
}
