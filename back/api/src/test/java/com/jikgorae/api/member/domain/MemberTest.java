package com.jikgorae.api.member.domain;

import static org.assertj.core.api.Assertions.*;

import org.junit.jupiter.api.Test;

class MemberTest {
    @Test
    void update() {
        Member member = new Member(1L);
        member.update("가물치연못", null);

        assertThat(member.getNickname()).isEqualTo("가물치연못");
        assertThat(member.getState()).isEqualTo(State.JOIN);
    }

    @Test
    void isSameId() {
        Long id = 51L;
        Member member1 = new Member(id);
        Member member2 = new Member(id);
        assertThat(member1.isSameId(member2)).isTrue();
    }

    @Test
    void isSameNickname() {
        String nickname = "lxxjn0";
        Member member = new Member(51L,"", nickname, null, null, null, null, null, null);
        assertThat(member.isSameNickname(nickname)).isTrue();
    }
}
