package com.jikgorae.api.common.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories("com.jikgorae.*")
@EntityScan("com.jikgorae.*")
@EnableJpaAuditing
@Configuration
public class JpaConfig {
}
