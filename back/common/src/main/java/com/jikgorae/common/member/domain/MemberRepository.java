package com.jikgorae.common.member.domain;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findOptionalMemberByNickname(String nickname);

    // Optional<Member> findOptionalMemberByEmail(String email);

    Optional<Member> findOptionalMemberByKakaoId(String kakoId);

    Boolean existsByNickname(String nickname);
}
