package com.jikgorae.api.memberOrganization.application;

import static com.jikgorae.api.fixture.MemberFixture.*;
import static com.jikgorae.api.fixture.MemberOrganizationFixture.*;
import static com.jikgorae.api.fixture.OrganizationFixture.*;
import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.jikgorae.api.memberOrganization.domain.MemberOrganizationRepository;
import com.jikgorae.api.organization.domain.OrganizationRepository;

@ExtendWith(MockitoExtension.class)
class MemberOrganizationRegisterServiceTest {
    @Mock
    private MemberOrganizationRepository memberOrganizationRepository;

    @Mock
    private OrganizationRepository organizationRepository;

    private MemberOrganizationRegisterService memberOrganizationRegisterService;

    @BeforeEach
    void setUp() {
        memberOrganizationRegisterService = new MemberOrganizationRegisterService(
                memberOrganizationRepository, organizationRepository);
    }

    @DisplayName("로그인된 회원과 입장 코드에 해당하는 조직으로 등록")
    @Test
    void register() {
        when(organizationRepository.findOptionalByCode(anyString())).thenReturn(
                Optional.of(직고래));
        when(memberOrganizationRepository.save(any())).thenReturn(MEMBER_직고래);

        Long memberOrganizationId = memberOrganizationRegisterService.register(MEMBER1,
                MEMBER_직고래_REQUEST);

        assertThat(memberOrganizationId).isEqualTo(51L);
    }

    @DisplayName("존재하지 않는 입장 코드를 입력시 예외 발생")
    @Test
    void register_Exception() {
        when(organizationRepository.findOptionalByCode(anyString())).thenThrow(
                new IllegalArgumentException("입장 코드와 일치하는 조직이 존재하지 않습니다."));

        assertThatThrownBy(() -> memberOrganizationRegisterService.register(MEMBER1,
                MEMBER_직고래_REQUEST))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("입장 코드와 일치하는 조직이 존재하지 않습니다.");
    }

    @DisplayName("이미 존재하는 조직의 입장 코드를 입력 시 해당 관계 id 반환")
    @Test
    void register_Exists() {
        when(organizationRepository.findOptionalByCode(anyString())).thenReturn(
                Optional.of(직고래));
        when(memberOrganizationRepository.findOptionalByMemberAndOrganization(any(),
                any())).thenReturn(Optional.of(MEMBER_직고래));

        assertThat(memberOrganizationRegisterService.register(MEMBER1, MEMBER_직고래_REQUEST))
                .isEqualTo(MEMBER_직고래.getId());
    }
}
