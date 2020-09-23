package com.jikgorae.api.member.presentation;

import static com.jikgorae.api.member.presentation.AuthController.*;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jikgorae.api.member.application.MemberService;
import com.jikgorae.api.member.application.PushTokenRequest;
import com.jikgorae.api.member.domain.Member;
import com.jikgorae.api.security.core.LoginMember;

@RestController
@RequestMapping(MEMBER_API_URI)
public class AuthController {
    public static final String MEMBER_API_URI = "/api/members";

    private final MemberService memberService;

    public AuthController(MemberService memberService) {
        this.memberService = memberService;
    }

    // TODO: 2020/09/14 반환을 Boolean으로만 하지 말고 객체(Dto)로 감싸서 보내도록 수정
    @GetMapping
    public ResponseEntity<Boolean> findNickname(@RequestParam String nickname) {
        return ResponseEntity.ok(memberService.findNickname(nickname));
    }

    @PutMapping
    public ResponseEntity<Void> updatePushToken(@LoginMember Member loginMember,
            @RequestBody PushTokenRequest request) {
        memberService.updatePushToken(loginMember, request);
        return ResponseEntity.noContent().build();
    }
}
