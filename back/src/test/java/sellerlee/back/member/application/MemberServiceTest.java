/**
 * @author lxxjn0
 */

package sellerlee.back.member.application;

import static org.mockito.Mockito.*;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import sellerlee.back.member.domain.Member;
import sellerlee.back.member.domain.MemberRepository;

@ExtendWith(value = MockitoExtension.class)
class MemberServiceTest {
    private static final String MEMBER_EMAIL = "sellerlee@gmail.com";
    private static final String MEMBER_PASSWORD = "1234";
    private static final double MEMBER_SCORE = 4.5;

    @Mock
    private MemberRepository memberRepository;

    private MemberService memberService;
    private Member member;

    @BeforeEach
    void setUp() {
        memberService = new MemberService(memberRepository);
        member = new Member(MEMBER_EMAIL, MEMBER_PASSWORD, MEMBER_SCORE);
    }

    @DisplayName("이메일로 회원을 찾고 비밀번호가 일치하는지 여부를 확인한다.")
    @Test
    void login() {
        MemberLoginRequest request = new MemberLoginRequest(MEMBER_EMAIL, MEMBER_PASSWORD);

        when(memberRepository.findMemberByEmail(anyString()))
                .thenReturn(Optional.of(member));

        memberService.login(request);
        verify(memberRepository).findMemberByEmail(anyString());
    }
}
