package com.jikgorae.api.security.config;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.firewall.HttpFirewall;
import org.springframework.security.web.firewall.StrictHttpFirewall;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.jikgorae.api.member.domain.MemberRepository;
import com.jikgorae.api.security.filter.JwtAuthenticationFilter;
import com.jikgorae.api.security.oauth2.provider.CustomOAuth2Provider;
import com.jikgorae.api.security.oauth2.provider.JwtTokenProvider;
import com.jikgorae.api.security.oauth2.service.CustomOAuth2AuthorizedClientService;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final OAuth2SuccessHandler OAuth2SuccessHandler;
    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;

    public SecurityConfig(
            com.jikgorae.api.security.config.OAuth2SuccessHandler OAuth2SuccessHandler,
            MemberRepository memberRepository, JwtTokenProvider jwtTokenProvider) {
        this.OAuth2SuccessHandler = OAuth2SuccessHandler;
        this.memberRepository = memberRepository;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        //@formatter:off
        http
                .httpBasic().disable()
                .formLogin().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                    .csrf().requireCsrfProtectionMatcher(new AntPathRequestMatcher("!/h2-console/**"))
                .and()
                    .authorizeRequests()
                    .antMatchers("/", "/oauth2/**").permitAll()
                    .anyRequest().authenticated()
                .and()
                    .oauth2Login().loginPage("/oauth2/authorization/kakao")
                    .successHandler(OAuth2SuccessHandler)
                .and()
                    .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider),
                        OAuth2LoginAuthenticationFilter.class);
        //@formatter:on
    }

    @Bean
    public ClientRegistrationRepository clientRegistrationRepository(
            @Value("${spring.security.oauth2.client.registration.kakao.client-id}") String kakaoClient,
            @Value("${spring.security.oauth2.client.registration.kakao.client-secret}") String kakaoClientSecret
    ) {
        List<ClientRegistration> registrations = new ArrayList<>();
        registrations.add(CustomOAuth2Provider.KAKAO.getBuilder("kakao")
                .clientId(kakaoClient)
                .clientSecret(kakaoClientSecret)
                .build()
        );

        return new InMemoryClientRegistrationRepository(registrations);
    }

    @Bean
    public OAuth2AuthorizedClientService authorizedClientService() {
        return new CustomOAuth2AuthorizedClientService(memberRepository);
    }

    // 판매내역->판매완료로 변경할때 PUT 요청에 '//'가 들어가면 위험해서 안된다는 에러로 인해 추가
    @Bean
    public HttpFirewall allowSlash() {
        StrictHttpFirewall firewall = new StrictHttpFirewall();
        firewall.setAllowUrlEncodedDoubleSlash(true);
        return firewall;
    }
}
