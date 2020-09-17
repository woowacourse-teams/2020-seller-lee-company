package com.jikgorae.api.member.presentation;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.jikgorae.api.member.application.MemberService;
import com.jikgorae.api.member.application.ProfileRequest;
import com.jikgorae.api.member.application.ProfileResponse;
import com.jikgorae.api.member.domain.Member;
import com.jikgorae.api.security.core.LoginMember;

@RestController
public class ProfileController {
    public static final String PROFILE_API_URI = "/api/me";
    public static final String JOIN = "/join";

    private final MemberService memberService;

    public ProfileController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping({PROFILE_API_URI, JOIN})
    public ResponseEntity<ProfileResponse> show(@LoginMember Member loginMember) {
        return ResponseEntity.ok(ProfileResponse.of(loginMember));
    }

    @PutMapping(PROFILE_API_URI)
    public ResponseEntity<Void> update(@LoginMember Member loginMember,
            @RequestBody ProfileRequest request) {
        memberService.update(loginMember, request);

        return ResponseEntity.noContent().build();
    }
}
