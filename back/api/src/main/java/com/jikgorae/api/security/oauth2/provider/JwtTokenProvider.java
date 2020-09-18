package com.jikgorae.api.security.oauth2.provider;

import java.util.Base64;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

import com.jikgorae.api.member.domain.Member;
import com.jikgorae.api.member.domain.MemberRepository;
import com.jikgorae.api.security.oauth2.authentication.AuthorizationExtractor;
import com.jikgorae.api.security.web.AuthorizationType;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtTokenProvider {
    private final MemberRepository memberRepository;
    @Value("${security.jwt.token.secret-key}")
    private String secretKey;
    @Value("${security.jwt.token.expire-length}")
    private long expireLength;

    public JwtTokenProvider(
            MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String createToken(String payload) {
        Claims claims = Jwts.claims().setSubject(payload);
        Date now = new Date();
        Date validity = new Date(now.getTime() + expireLength);

        return Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public String getPayload(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public Authentication getAuthentication(String token) {
        String credential = getPayload(token);
        Member member = memberRepository.findOptionalMemberByKakaoId(credential)
                .orElseThrow(
                        () -> new AuthenticationCredentialsNotFoundException(
                                "credential error: 존재하지 않는 회원입니다."));

        Map<String, Object> attribute = createAttribute(member);

        if (member.hasNotRole()) {
            member.addRole("ROLE_USER");
        }

        OAuth2User AuthenticatedMember = new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority(member.getRole())),
                attribute, "kakaoId");

        return new OAuth2AuthenticationToken(AuthenticatedMember,
                Collections.singleton(new SimpleGrantedAuthority(member.getRole())),
                "kakao");
    }

    private Map<String, Object> createAttribute(Member member) {
        Map<String, Object> attribute = new HashMap<>();

        attribute.put("kakaoId", member.getKakaoId());
        return attribute;
    }

    public String resolveToken(HttpServletRequest request) {
        return AuthorizationExtractor.extract(request, AuthorizationType.BEARER);
    }

    public boolean validateToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token);

            return !claims.getBody().getExpiration().before(new Date());
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}
