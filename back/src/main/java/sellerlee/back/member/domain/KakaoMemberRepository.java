package sellerlee.back.member.domain;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface KakaoMemberRepository extends JpaRepository<KakaoMember, Long> {
    Optional<KakaoMember> findOptionalKakaoMemberByOauthId(String OauthId);
}
