package com.jikgorae.api.memberOrganization.application;

import static com.jikgorae.api.fixture.GroupFixture.*;
import static com.jikgorae.api.fixture.MemberFixture.*;
import static com.jikgorae.api.fixture.MemberOrganizationFixture.*;
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
                Optional.of(ORGANIZATION1));
        when(memberOrganizationRepository.save(any())).thenReturn(MEMBER_ORGANIZATION1);

        Long memberOrganizationId = memberOrganizationRegisterService.register(MEMBER1,
                MEMBER_ORGANIZATION_REQUEST);

        assertThat(memberOrganizationId).isEqualTo(51L);
    }
}
