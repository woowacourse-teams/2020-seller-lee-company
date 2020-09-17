package com.jikgorae.api.memberOrganization.acceptance;

import static com.jikgorae.api.fixture.MemberFixture.*;
import static org.junit.jupiter.api.DynamicTest.*;

import java.util.stream.Stream;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;

import com.jikgorae.api.AcceptanceTest;
import com.jikgorae.api.member.application.AuthTokenResponse;
import com.jikgorae.api.organization.application.OrganizationResponse;

public class MemberOrganizationAcceptanceTest extends AcceptanceTest {
    private AuthTokenResponse token;

    /**
     * Feature: 회원/조직 연관관계 관리
     * <p>
     * Scenario: 회원/조직 연관관계를 관리한다.
     * <p>
     * Given 조직이 등록되어 있다.
     * Given 회원이 등록되어 있다.
     * When 회원/조직 연관관계를 추가한다.
     * Then 연관관계가 추가되었다.
     *
     */
    @DisplayName("회원/조직 연관관계 관리")
    @TestFactory
    Stream<DynamicTest> manageMemberOrganization() throws Exception {
        token = joinAndLogin(MEMBER1);
        OrganizationResponse organizationResponse = createOrganization(token);

        return Stream.of(
                dynamicTest("회원/조직 추가", () -> {
                    createMemberOrganization(organizationResponse, token);
                })
        );
    }
}
