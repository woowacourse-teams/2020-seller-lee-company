package com.jikgorae.api.member.presentation;

import static com.jikgorae.api.member.presentation.ProfileController.*;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.jikgorae.api.member.application.MemberService;
import com.jikgorae.api.member.application.ProfileRequest;
import com.jikgorae.api.member.application.ProfileResponse;
import com.jikgorae.common.member.domain.Member;
import com.jikgorae.common.security.core.LoginMember;

@RestController
@RequestMapping(PROFILE_API_URI)
public class ProfileController {
    public static final String PROFILE_API_URI = "/api/me";

    private final MemberService memberService;

    public ProfileController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping
    public ResponseEntity<ProfileResponse> show(@LoginMember Member loginMember) {
        return ResponseEntity.ok(ProfileResponse.of(loginMember));
    }

    @PutMapping
    public ResponseEntity<Void> update(@LoginMember Member loginMember,
            @RequestBody ProfileRequest request) throws JsonProcessingException {
        memberService.update(loginMember, request);

        return ResponseEntity.noContent().build();
    }
}
