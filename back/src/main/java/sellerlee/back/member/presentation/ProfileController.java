package sellerlee.back.member.presentation;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import sellerlee.back.member.application.MemberService;
import sellerlee.back.member.application.ProfileRequest;
import sellerlee.back.member.application.ProfileResponse;
import sellerlee.back.member.domain.Member;
import sellerlee.back.security.core.LoginMember;

@RestController
public class ProfileController {
    public static final String PROFILE_URI = "/me";

    private final MemberService memberService;

    public ProfileController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping(PROFILE_URI)
    public ResponseEntity<ProfileResponse> show(@LoginMember Member loginMember) {
        return ResponseEntity.ok(ProfileResponse.of(loginMember));
    }

    @PutMapping(PROFILE_URI)
    public ResponseEntity<Void> update(@LoginMember Member loginMember,
            @RequestBody ProfileRequest request) {
        memberService.update(loginMember, request);
        return ResponseEntity.noContent().build();
    }
}
