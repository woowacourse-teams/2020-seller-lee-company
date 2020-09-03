package sellerlee.back.member.application;

import java.util.Arrays;

import org.apache.http.client.HttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicHeader;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import sellerlee.back.member.domain.Member;
import sellerlee.back.security.web.AuthorizationType;

@Component
public class KakaoService {
    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();
    public static final String UPDATE_PROFILE_URI = "https://kapi.kakao.com/v1/user/update_profile";

    private final RestTemplate restTemplate;

    public KakaoService(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }

    public void updateProfile(Member member) throws JsonProcessingException {
        setRequestFactory(AuthorizationType.BEARER, member.getKakaoAccessToken(),
                "application/x-www-form-urlencoded;charset=utf-8");

        MultiValueMap<String, String> multiValueMap = new LinkedMultiValueMap<>();
        multiValueMap.add("properties",
                OBJECT_MAPPER.writeValueAsString(KakaoPropertiesRequest.of(member)));

        restTemplate.postForObject(UPDATE_PROFILE_URI, multiValueMap, String.class);
    }

    public void setRequestFactory(AuthorizationType authorizationType, String token,
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
}
