package com.jikgorae.api.organization.acceptance;

import static com.jikgorae.api.fixture.MemberFixture.*;
import static com.jikgorae.api.organization.domain.Organization.*;
import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.DynamicTest.*;

import java.util.stream.Stream;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;

import com.jikgorae.api.AcceptanceTest;
import com.jikgorae.api.member.application.AuthTokenResponse;
import com.jikgorae.api.organization.application.OrganizationResponse;

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
     * Then: 조직이 등록되고 입장 코드를 응답받는다.
     */
    @DisplayName("조직 관리")
    @TestFactory
    Stream<DynamicTest> manageOrganization() {
        token = joinAndLogin(MEMBER1);

        return Stream.of(
                dynamicTest("조직 생성", () -> {
                    OrganizationResponse organizationResponse = createOrganization(token);
                    assertAll(
                            () -> assertThat(organizationResponse.getId()).isNotNull(),
                            () -> assertThat(organizationResponse.getName())
                                    .isEqualTo("직고래"),
                            () -> assertThat(organizationResponse.getCode()).hasSize(CODE_LENGTH)
                    );
                })
        );
    }
}
