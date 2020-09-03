package sellerlee.back.security.config;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.web.firewall.HttpFirewall;
import org.springframework.security.web.firewall.StrictHttpFirewall;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import sellerlee.back.security.oauth2.provider.CustomOAuth2Provider;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final OAuth2SuccessHandler OAuth2SuccessHandler;

    public SecurityConfig(OAuth2SuccessHandler OAuth2SuccessHandler) {
        this.OAuth2SuccessHandler = OAuth2SuccessHandler;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .httpBasic().disable()
                .formLogin().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .csrf().requireCsrfProtectionMatcher(new AntPathRequestMatcher("!/h2-console/**"))
                .and()
                .authorizeRequests()
                .antMatchers("/", "/oauth2/**", "/api/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .oauth2Login()
                .loginPage("/oauth2/authorization/kakao")
                .successHandler(OAuth2SuccessHandler)
        ;
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
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // 판매내역->판매완료로 변경할때 PUT 요청에 '//'가 들어가면 위험해서 안된다는 에러로 인해 추가
    @Bean
    public HttpFirewall allowSlash() {
        StrictHttpFirewall firewall = new StrictHttpFirewall();
        firewall.setAllowUrlEncodedDoubleSlash(true);
        return firewall;
    }
}
