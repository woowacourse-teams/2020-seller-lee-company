/**
 * @author lxxjn0
 */

package sellerlee.back.member.application;

import static org.mockito.Mockito.*;
import static sellerlee.back.member.fixture.MemberFixture.*;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

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
                .thenReturn(Optional.of(MEMBER_FIXTURE));

        memberService.login(MEMBER_LOGIN_REQUEST_FIXTURE);
        verify(memberRepository).findMemberByEmail(anyString());
    }
}
