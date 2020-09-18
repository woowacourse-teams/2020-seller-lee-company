package com.jikgorae.api.memberOrganization.application;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.jikgorae.api.member.domain.Member;
import com.jikgorae.api.memberOrganization.domain.MemberOrganization;
import com.jikgorae.api.memberOrganization.domain.MemberOrganizationRepository;
import com.jikgorae.api.organization.domain.Organization;
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

    @Transactional
    public Long register(Member loginMember, MemberOrganizationRequest request) {
        Organization organization = organizationRepository.findOptionalByCode(request.getCode())
                .orElseThrow(() -> new IllegalArgumentException("입장 코드와 일치하는 조직이 존재하지 않습니다."));
        Optional<MemberOrganization> memberOrganization = memberOrganizationRepository.findOptionalByMemberAndOrganization(
                loginMember, organization);

        if (memberOrganization.isPresent()) {
            return memberOrganization.get().getId();
        }

        MemberOrganization persistMemberOrganization = memberOrganizationRepository.save(
                new MemberOrganization(loginMember, organization));
        return persistMemberOrganization.getId();
    }
}
