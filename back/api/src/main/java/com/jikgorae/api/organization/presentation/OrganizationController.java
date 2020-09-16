package com.jikgorae.api.organization.presentation;

import static com.jikgorae.api.organization.presentation.OrganizationController.*;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jikgorae.api.organization.application.OrganizationRequest;
import com.jikgorae.api.organization.application.OrganizationResponse;
import com.jikgorae.api.organization.application.OrganizationService;
import com.jikgorae.api.organization.domain.Organization;

@RestController
@RequestMapping(ORGANIZATION_API_URI)
public class OrganizationController {
    public static final String ORGANIZATION_API_URI = "/api/organizations";

    private final OrganizationService organizationService;

    public OrganizationController(OrganizationService organizationService) {
        this.organizationService = organizationService;
    }

    @PostMapping
    public ResponseEntity<OrganizationResponse> create(@RequestBody OrganizationRequest request) {
        Organization organization = organizationService.create(request);

        return ResponseEntity
                .created(URI.create(ORGANIZATION_API_URI + "/" + organization.getId()))
                .body(OrganizationResponse.of(organization));
    }
}
