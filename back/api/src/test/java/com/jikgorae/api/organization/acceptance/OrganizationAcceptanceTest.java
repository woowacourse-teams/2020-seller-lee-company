package com.jikgorae.api.organization.acceptance;

import static com.jikgorae.api.fixture.MemberFixture.*;
import static com.jikgorae.api.organization.presentation.OrganizationController.*;
import static com.jikgorae.api.security.oauth2.authentication.AuthorizationExtractor.*;
import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.DynamicTest.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;
import java.util.stream.Stream;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;
import org.springframework.test.web.servlet.MvcResult;

import com.jikgorae.api.AcceptanceTest;
import com.jikgorae.api.member.application.AuthTokenResponse;
import com.jikgorae.api.organization.application.OrganizationResponse;
import com.jikgorae.api.security.web.AuthorizationType;

public class OrganizationAcceptanceTest extends AcceptanceTest {
    private AuthTokenResponse token;

    /**
     * Feature: 조직 관리
     * <p>
     * Scenario: 조직을 관리한다
     * <p>
     * Given: 회원이 등록되어 있다
     * <p>
     * When: 조직을 등록한다.
     * <p>
     * Then: 조직이 등록되고 입장 코드를 응답받는다.
     * <p>
     * Given: 회원이 조직을 등록하였다.
     * <p>
     * When: 회원이 등록한 조직을 조회한다.
     * <p>
     * Then: 등록된 조직이 반환된다.
     */
    @DisplayName("조직 관리")
    @TestFactory
    Stream<DynamicTest> manageOrganization() throws Exception {
        token = joinAndLogin(MEMBER1);
        OrganizationResponse organizationResponse = createOrganization(token);

        return Stream.of(
                dynamicTest("회원이 가입한 조직 조회", () -> {
                    createMemberOrganization(organizationResponse, token);
                    List<OrganizationResponse> organizationResponses = showAll(token);
                    assertThat(organizationResponses).containsExactly(organizationResponse);
                })
        );
    }

    private List<OrganizationResponse> showAll(AuthTokenResponse token) throws Exception {
        MvcResult mvcResult = mockMvc
                .perform(
                        get(ORGANIZATION_API_URI)
                                .header(AUTHORIZATION,
                                        String.format("%s %s", AuthorizationType.BEARER,
                                                token.getAccessToken())))
                .andExpect(status().isOk())
                .andReturn();

        String json = mvcResult.getResponse().getContentAsString();

        return objectMapper.readValue(json, objectMapper.getTypeFactory()
                .constructCollectionType(List.class, OrganizationResponse.class));
    }
}
