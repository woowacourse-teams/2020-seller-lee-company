/**
 * @author lxxjn0
 */

package sellerlee.back.member.presentation;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import sellerlee.back.member.application.LoginRequest;
import sellerlee.back.member.application.MemberRequest;
import sellerlee.back.member.application.MemberService;
import sellerlee.back.member.application.TokenResponse;
import sellerlee.back.member.domain.Member;
import sellerlee.back.security.core.LoginMember;
import sellerlee.back.security.web.AuthorizationType;

@RestController
public class AuthController {
    public static final String MEMBER_URI = "/members";
    public static final String LOGIN_URI = "/login";

    private final MemberService memberService;

    public AuthController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping(MEMBER_URI)
    public ResponseEntity<Void> join(@RequestBody MemberRequest request) {
        Long memberId = memberService.join(request);

        return ResponseEntity
                .created(URI.create(MEMBER_URI + "/" + memberId))
                .build();
    }

    @PostMapping(LOGIN_URI)
    public ResponseEntity<TokenResponse> login(@RequestBody LoginRequest request) {
        String token = memberService.login(request);

        return ResponseEntity
                .ok()
                .body(TokenResponse.of(token, AuthorizationType.BEARER));
    }

    @GetMapping(MEMBER_URI)
    public ResponseEntity<String> showNickname(@LoginMember Member loginMember){
        return ResponseEntity
                .ok()
                .body(loginMember.getNickname());
    }
}
