package sellerlee.back.member.presentation;

import static sellerlee.back.member.presentation.AuthController.*;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sellerlee.back.member.application.MemberService;
import sellerlee.back.member.application.MyInfoRequest;
import sellerlee.back.member.application.MyInfoResponse;
import sellerlee.back.member.domain.Member;
import sellerlee.back.security.core.LoginMember;

@RestController
@RequestMapping(MEMBER_URI)
public class LoginMemberController {
    private final MemberService memberService;

    public LoginMemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping("/me")
    public ResponseEntity<MyInfoResponse> showProfile(@LoginMember Member loginMember) {
        return ResponseEntity.ok(MyInfoResponse.of(loginMember));
    }

    @PutMapping("/me")
    public ResponseEntity<Void> updateProfile(@LoginMember Member loginMember,
            @RequestBody MyInfoRequest request) {
        memberService.updateProfile(loginMember, request);
        return ResponseEntity.noContent().build();
    }
}
