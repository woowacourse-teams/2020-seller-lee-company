/**
 * @author lxxjn0
 */

package sellerlee.back.member.presentation;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import sellerlee.back.member.application.MemberLoginRequest;
import sellerlee.back.member.application.MemberService;

@RestController
public class MemberController {
    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping("/login")
    public ResponseEntity<Void> login(@RequestBody MemberLoginRequest request) {
        memberService.login(request);

        return ResponseEntity
                .ok()
                .build();
    }
}
