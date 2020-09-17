package com.jikgorae.api.fixture;

import static com.jikgorae.api.fixture.ArticleFixture.*;

import com.jikgorae.api.articleorganization.domain.ArticleOrganization;
import com.jikgorae.api.organization.domain.Organization;

public class OrganizationFixture {
    public static final Organization SELLERLEE_CO = new Organization(1L, "셀러리 컴퍼니", "123456");
    public static final Organization WOOWA_COURSE = new Organization(2L, "우아한테크코스", "439203");
    public static final Organization HANSUNG_UNIV = new Organization(3L, "한성대학교", "200100");

    public static final ArticleOrganization ARTICLE1_SELLERLEE_CO = new ArticleOrganization(ARTICLE1,  SELLERLEE_CO);
}