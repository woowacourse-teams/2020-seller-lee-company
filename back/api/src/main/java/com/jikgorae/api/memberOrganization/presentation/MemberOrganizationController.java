package com.jikgorae.api.memberOrganization.presentation;

import static com.jikgorae.api.memberOrganization.presentation.MemberOrganizationController.*;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jikgorae.api.member.domain.Member;
import com.jikgorae.api.memberOrganization.application.MemberOrganizationRegisterService;
import com.jikgorae.api.memberOrganization.application.MemberOrganizationRequest;
import com.jikgorae.api.memberOrganization.application.MemberOrganizationService;
import com.jikgorae.api.security.core.LoginMember;

@RestController
@RequestMapping(MEMBER_ORGANIZATION_API_URI)
public class MemberOrganizationController {
    public static final String MEMBER_ORGANIZATION_API_URI = "/api/member-organizations";

    private final MemberOrganizationService service;
    private final MemberOrganizationRegisterService registerService;

    public MemberOrganizationController(MemberOrganizationService service,
            MemberOrganizationRegisterService registerService) {
        this.service = service;
        this.registerService = registerService;
    }

    @PostMapping
    public ResponseEntity<Void> create(@LoginMember Member loginMember,
            @RequestBody MemberOrganizationRequest request) {
        Long memberOrganizationId = registerService.register(loginMember, request);

        return ResponseEntity
                .created(URI.create(MEMBER_ORGANIZATION_API_URI + "/" + memberOrganizationId))
                .build();
    }

    @DeleteMapping(params = "id")
    public ResponseEntity<Void> delete(@LoginMember Member loginMember, @RequestParam Long id) {
        service.delete(loginMember, id);

        return ResponseEntity
                .noContent()
                .build();
    }
}
