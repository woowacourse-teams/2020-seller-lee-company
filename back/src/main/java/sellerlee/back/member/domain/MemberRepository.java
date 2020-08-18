package sellerlee.back.member.domain;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findOptionalMemberByNickname(String nickname);

    Boolean existsByNickname(String nickname);
}
