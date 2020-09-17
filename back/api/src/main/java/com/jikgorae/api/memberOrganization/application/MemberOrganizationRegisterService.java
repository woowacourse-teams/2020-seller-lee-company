package com.jikgorae.api.memberOrganization.application;

import org.springframework.stereotype.Service;

import com.jikgorae.api.member.domain.Member;
import com.jikgorae.api.memberOrganization.domain.MemberOrganizationRepository;
import com.jikgorae.api.organization.domain.OrganizationRepository;

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

    public Long register(Member loginMember, MemberOrganizationRequest request) {
        
    }
}
