package com.jikgorae.api.chatroom.domain;

import static com.jikgorae.api.fixture.MemberFixture.*;
import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import com.jikgorae.api.member.domain.Member;

class OpponentTest {
    @DisplayName("상대방을 반환한다.")
    @Test
    void of() {
        Member me = MEMBER1;
        Member opponent = MEMBER2;

        assertThat(Opponent.of(MEMBER1, MEMBER2, me).getId()).isEqualTo(opponent.getId());
        assertThat(Opponent.of(MEMBER2, MEMBER1, me).getId()).isEqualTo(opponent.getId());
    }
}