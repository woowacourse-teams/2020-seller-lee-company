package com.jikgorae.api.fixture;

import static com.jikgorae.api.fixture.ArticleFixture.*;

import com.jikgorae.api.articleorganization.domain.ArticleOrganization;
import com.jikgorae.api.organization.application.OrganizationRequest;
import com.jikgorae.api.organization.domain.Organization;

public class OrganizationFixture {
    public static final String 직고래_NAME = "직고래";
    public static final String 우아한테크코스_NAME = "우아한테크코스";

    public static final OrganizationRequest 직고래_REQUEST = new OrganizationRequest(
            직고래_NAME);
    public static final OrganizationRequest 우아한테크코스_REQUEST = new OrganizationRequest(
            우아한테크코스_NAME);
    public static final OrganizationRequest 배달의민족_REQUEST = new OrganizationRequest(
            "배달의민족");
    public static final Organization 직고래 = new Organization(51L, 직고래_NAME,
            "423502");
    public static final Organization 우아한테크코스 = new Organization(52L, "우아한테크코스", "124838");

    public static final ArticleOrganization ARTICLE1_직고래 = new ArticleOrganization(ARTICLE1, 직고래);

}
