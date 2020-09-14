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
}
