package sellerlee.back.member.domain;

import static org.assertj.core.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

class MemberTest {
    private static final String NAME = "터틀";
    private static final String PASSWORD = "123456";
    private static final String AVATAR = "uri";

    private PasswordEncoder passwordEncoder;

    @BeforeEach
    void setUp() {
        passwordEncoder = new BCryptPasswordEncoder();
    }

    @DisplayName("회원의 패스워드와 일치하는지 여부를 확인")
    @Test
    void verify() {
        Member member = new Member(NAME, passwordEncoder.encode(PASSWORD), AVATAR);

        assertThat(member.verify(passwordEncoder, PASSWORD)).isTrue();
    }

    @DisplayName("인자로 받은 Member의 값으로 회원의 정보를 변경")
    @Test
    void update() {
        Member member = new Member(NAME, PASSWORD, AVATAR);
        String newPassword = "1234";
        String newAvatar = "newUri";
        Member updateMember = new Member(NAME, newPassword, newAvatar);

        member.update(updateMember, passwordEncoder);

        assertThat(passwordEncoder.matches(newPassword, member.getPassword())).isTrue();
        assertThat(member.getAvatar()).isEqualTo(newAvatar);
    }

    @DisplayName("비밀번호에 빈 문자열을 인자로 받은 경우 기존 Member의 비밀번호 유지")
    @Test
    void update2() {
        Member member = new Member(NAME, PASSWORD, AVATAR);
        String newPassword = "";
        String newAvatar = "newUri";
        Member updateMember = new Member(NAME, newPassword, newAvatar);

        member.update(updateMember, passwordEncoder);

        assertThat(member.getPassword()).isEqualTo(PASSWORD);
        assertThat(member.getAvatar()).isEqualTo(newAvatar);
    }
}