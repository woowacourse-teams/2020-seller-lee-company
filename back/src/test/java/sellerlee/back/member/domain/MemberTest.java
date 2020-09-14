package sellerlee.back.member.domain;

import static org.assertj.core.api.Assertions.*;
import static sellerlee.back.fixture.MemberFixture.*;

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
        Member member = new Member(51L);
        assertThat(MEMBER1.isSameId(member)).isTrue();
    }

    @Test
    void isSameNickname() {
        String nickname = "lxxjn0";
        assertThat(MEMBER1.isSameNickname(nickname)).isTrue();
    }
}
