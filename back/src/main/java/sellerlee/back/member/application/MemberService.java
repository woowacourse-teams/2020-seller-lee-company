package sellerlee.back.member.application;

import org.springframework.stereotype.Service;

import sellerlee.back.member.domain.IllegalMemberLoginException;
import sellerlee.back.member.domain.Member;
import sellerlee.back.member.domain.MemberRepository;

@Service
public class MemberService {
    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public void login(MemberLoginRequest request) {
        Member findMember = memberRepository.findMemberByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalMemberLoginException("이메일이 일치하는 회원이 존재하지 않습니다."));

        if (!findMember.verify(request.getPassword())) {
            throw new IllegalMemberLoginException("비밀번호가 일치하지 않습니다.");
        }
    }
}
