package com.jikgorae.api.common.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories(basePackages = {"com.jikgorae.common.*", "com.jikgorae.api.*"})
@EntityScan(basePackages = {"com.jikgorae.common.*", "com.jikgorae.api.*"})
@EnableJpaAuditing
@Configuration
public class JpaConfig {
}
