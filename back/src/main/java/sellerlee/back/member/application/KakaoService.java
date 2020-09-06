package sellerlee.back.member.application;

import static sellerlee.back.security.oauth2.provider.CustomOAuth2Provider.*;

import java.util.Arrays;

import org.apache.http.client.HttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicHeader;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import sellerlee.back.member.domain.Member;
import sellerlee.back.member.domain.RefreshTokenException;
import sellerlee.back.security.web.AuthorizationType;

@Component
public class KakaoService {
    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    private final RestTemplate restTemplate;
    @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
    private String ClientId;
    @Value("${spring.security.oauth2.client.registration.kakao.client-secret}")
    private String ClientSecret;

    public KakaoService(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }

    public void updateProfile(Member member) throws JsonProcessingException {
        setApiRequestFactory(AuthorizationType.BEARER, member.getKakaoAccessToken(),
                "application/x-www-form-urlencoded;charset=utf-8");

        MultiValueMap<String, String> multiValueMap = new LinkedMultiValueMap<>();
        multiValueMap.add("properties",
                OBJECT_MAPPER.writeValueAsString(KakaoPropertiesRequest.of(member)));

        try {
            restTemplate.postForObject(UPDATE_PROFILE_URI, multiValueMap, String.class);
        } catch (HttpClientErrorException.Unauthorized e) {
            checkExpiredToken(member, e.getResponseBodyAsString());
            setApiRequestFactory(AuthorizationType.BEARER, member.getKakaoAccessToken(),
                    "application/x-www-form-urlencoded;charset=utf-8");
            restTemplate.postForObject(UPDATE_PROFILE_URI, multiValueMap, String.class);
        }
    }

    private void checkExpiredToken(Member member, String json) {
        if (json.contains("\"code\":-401")) {
            refreshAccessToken(member);
        }
    }

    private void refreshAccessToken(Member member) {
        setTokenRequestFactory();
        MultiValueMap<String, String> multiValueMap = new LinkedMultiValueMap<>();
        multiValueMap.add("grant_type", "refresh_token");
        multiValueMap.add("client_id", ClientId);
        multiValueMap.add("refresh_token", member.getKakaoRefreshToken());
        multiValueMap.add("client_secret", ClientSecret);

        ResponseEntity<kakaoTokenResponse> responseEntity = restTemplate.postForEntity(
                TOKEN_URI, multiValueMap, kakaoTokenResponse.class);

        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            updateToken(member, responseEntity);
            return;
        }
        throw new RefreshTokenException("카카오 토큰 갱신 오류");
    }

    private void updateToken(Member member, ResponseEntity<kakaoTokenResponse> responseEntity) {
        kakaoTokenResponse kakaoTokenResponse = responseEntity.getBody();
        if (isRefreshTokenNullOf(kakaoTokenResponse)) {
            member.updateToken(kakaoTokenResponse.getAccess_token());
            return;
        }
        member.updateToken(kakaoTokenResponse.getAccess_token(),
                kakaoTokenResponse.getRefresh_token());
    }

    private boolean isRefreshTokenNullOf(kakaoTokenResponse kakaoTokenResponse) {
        return kakaoTokenResponse.getRefresh_token() == null
                || kakaoTokenResponse.getRefresh_token().length() == 0;
    }

    private void setApiRequestFactory(AuthorizationType authorizationType, String token,
            String contentType) {
        HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
        factory.setReadTimeout(5000);
        factory.setConnectTimeout(3000);
        HttpClient httpClient = HttpClientBuilder.create()
                .setMaxConnTotal(100)
                .setMaxConnPerRoute(5)
                .setDefaultHeaders(
                        Arrays.asList(
                                new BasicHeader("Authorization",
                                        String.format("%s %s", authorizationType, token)),
                                new BasicHeader("Content-type", contentType)))
                .build();

        factory.setHttpClient(httpClient);

        restTemplate.setRequestFactory(factory);
    }

    private void setTokenRequestFactory() {
        HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
        factory.setReadTimeout(5000);
        factory.setConnectTimeout(3000);
        HttpClient httpClient = HttpClientBuilder.create()
                .setMaxConnTotal(100)
                .setMaxConnPerRoute(5)
                .setDefaultHeaders(
                        Arrays.asList(
                                new BasicHeader("Content-type",
                                        "application/x-www-form-urlencoded;charset=utf-8")))
                .build();

        factory.setHttpClient(httpClient);

        restTemplate.setRequestFactory(factory);
    }
}
