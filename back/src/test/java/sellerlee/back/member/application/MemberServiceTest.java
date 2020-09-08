package sellerlee.back.member.application;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;
import static sellerlee.back.fixture.MemberFixture.*;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import sellerlee.back.member.domain.IllegalLoginException;
import sellerlee.back.member.domain.Member;
import sellerlee.back.member.domain.MemberRepository;
import sellerlee.back.security.oauth2.token.JwtTokenProvider;

@ExtendWith(value = MockitoExtension.class)
class MemberServiceTest {
    @Mock
    private MemberRepository memberRepository;

    @Mock
    private JwtTokenProvider jwtTokenProvider;

    @Mock
    private PasswordEncoder passwordEncoder;

    private MemberService memberService;

    @BeforeEach
    void setUp() {
        memberService = new MemberService(memberRepository, jwtTokenProvider, passwordEncoder);
    }

    @DisplayName("닉네임으로 이미 존재하는 회원인지 확인한 후 계정을 생성한다.")
    @Test
    void join() {
        Member member = new Member("seller lee",
                "encodedPassword",
                "https://avatars2.githubusercontent.com/u/67987529?s=200&v=4");

        when(memberRepository.existsByNickname(anyString())).thenReturn(false);
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        when(memberRepository.save(any())).thenReturn(member);

        memberService.join(MEMBER_CREATE_REQUEST);
        verify(memberRepository).save(any());
    }

    @DisplayName("닉네임으로 회원을 찾고 비밀번호가 일치하는지 여부를 확인한다.")
    @Test
    void login() {
        when(memberRepository.findOptionalMemberByNickname(anyString()))
                .thenReturn(Optional.of(MEMBER1));
        when(passwordEncoder.matches(anyString(), anyString())).thenReturn(true);
        when(jwtTokenProvider.createToken(anyString()))
                .thenReturn("token");

        assertThat(memberService.login(MEMBER_LOGIN_REQUEST)).isEqualTo("token");
        verify(memberRepository).findOptionalMemberByNickname(anyString());
    }

    @DisplayName("존재하지 않는 닉네임이 들어올 경우 예외를 발생시킨다.")
    @Test
    void login_InvalidEmail() {
        when(memberRepository.findOptionalMemberByNickname(anyString()))
                .thenReturn(Optional.empty());

        assertThatThrownBy(() -> memberService.login(INVALID_EMAIL_MEMBER_LOGIN_REQUEST))
                .isInstanceOf(IllegalLoginException.class)
                .hasMessage("닉네임이 일치하는 회원이 존재하지 않습니다.");

        verify(memberRepository).findOptionalMemberByNickname(anyString());
    }

    @DisplayName("일치하지 않는 비밀번호가 들어올 경우 예외를 발생시킨다.")
    @Test
    void login_InvalidPassword() {
        when(memberRepository.findOptionalMemberByNickname(anyString()))
                .thenReturn(Optional.of(MEMBER1));
        when(passwordEncoder.matches(anyString(), anyString())).thenReturn(false);

        assertThatThrownBy(() -> memberService.login(INVALID_PASSWORD_MEMBER_LOGIN_REQUEST))
                .isInstanceOf(IllegalLoginException.class)
                .hasMessage("비밀번호가 일치하지 않습니다.");

        verify(memberRepository).findOptionalMemberByNickname(anyString());
    }

    @Disabled
    @DisplayName("회원정보 수정 요청 시 회원정보 수정")
    @Test
    void update() {
        when(memberRepository.findById(anyLong())).thenReturn(Optional.of(MEMBER1));

        memberService.update(MEMBER1, PROFILE_REQUEST);

        assertThat(MEMBER1.getAvatar()).isEqualTo(PROFILE_REQUEST.getAvatar());
        assertThat(MEMBER1.getPassword()).isEqualTo(PROFILE_REQUEST.getPassword());
    }
}
