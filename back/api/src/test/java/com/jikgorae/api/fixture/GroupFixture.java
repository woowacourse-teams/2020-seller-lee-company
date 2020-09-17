package com.jikgorae.api.fixture;

import com.jikgorae.api.organization.application.OrganizationRequest;
import com.jikgorae.api.organization.application.OrganizationResponse;
import com.jikgorae.api.organization.domain.Organization;

public class GroupFixture {
    public static final String ORGANIZATION_NAME = "직고래";

    public static final OrganizationRequest ORGANIZATION_REQUEST = new OrganizationRequest(
            ORGANIZATION_NAME);

    public static final Organization ORGANIZATION1 = new Organization(51L, ORGANIZATION_NAME,
            "423502");
    public static final Organization ORGANIZATION2 = new Organization(51L, "우아한테크코스", "124838");

    public static final OrganizationResponse ORGANIZATION_RESPONSE1 = OrganizationResponse.of(
            ORGANIZATION1);

    public static final OrganizationResponse ORGANIZATION_RESPONSE2 = OrganizationResponse.of(
            ORGANIZATION2);
}
