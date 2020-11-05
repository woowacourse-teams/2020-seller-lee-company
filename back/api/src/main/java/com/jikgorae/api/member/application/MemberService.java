package com.jikgorae.api.member.application;

import static com.jikgorae.api.member.domain.IllegalProfileException.*;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jikgorae.api.member.domain.IllegalProfileException;
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
        if (!loginMember.isSameNickname(request.getNickname()) && isPresentMember(
                request.getNickname())) {
            throwUpdateException(loginMember);
        }
        loginMember.update(request.getNickname(), request.getAvatar());
    }

    public boolean isPresentMember(String verifyNickname) {
        return memberRepository.findOptionalMemberByNickname(verifyNickname).isPresent();
    }

    private void throwUpdateException(Member loginMember) {
        if (loginMember.hasNotNickname()) {
            throw new IllegalProfileException(DUPLICATED_NAME_TO_JOIN);
        }
        throw new IllegalProfileException(DUPLICATED_NAME_TO_UPDATE);
    }

    @Transactional
    public void updatePushToken(Member loginMember, PushTokenRequest request) {
        loginMember.updatePushToken(request.getPushToken());
    }
}
