package com.jikgorae.api.organization.application;

import static com.jikgorae.api.organization.exception.OrganizationAlreadyExistsException.*;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.jikgorae.api.organization.domain.Organization;
import com.jikgorae.api.organization.domain.OrganizationCodeGenerator;
import com.jikgorae.api.organization.domain.OrganizationRepository;
import com.jikgorae.api.organization.exception.OrganizationAlreadyExistsException;

@Service
public class OrganizationService {
    private final OrganizationRepository organizationRepository;
    private final OrganizationCodeGenerator organizationCodeGenerator;

    public OrganizationService(OrganizationRepository organizationRepository,
            OrganizationCodeGenerator organizationCodeGenerator) {
        this.organizationRepository = organizationRepository;
        this.organizationCodeGenerator = organizationCodeGenerator;
    }

    @Transactional
    public Organization create(OrganizationRequest request) {
        String groupName = request.getName();

        if (organizationRepository.existsByName(request.getName())) {
            throw new OrganizationAlreadyExistsException(ALREADY_EXISTS_ORGANIZATION_NAME);
        }

        return organizationRepository.save(new Organization(groupName, generateCode()));
    }

    private String generateCode() {
        String code;
        do {
            code = organizationCodeGenerator.generate();
            System.out.println(code);
        } while (organizationRepository.existsByCode(code));
        return code;
    }
}
