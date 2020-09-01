package sellerlee.back.member.application;

import java.util.Arrays;

import org.apache.http.client.HttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicHeader;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import sellerlee.back.member.domain.Member;
import sellerlee.back.member.domain.MemberRepository;
import sellerlee.back.security.oauth2.token.JwtTokenProvider;

@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;

    public MemberService(MemberRepository memberRepository, JwtTokenProvider jwtTokenProvider,
            PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.passwordEncoder = passwordEncoder;
    }

    // @Transactional
    // public Long join(MemberRequest request) {
    //     boolean existMember = memberRepository.existsByNickname(request.getNickname());
    //
    //     if (existMember) {
    //         throw new IllegalJoinException("이미 회원가입이 되어있는 닉네임입니다.");
    //     }
    //
    //     return memberRepository.save(request.toEntityWithPasswordEncode(passwordEncoder)).getId();
    // }

    // public String login(LoginRequest request) {
    //     Member findMember = memberRepository.findOptionalMemberByNickname(request.getNickname())
    //             .orElseThrow(() -> new IllegalLoginException("닉네임이 일치하는 회원이 존재하지 않습니다."));
    //
    //     if (!findMember.verify(passwordEncoder, request.getPassword())) {
    //         throw new IllegalLoginException("비밀번호가 일치하지 않습니다.");
    //     }
    //
    //     return jwtTokenProvider.createToken(request.getNickname());
    // }

    @Transactional
    public void update(Member loginMember, ProfileRequest request) throws JsonProcessingException {
        if (findNickname(request.getNickname())) {
            throw new IllegalArgumentException("중복된 이름으로 변경할 수 없습니다.");
        }

        Member member = memberRepository.findById(loginMember.getId())
                .orElseThrow(() -> new IllegalArgumentException("ID가 일치하는 회원이 존재하지 않습니다."));

        member.update(request.getNickname(), request.getAvatar());

        String token = loginMember.getKakaoAccessToken();
        HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
        factory.setReadTimeout(5000); // 읽기시간초과, ms
        factory.setConnectTimeout(3000); // 연결시간초과, ms
        HttpClient httpClient = HttpClientBuilder.create()
                .setMaxConnTotal(100) // connection pool 적용
                .setMaxConnPerRoute(5) // connection pool 적용
                .setDefaultHeaders(
                        Arrays.asList(
                                new BasicHeader("Authorization", "bearer " + token),
                                new BasicHeader("Content-type",
                                        "application/x-www-form-urlencoded;charset=utf-8")))
                .build();

        factory.setHttpClient(httpClient); // 동기실행에 사용될 HttpClient 세팅
        RestTemplate restTemplate = new RestTemplate(factory);
        ObjectMapper objectMapper = new ObjectMapper();

        String url = "https://kapi.kakao.com/v1/user/update_profile";
        MultiValueMap<String, String> multiValueMap = new LinkedMultiValueMap<>();
        multiValueMap.add("properties",
                objectMapper.writeValueAsString(KakaoProfileRequest.of(member)));

        restTemplate.postForObject(url, multiValueMap, String.class);
    }

    public boolean findNickname(String verifyNickname) {
        return memberRepository.findOptionalMemberByNickname(verifyNickname).isPresent();
    }
}
