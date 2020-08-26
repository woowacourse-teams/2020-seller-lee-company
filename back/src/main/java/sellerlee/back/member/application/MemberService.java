package sellerlee.back.member.application;

import org.springframework.security.crypto.password.PasswordEncoder;
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
    private final PasswordEncoder passwordEncoder;

    public MemberService(MemberRepository memberRepository, JwtTokenProvider jwtTokenProvider,
            PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public Long join(MemberRequest request) {
        boolean existMember = memberRepository.existsByNickname(request.getNickname());

        if (existMember) {
            throw new IllegalJoinException("이미 회원가입이 되어있는 닉네임입니다.");
        }

        return memberRepository.save(request.toEntityWithPasswordEncode(passwordEncoder)).getId();
    }

    public String login(LoginRequest request) {
        Member findMember = memberRepository.findOptionalMemberByNickname(request.getNickname())
                .orElseThrow(() -> new IllegalLoginException("닉네임이 일치하는 회원이 존재하지 않습니다."));

        if (!findMember.verify(passwordEncoder, request.getPassword())) {
            throw new IllegalLoginException("비밀번호가 일치하지 않습니다.");
        }

        return jwtTokenProvider.createToken(request.getNickname());
    }

    @Transactional
    public void update(Member loginMember, ProfileRequest request) {
        Member member = memberRepository.findById(loginMember.getId())
                .orElseThrow(() -> new IllegalArgumentException("ID가 일치하는 회원이 존재하지 않습니다."));

        member.update(request.toMemberWithPasswordEncode(passwordEncoder));
    }
}
