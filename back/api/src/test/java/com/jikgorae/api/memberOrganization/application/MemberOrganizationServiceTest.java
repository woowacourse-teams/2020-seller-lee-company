package com.jikgorae.api.memberOrganization.application;

import static com.jikgorae.api.fixture.MemberFixture.*;
import static com.jikgorae.api.fixture.MemberOrganizationFixture.*;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.jikgorae.api.memberOrganization.domain.MemberOrganizationRepository;

@ExtendWith(MockitoExtension.class)
class MemberOrganizationServiceTest {
    @Mock
    private MemberOrganizationRepository memberOrganizationRepository;

    private MemberOrganizationService memberOrganizationService;

    @BeforeEach
    void setUp() {
        memberOrganizationService = new MemberOrganizationService(memberOrganizationRepository);
    }

    @DisplayName("회원/조")
    @Test
    void delete() {
        doNothing().when(memberOrganizationRepository)
                .deleteByMemberAndOrganizationId(any(), anyLong());

        memberOrganizationService.delete(MEMBER1, MEMBER_ORGANIZATION1.getId());

        verify(memberOrganizationRepository).deleteByMemberAndOrganizationId(MEMBER1,
                MEMBER_ORGANIZATION1.getId());
    }

}
