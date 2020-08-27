package sellerlee.back.member.presentation;

import static sellerlee.back.member.presentation.AuthController.*;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import sellerlee.back.member.application.MemberService;
import sellerlee.back.member.domain.Member;
import sellerlee.back.security.core.LoginMember;

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

    // //todo 안씀
    // @PostMapping(MEMBER_URI)
    // public ResponseEntity<Void> join(@RequestBody MemberRequest request) {
    //     Long memberId = memberService.join(request);
    //
    //     return ResponseEntity
    //             .created(URI.create(MEMBER_URI + "/" + memberId))
    //             .build();
    // }
    //
    // @PostMapping(LOGIN_NOT_OAUTH_URI)
    // public ResponseEntity<TokenResponse> login(@RequestBody LoginRequest request) {
    //     String token = memberService.login(request);
    //
    //     return ResponseEntity
    //             .ok()
    //             .body(TokenResponse.of(token, AuthorizationType.BEARER));
    // }
    // //todo 안씀

    @GetMapping(MEMBER_URI)
    public ResponseEntity<String> showNickname(@LoginMember Member loginMember) {
        return ResponseEntity
                .ok()
                .body(loginMember.getNickname());
    }

    @GetMapping(value = MEMBER_URI, params = "nickname")
    public ResponseEntity<Boolean> verifyNickname(@RequestParam String nickname) {
        return ResponseEntity.ok(memberService.findNickname(nickname));
    }
}
