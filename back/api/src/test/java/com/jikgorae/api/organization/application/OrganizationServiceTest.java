package com.jikgorae.api.organization.application;

import static com.jikgorae.api.fixture.OrganizationFixture.*;
import static com.jikgorae.api.organization.domain.RandomOrganizationCodeGenerator.*;
import static com.jikgorae.api.organization.exception.OrganizationAlreadyExistsException.*;
import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.jikgorae.api.organization.domain.CustomOrganizationCodeGenerator;
import com.jikgorae.api.organization.domain.Organization;
import com.jikgorae.api.organization.domain.OrganizationCodeGenerator;
import com.jikgorae.api.organization.domain.OrganizationRepository;
import com.jikgorae.api.organization.exception.OrganizationAlreadyExistsException;

@ExtendWith(value = MockitoExtension.class)
class OrganizationServiceTest {
    @Mock
    private OrganizationRepository organizationRepository;

    private OrganizationCodeGenerator organizationCodeGenerator;

    private OrganizationService organizationService;

    @BeforeEach
    void setUp() {
        organizationCodeGenerator = new CustomOrganizationCodeGenerator();
        organizationService = new OrganizationService(organizationRepository,
                organizationCodeGenerator);
    }

    @DisplayName("조직 생성 메서드 호출 시 동일한 이름의 조직이 존재하는지 확인 후 생성 코드를 포함하여 생성")
    @Test
    void create() {
        when(organizationRepository.existsByName(anyString())).thenReturn(false);
        when(organizationRepository.existsByCode(anyString())).thenAnswer(
                invocation -> {
                    Object argument = invocation.getArgument(0);
                    return argument.equals("000000");
                }
        );
        when(organizationRepository.save(any())).thenReturn(직고래);

        Organization organization = organizationService.create(직고래_요청);

        assertAll(
                () -> assertThat(organization.getId()).isNotNull(),
                () -> assertThat(organization.getName()).isEqualTo(직고래_NAME),
                () -> assertThat(organization.getCode()).hasSize(CODE_LENGTH)
        );
    }

    @DisplayName("이미 존재하는 조직의 경우 OrganizationAlreadyExistsException 예외 발생")
    @Test
    void create_OrganizationAlreadyExistsException() {
        when(organizationRepository.existsByName(anyString())).thenReturn(true);

        assertThatThrownBy(() -> organizationService.create(직고래_요청))
                .isInstanceOf(OrganizationAlreadyExistsException.class)
                .hasMessage(ALREADY_EXISTS_ORGANIZATION_NAME);
    }
}
