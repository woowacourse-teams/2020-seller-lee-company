package com.jikgorae.api.organization.acceptance;

import static com.jikgorae.api.fixture.GroupFixture.*;
import static com.jikgorae.api.fixture.MemberFixture.*;
import static com.jikgorae.api.organization.domain.Organization.*;
import static com.jikgorae.api.organization.presentation.OrganizationController.*;
import static com.jikgorae.api.security.oauth2.authentication.AuthorizationExtractor.*;
import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.DynamicTest.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.stream.Stream;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;

import com.jikgorae.api.AcceptanceTest;
import com.jikgorae.api.member.application.TokenResponse;
import com.jikgorae.api.organization.application.OrganizationResponse;
import com.jikgorae.api.security.web.AuthorizationType;

public class OrganizationAcceptanceTest extends AcceptanceTest {
    private TokenResponse token;

    /**
     * Feature: 조직 관리
     * <p>
     * Scenario: 조직을 관리한다
     * <p>
     * Given: 회원이 등록되어 있다
     * <p>
     * When: 조직을 등록한다.
     * Then: 조직이 등록되고 입장 코드를 응답받는다.
     */
    @DisplayName("조직 관리")
    @TestFactory
    Stream<DynamicTest> manageGroup() {
        token = joinAndLogin(MEMBER1);

        return Stream.of(
                dynamicTest("조직 생성", () -> {
                    OrganizationResponse organizationResponse = createGroup(token);
                    assertAll(
                            () -> assertThat(organizationResponse.getId()).isNotNull(),
                            () -> assertThat(organizationResponse.getName())
                                    .isEqualTo("직고래"),
                            () -> assertThat(organizationResponse.getCode()).hasSize(CODE_LENGTH)
                    );
                })
        );
    }

    private OrganizationResponse createGroup(TokenResponse token) throws Exception {
        String request = objectMapper.writeValueAsString(ORGANIZATION_REQUEST);

        MvcResult mvcResult = mockMvc.perform(
                post(ORGANIZATION_API_URI)
                        .header(AUTHORIZATION, String.format("%s %s", AuthorizationType.BEARER,
                                token.getAccessToken()))
                        .content(request)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andReturn();

        String json = mvcResult.getResponse().getContentAsString();
        return objectMapper.readValue(json, OrganizationResponse.class);
    }
}
