package com.jikgorae.api.memberOrganization.domain;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jikgorae.api.member.domain.Member;
import com.jikgorae.api.organization.domain.Organization;

public interface MemberOrganizationRepository extends JpaRepository<MemberOrganization, Long> {
    @Transactional
    void deleteByMemberAndOrganizationId(Member member, Long id);

    boolean existsByMemberAndOrganization(Member member, Organization organization);
}
