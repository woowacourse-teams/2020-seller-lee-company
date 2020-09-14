package com.jikgorae.api.organization.presentation;

import static com.jikgorae.api.fixture.GroupFixture.*;
import static com.jikgorae.api.organization.presentation.OrganizationController.*;
import static org.mockito.Mockito.*;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;

import com.jikgorae.api.ControllerTest;
import com.jikgorae.api.organization.application.OrganizationService;
import com.jikgorae.api.organization.domain.OrganizationRepository;

@WebMvcTest(controllers = OrganizationController.class)
class OrganizationControllerTest extends ControllerTest {
    @MockBean
    private OrganizationService organizationService;

    @MockBean
    private OrganizationRepository organizationRepository;

    @DisplayName("조직 생성 시 HTTP STATUS는 CREATE이고 랜덤한 6자리 입장 코드를 반환")
    @Test
    void create() throws Exception {
        when(organizationService.create(ORGANIZATION_NAME)).thenReturn(ORGANIZATION1);

        mockMvc.perform(
                post(ORGANIZATION_API_URI)
                        .param("name", ORGANIZATION_NAME)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated());
    }
}
