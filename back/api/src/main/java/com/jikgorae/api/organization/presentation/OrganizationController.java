package com.jikgorae.api.organization.presentation;

import static com.jikgorae.api.organization.presentation.OrganizationController.*;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jikgorae.api.member.domain.Member;
import com.jikgorae.api.organization.application.OrganizationRequest;
import com.jikgorae.api.organization.application.OrganizationResponse;
import com.jikgorae.api.organization.application.OrganizationService;
import com.jikgorae.api.organization.domain.Organization;
import com.jikgorae.api.organization.query.OrganizationQueryRepository;
import com.jikgorae.api.security.core.LoginMember;

@RestController
@RequestMapping(ORGANIZATION_API_URI)
public class OrganizationController {
    public static final String ORGANIZATION_API_URI = "/api/organizations";

    private final OrganizationService organizationService;
    private final OrganizationQueryRepository organizationQueryRepository;

    public OrganizationController(OrganizationService organizationService,
            OrganizationQueryRepository organizationQueryRepository) {
        this.organizationService = organizationService;
        this.organizationQueryRepository = organizationQueryRepository;
    }

    @GetMapping
    public ResponseEntity<List<OrganizationResponse>> showAll(@LoginMember Member loginMember) {
        List<OrganizationResponse> responses = organizationQueryRepository.showAll(loginMember);

        return ResponseEntity
                .ok()
                .body(responses);
    }

    @PostMapping
    public ResponseEntity<OrganizationResponse> create(@RequestBody OrganizationRequest request) {
        Organization organization = organizationService.create(request);

        return ResponseEntity
                .created(URI.create(ORGANIZATION_API_URI + "/" + organization.getId()))
                .body(OrganizationResponse.of(organization));
    }
}
