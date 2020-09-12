package com.jikgorae.api;

import java.util.TimeZone;

import javax.annotation.PostConstruct;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

import com.jikgorae.common.security.web.LoginMemberMethodArgumentResolver;

@Import(LoginMemberMethodArgumentResolver.class)
@SpringBootApplication
public class ApiApplication {
    @PostConstruct
    void init() {
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
    }

    public static void main(String[] args) {
        SpringApplication.run(ApiApplication.class, args);
    }

}
