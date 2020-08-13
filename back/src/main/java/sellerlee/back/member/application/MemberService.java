/**
 * @author lxxjn0
 */

package sellerlee.back.member.application;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sellerlee.back.member.domain.IllegalJoinException;
import sellerlee.back.member.domain.IllegalLoginException;
import sellerlee.back.member.domain.Member;
import sellerlee.back.member.domain.MemberRepository;
import sellerlee.back.security.oauth2.token.JwtTokenProvider;

@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;

    public MemberService(MemberRepository memberRepository, JwtTokenProvider jwtTokenProvider) {
        this.memberRepository = memberRepository;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Transactional
    public Long join(MemberRequest request) {
        boolean existSameMember = memberRepository.existsByEmail(request.getEmail());

        if (existSameMember) {
            throw new IllegalJoinException("이미 회원가입이 되어있는 이메일입니다.");
        }

        return memberRepository.save(request.toMember()).getId();
    }

    public String login(LoginRequest request) {
        Member findMember = memberRepository.findOptionalMemberByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalLoginException("이메일이 일치하는 회원이 존재하지 않습니다."));

        if (!findMember.verify(request.getPassword())) {
            throw new IllegalLoginException("비밀번호가 일치하지 않습니다.");
        }

        return jwtTokenProvider.createToken(request.getEmail());
    }
}
