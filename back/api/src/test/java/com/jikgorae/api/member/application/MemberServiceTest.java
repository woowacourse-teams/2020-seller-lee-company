package com.jikgorae.api.member.application;

import static com.jikgorae.api.fixture.MemberFixture.*;
import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.jikgorae.api.member.domain.MemberRepository;

@ExtendWith(value = MockitoExtension.class)
class MemberServiceTest {
    @Mock
    private MemberRepository memberRepository;

    @Mock
    private KakaoService kakaoService;

    private MemberService memberService;

    @BeforeEach
    void setUp() {
        memberService = new MemberService(memberRepository, kakaoService);
    }

    @DisplayName("회원정보 수정 요청 시 회원정보 수정")
    @Test
    void update() throws JsonProcessingException {
        doNothing().when(kakaoService).updateProfile(any());

        memberService.update(MEMBER1, PROFILE_REQUEST);

        assertThat(MEMBER1.getAvatar()).isEqualTo(PROFILE_REQUEST.getAvatar());
        assertThat(MEMBER1.getNickname()).isEqualTo(
                PROFILE_REQUEST.getNickname());
    }

    @DisplayName("중복된 회원정보 수정 요청 시 Exception 발생")
    @Test
    void ThrowExceptionUpdate() {
        when(memberRepository.findOptionalMemberByNickname(anyString())).thenReturn(
                Optional.of(MEMBER1));

        assertThatThrownBy(() -> memberService.update(MEMBER1, PROFILE_REQUEST)).isInstanceOf(
                IllegalArgumentException.class);
    }
}
