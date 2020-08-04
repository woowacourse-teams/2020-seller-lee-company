package sellerlee.back.member.domain;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class MemberTest {
    @DisplayName("회원의 패스워드와 일치하는지 여부를 확인")
    @Test
    void verify() {
        // given
        Member member = new Member("lxxjn0@gmail.com", "1234", "nickname", "avatar", 4.5);

        // when
        String password = "1234";

        // then
        assertThat(member.verify(password)).isTrue();
    }
}
