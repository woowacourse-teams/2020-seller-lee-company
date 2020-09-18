package com.jikgorae.api.organization.query;

import static com.jikgorae.api.memberOrganization.domain.QMemberOrganization.*;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.jikgorae.api.member.domain.Member;
import com.jikgorae.api.organization.application.OrganizationResponse;
import com.jikgorae.api.organization.application.QOrganizationResponse;
import com.querydsl.jpa.impl.JPAQueryFactory;

@Repository
public class OrganizationQueryRepository {
    private final JPAQueryFactory queryFactory;

    public OrganizationQueryRepository(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    public List<OrganizationResponse> showAll(Member loginMember) {
        return queryFactory
                .select(new QOrganizationResponse(memberOrganization.organization))
                .from(memberOrganization)
                .where(memberOrganization.member.eq(loginMember))
                .fetch();
    }
}
