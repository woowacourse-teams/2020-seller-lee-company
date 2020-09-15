package com.jikgorae.api.organization.application;

import static com.jikgorae.api.fixture.GroupFixture.*;
import static com.jikgorae.api.organization.domain.Organization.*;
import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.assertj.core.util.Lists;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.jikgorae.api.organization.domain.Organization;
import com.jikgorae.api.organization.domain.OrganizationRepository;

@ExtendWith(value = MockitoExtension.class)
class OrganizationServiceTest {
    @Mock
    private OrganizationRepository organizationRepository;

    private OrganizationService organizationService;

    @BeforeEach
    void setUp() {
        organizationService = new OrganizationService(organizationRepository);
    }

    @DisplayName("조직 생성 메서드 호출 시 동일한 이름의 조직이 존재하는지 확인 후 생성 코드를 포함하여 생성")
    @Test
    void create() {
        when(organizationRepository.findAll()).thenReturn(Lists.emptyList());
        when(organizationRepository.save(any())).thenReturn(ORGANIZATION1);

        Organization organization = organizationService.create(ORGANIZATION_REQUEST);

        assertAll(
                () -> assertThat(organization.getId()).isNotNull(),
                () -> assertThat(organization.getName()).isEqualTo(ORGANIZATION_NAME),
                () -> assertThat(organization.getCode()).hasSize(CODE_LENGTH)
        );
    }

    @DisplayName("이미 존재하는 조직의 경우 IllegalArgumentException 예외 발생")
    @Test
    void create_Name_Exception() {
        when(organizationRepository.findAll()).thenReturn(Lists.newArrayList(ORGANIZATION1));

        assertThatThrownBy(() -> organizationService.create(ORGANIZATION_REQUEST))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("이미 존재하는 조직입니다.");
    }
}
