package com.jikgorae.api.memberOrganization.presentation;

import static com.jikgorae.api.memberOrganization.presentation.MemberOrganizationController.*;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jikgorae.api.memberOrganization.application.MemberOrganizationRequest;
import com.jikgorae.api.memberOrganization.application.MemberOrganizationService;

@RestController
@RequestMapping(MEMBER_ORGANIZATION_API_URI)
public class MemberOrganizationController {
    public static final String MEMBER_ORGANIZATION_API_URI = "/api/member-organizations";

    private final MemberOrganizationService memberOrganizationService;

    public MemberOrganizationController(MemberOrganizationService memberOrganizationService) {
        this.memberOrganizationService = memberOrganizationService;
    }

    @PostMapping
    public ResponseEntity<Void> create(@RequestBody MemberOrganizationRequest request) {
        Long memberOrganizationId = memberOrganizationService.create(request);

        return ResponseEntity
                .created(URI.create(MEMBER_ORGANIZATION_API_URI + "/" + memberOrganizationId))
                .build();
    }
}
