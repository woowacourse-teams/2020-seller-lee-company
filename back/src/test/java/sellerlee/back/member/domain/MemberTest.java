package sellerlee.back.member.domain;

import static org.assertj.core.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

class MemberTest {
    private PasswordEncoder passwordEncoder;

    @BeforeEach
    void setUp() {
        passwordEncoder = new BCryptPasswordEncoder();
    }

    @DisplayName("회원의 패스워드와 일치하는지 여부를 확인")
    @Test
    void verify() {
        Member member = new Member("스티치", passwordEncoder.encode("1234"), "uri", 5.0);
        String password = "1234";

        assertThat(member.verify(passwordEncoder, password)).isTrue();
    }
}
