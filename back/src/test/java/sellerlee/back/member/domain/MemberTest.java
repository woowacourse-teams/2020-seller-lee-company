package sellerlee.back.member.domain;

import static org.assertj.core.api.Assertions.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class MemberTest {
    @DisplayName("회원의 패스워드와 일치하는지 여부를 확인")
    @Test
    void verify() {
        Member member = new Member("스티치", "1234", "uri", 4.5);

        String password = "1234";

        assertThat(member.verify(password)).isTrue();
    }
}
