/**
 * @author lxxjn0
 */

package sellerlee.back.member.presentation;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import sellerlee.back.member.application.LoginRequest;
import sellerlee.back.member.application.MemberService;
import sellerlee.back.member.application.TokenResponse;
import sellerlee.back.security.web.AuthorizationType;

@RestController
public class AuthController {
    private final MemberService memberService;

    public AuthController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@RequestBody LoginRequest request) {
        String token = memberService.login(request);

        return ResponseEntity
                .ok()
                .body(TokenResponse.of(token, AuthorizationType.BEARER));
    }
}
