package com.jikgorae.api.member.domain;

import static com.jikgorae.api.fixture.MemberFixture.*;
import static org.assertj.core.api.Assertions.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class MemberTest {
    @Test
    void update() {
        Member member = new Member(1L);
        member.update("가물치연못", null);

        assertThat(member.getNickname()).isEqualTo("가물치연못");
    }

    @DisplayName("Member의 id가 같을경우")
    @Test
    void isSameId() {
        Long id = 51L;
        Member member1 = new Member(id);
        Member member2 = new Member(id);
        assertThat(member1.isSameId(member2)).isTrue();
    }

    @DisplayName("Member의 id가 다를경우")
    @Test
    void isNotSameId() {
        Member member1 = new Member(MEMBER1.getId());
        Member member2 = new Member(MEMBER2.getId());
        assertThat(member1.isSameId(member2)).isFalse();
    }

    @Test
    void isSameNickname() {
        String nickname = "lxxjn0";
        Member member = new Member(51L, "", nickname, null, null, null);
        assertThat(member.isSameNickname(nickname)).isTrue();
    }
}
