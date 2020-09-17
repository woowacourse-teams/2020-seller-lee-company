package com.jikgorae.api.memberOrganization.application;

import org.springframework.stereotype.Service;

import com.jikgorae.api.memberOrganization.domain.MemberOrganizationRepository;

@Service
public class MemberOrganizationService {
    private final MemberOrganizationRepository memberOrganizationRepository;

    public MemberOrganizationService(MemberOrganizationRepository memberOrganizationRepository) {
        this.memberOrganizationRepository = memberOrganizationRepository;
    }
}
