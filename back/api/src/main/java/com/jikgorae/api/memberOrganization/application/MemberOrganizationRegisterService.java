package com.jikgorae.api.memberOrganization.application;

import static com.jikgorae.api.memberOrganization.exception.MemberOrganizationAlreadyExistsException.*;
import static com.jikgorae.api.organization.exception.OrganizationNotFoundException.*;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jikgorae.api.member.domain.Member;
import com.jikgorae.api.memberOrganization.domain.MemberOrganization;
import com.jikgorae.api.memberOrganization.domain.MemberOrganizationRepository;
import com.jikgorae.api.memberOrganization.exception.MemberOrganizationAlreadyExistsException;
import com.jikgorae.api.organization.domain.Organization;
import com.jikgorae.api.organization.domain.OrganizationRepository;
import com.jikgorae.api.organization.exception.OrganizationNotFoundException;

@Service
public class MemberOrganizationRegisterService {
    private final MemberOrganizationRepository memberOrganizationRepository;
    private final OrganizationRepository organizationRepository;

    public MemberOrganizationRegisterService(
            MemberOrganizationRepository memberOrganizationRepository,
            OrganizationRepository organizationRepository) {
        this.memberOrganizationRepository = memberOrganizationRepository;
        this.organizationRepository = organizationRepository;
    }

    @Transactional
    public Long register(Member loginMember, MemberOrganizationRequest request) {
        Organization organization = organizationRepository.findOptionalByCode(request.getCode())
                .orElseThrow(() -> new OrganizationNotFoundException(ILLEGAL_ORGANIZATION_CODE));

        if (memberOrganizationRepository.existsByMemberAndOrganization(loginMember, organization)) {
            throw new MemberOrganizationAlreadyExistsException(ALREADY_JOINT_ORGANIZATION);
        }

        return memberOrganizationRepository.save(new MemberOrganization(loginMember, organization))
                .getId();
    }
}
