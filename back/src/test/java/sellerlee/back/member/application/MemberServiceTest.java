/**
 * @author lxxjn0
 */

package sellerlee.back.member.application;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;
import static sellerlee.back.fixture.MemberFixture.*;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import sellerlee.back.member.domain.IllegalMemberLoginException;
import sellerlee.back.member.domain.MemberRepository;

@ExtendWith(value = MockitoExtension.class)
class MemberServiceTest {
    @Mock
    private MemberRepository memberRepository;

    private MemberService memberService;

    @BeforeEach
    void setUp() {
        memberService = new MemberService(memberRepository);
    }

    @DisplayName("이메일로 회원을 찾고 비밀번호가 일치하는지 여부를 확인한다.")
    @Test
    void login() {
        when(memberRepository.findMemberByEmail(anyString()))
                .thenReturn(Optional.of(MEMBER1));

        memberService.login(MEMBER_LOGIN_REQUEST_FIXTURE);
        verify(memberRepository).findMemberByEmail(anyString());
    }

    @DisplayName("존재하지 않는 이메일이 들어올 경우 예외를 발생시킨다.")
    @Test
    void login_InvalidEmail() {
        when(memberRepository.findMemberByEmail(anyString()))
                .thenThrow(new IllegalMemberLoginException("이메일이 일치하는 회원이 존재하지 않습니다."));

        assertThatThrownBy(() -> memberService.login(INVALID_EMAIL_MEMBER_LOGIN_REQUEST_FIXTURE))
                .isInstanceOf(IllegalMemberLoginException.class)
                .hasMessage("이메일이 일치하는 회원이 존재하지 않습니다.");

        verify(memberRepository).findMemberByEmail(anyString());
    }

    @DisplayName("일치하지 않는 비밀번호가 들어올 경우 예외를 발생시킨다.")
    @Test
    void login_InvalidPassword() {
        when(memberRepository.findMemberByEmail(anyString()))
                .thenThrow(new IllegalMemberLoginException("비밀번호가 일치하지 않습니다."));

        assertThatThrownBy(() -> memberService.login(INVALID_PASSWORD_MEMBER_LOGIN_REQUEST_FIXTURE))
                .isInstanceOf(IllegalMemberLoginException.class)
                .hasMessage("비밀번호가 일치하지 않습니다.");

        verify(memberRepository).findMemberByEmail(anyString());
    }
}
