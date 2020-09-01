package sellerlee.back.member.presentation;

import static sellerlee.back.member.presentation.AuthController.*;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import sellerlee.back.member.application.MemberService;

@RestController
@RequestMapping(API)
public class AuthController {
    public static final String MEMBER_URI = "/members";
    public static final String LOGIN_NOT_OAUTH_URI = "/login/not-oauth";
    public static final String API = "/api";

    private final MemberService memberService;

    public AuthController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping(value = MEMBER_URI, params = "nickname")
    public ResponseEntity<Boolean> verifyNickname(@RequestParam String nickname) {
        return ResponseEntity.ok(memberService.findNickname(nickname));
    }
}
