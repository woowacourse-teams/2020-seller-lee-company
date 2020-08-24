package sellerlee.back.security.oauth2.service;

import java.util.LinkedHashMap;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import sellerlee.back.member.domain.Member;
import sellerlee.back.member.domain.MemberRepository;
import sun.reflect.generics.reflectiveObjects.NotImplementedException;

@Service
public class MyOAuth2AuthorizedClientService implements OAuth2AuthorizedClientService {

    private final MemberRepository memberRepository;

    public MyOAuth2AuthorizedClientService(
            MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Override
    public void saveAuthorizedClient(OAuth2AuthorizedClient oAuth2AuthorizedClient,
            Authentication authentication) {
        // String providerType = oAuth2AuthorizedClient.getClientRegistration().getRegistrationId();
        OAuth2AccessToken accessToken = oAuth2AuthorizedClient.getAccessToken();

        OAuth2User oauth2User = (OAuth2User)authentication.getPrincipal();
        String id = String.valueOf(oauth2User.getAttributes().get("id"));
        String name = (String)((LinkedHashMap)((LinkedHashMap)oauth2User.getAttribute(
                "kakao_account")).get("profile")).get("nickname");

        Member member = new Member(Long.valueOf(id), name, accessToken.getTokenValue(), null, 5D);
        memberRepository.save(member);
    }

    @Override
    public <T extends OAuth2AuthorizedClient> T loadAuthorizedClient(String s, String s1) {
        throw new NotImplementedException();
    }

    @Override
    public void removeAuthorizedClient(String s, String s1) {
        throw new NotImplementedException();
    }
}
