package sellerlee.back.member.application;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.JsonProcessingException;
import sellerlee.back.member.domain.IllegalJoinException;
import sellerlee.back.member.domain.Member;
import sellerlee.back.member.domain.MemberRepository;
import sellerlee.back.member.domain.State;

@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final KakaoService kakaoService;

    public MemberService(MemberRepository memberRepository, KakaoService kakaoService) {
        this.memberRepository = memberRepository;
        this.kakaoService = kakaoService;
    }

    @Transactional
    public void update(Member loginMember, ProfileRequest request) throws JsonProcessingException {
        if (findNickname(request.getNickname())) {
            throwUpdateException(loginMember);
        }
        loginMember.update(request.getNickname(), request.getAvatar());
        kakaoService.updateProfile(loginMember);
    }

    public boolean findNickname(String verifyNickname) {
        return memberRepository.findOptionalMemberByNickname(verifyNickname).isPresent();
    }

    private void throwUpdateException(Member loginMember) {
        if (loginMember.getState().equals(State.NOT_JOIN)) {
            throw new IllegalJoinException("중복된 이름으로 회원가입 할 수 없습니다.");
        }
        throw new IllegalArgumentException("중복된 이름으로 변경할 수 없습니다.");
    }
}
