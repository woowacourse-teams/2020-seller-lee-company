package com.jikgorae.api.member.application;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jikgorae.api.member.domain.IllegalJoinException;
import com.jikgorae.api.member.domain.Member;
import com.jikgorae.api.member.domain.MemberRepository;

@Service
public class MemberService {
    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Transactional
    public void update(Member loginMember, ProfileRequest request) {
        if (!loginMember.isSameNickname(request.getNickname()) && findNickname(
                request.getNickname())) {
            throwUpdateException(loginMember);
        }
        loginMember.update(request.getNickname(), request.getAvatar());
    }

    public boolean findNickname(String verifyNickname) {
        return memberRepository.findOptionalMemberByNickname(verifyNickname).isPresent();
    }

    private void throwUpdateException(Member loginMember) {
        if (loginMember.getNickname() == null || loginMember.getNickname().length() == 0) {
            throw new IllegalJoinException("중복된 이름으로 회원가입 할 수 없습니다.");
        }
        throw new IllegalArgumentException("중복된 이름으로 변경할 수 없습니다.");
    }

    @Transactional
    public void updatePushToken(Member loginMember, PushTokenRequest request) {
        loginMember.updatePushToken(request.getPushToken());
    }
}
