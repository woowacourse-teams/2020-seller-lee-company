package com.jikgorae.api.fixture;

import static com.jikgorae.api.fixture.MemberFixture.*;
import static com.jikgorae.api.fixture.OrganizationFixture.*;

import com.jikgorae.api.memberOrganization.application.MemberOrganizationRequest;
import com.jikgorae.api.memberOrganization.domain.MemberOrganization;

public class MemberOrganizationFixture {
    public static MemberOrganizationRequest MEMBER_직고래_REQUEST = new MemberOrganizationRequest(
            직고래.getCode());

    public static MemberOrganization MEMBER_직고래 = new MemberOrganization(51L, MEMBER1,
            직고래);
}
