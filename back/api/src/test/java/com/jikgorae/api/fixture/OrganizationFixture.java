package com.jikgorae.api.fixture;

import static com.jikgorae.api.fixture.ArticleFixture.*;

import com.jikgorae.api.articleorganization.domain.ArticleOrganization;
import com.jikgorae.api.organization.application.OrganizationRequest;
import com.jikgorae.api.organization.domain.Organization;

public class OrganizationFixture {
    public static final String ORGANIZATION_NAME = "직고래";

    public static final OrganizationRequest ORGANIZATION_REQUEST = new OrganizationRequest(
            ORGANIZATION_NAME);

    public static final Organization 직고래 = new Organization(51L, ORGANIZATION_NAME,
            "423502");
    public static final Organization 우아한테크코스 = new Organization(51L, "우아한테크코스", "124838");

    public static final ArticleOrganization ARTICLE1_직고래 = new ArticleOrganization(ARTICLE1, 직고래);

}
