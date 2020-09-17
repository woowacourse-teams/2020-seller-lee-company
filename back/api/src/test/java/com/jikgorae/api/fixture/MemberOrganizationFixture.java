package com.jikgorae.api.fixture;

import static com.jikgorae.api.fixture.GroupFixture.*;
import static com.jikgorae.api.fixture.MemberFixture.*;

import com.jikgorae.api.memberOrganization.application.MemberOrganizationRequest;
import com.jikgorae.api.memberOrganization.domain.MemberOrganization;

public class MemberOrganizationFixture {
    public static MemberOrganizationRequest MEMBER_ORGANIZATION_REQUEST = new MemberOrganizationRequest(
            ORGANIZATION1.getCode());

    public static MemberOrganization MEMBER_ORGANIZATION1 = new MemberOrganization(51L, MEMBER1,
            ORGANIZATION1);
}
