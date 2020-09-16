package com.jikgorae.api.organization.application;

import static com.jikgorae.api.organization.domain.Organization.*;
import static java.util.stream.Collectors.*;

import java.util.List;
import java.util.Random;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.jikgorae.api.organization.domain.Organization;
import com.jikgorae.api.organization.domain.OrganizationRepository;

@Service
public class OrganizationService {
    private final OrganizationRepository organizationRepository;

    public OrganizationService(OrganizationRepository organizationRepository) {
        this.organizationRepository = organizationRepository;
    }

    @Transactional
    public Organization create(OrganizationRequest request) {
        String groupName = request.getName();
        List<Organization> organizations = organizationRepository.findAll();

        if (existsByName(organizations, groupName)) {
            throw new IllegalArgumentException("이미 존재하는 조직입니다.");
        }

        return organizationRepository.save(
                new Organization(groupName, generateDistinctCode(organizations)));
    }

    private boolean existsByName(List<Organization> organizations, String groupName) {
        return organizations.stream()
                .map(Organization::getName)
                .anyMatch(name -> name.equals(groupName));
    }

    private String generateDistinctCode(List<Organization> organizations) {
        String code = "";
        List<String> existCodes = organizations.stream()
                .map(Organization::getCode)
                .collect(toList());

        do {
            code = new Random().ints(0, 10)
                    .limit(CODE_LENGTH)
                    .mapToObj(String::valueOf)
                    .collect(joining());
        } while (existCodes.contains(code));

        return code;
    }
}
