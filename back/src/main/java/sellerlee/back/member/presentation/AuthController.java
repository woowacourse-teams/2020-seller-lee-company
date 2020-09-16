package sellerlee.back.member.presentation;

import static sellerlee.back.common.PageController.*;
import static sellerlee.back.member.presentation.AuthController.*;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import sellerlee.back.member.application.MemberService;

@RestController
@RequestMapping(API_URI + MEMBER_URI)
public class AuthController {
    public static final String MEMBER_URI = "/members";

    private final MemberService memberService;

    public AuthController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping
    public ResponseEntity<Boolean> findNickname(@RequestParam String nickname) {
        return ResponseEntity.ok(memberService.findNickname(nickname));
    }
}
