package sellerlee.back.fixture;

import sellerlee.back.member.application.MemberLoginRequest;
import sellerlee.back.member.domain.Member;

public class MemberFixture {
    private static final String MEMBER_EMAIL = "sellerlee@gmail.com";
    private static final String MEMBER_PASSWORD = "1234";
    private static final String MEMBER_NICKNAME = "testNickname";
    private static final String MEMBER_AVATAR = "testUri";
    private static final double MEMBER_SCORE = 4.5;

    public static final MemberLoginRequest INVALID_PASSWORD_MEMBER_LOGIN_REQUEST_FIXTURE =
            new MemberLoginRequest(
                    MEMBER_EMAIL,
                    "0000"
            );

    public static final MemberLoginRequest MEMBER_LOGIN_REQUEST_FIXTURE =
            new MemberLoginRequest(
                    MEMBER_EMAIL,
                    MEMBER_PASSWORD
            );

    public static final MemberLoginRequest INVALID_EMAIL_MEMBER_LOGIN_REQUEST_FIXTURE =
            new MemberLoginRequest(
                    "sellerlee@hello.com",
                    MEMBER_PASSWORD
            );

    public static final Member MEMBER1 =
            new Member(
                    51L,
                    "turtle@woowabro.com",
                    MEMBER_PASSWORD,
                    MEMBER_NICKNAME,
                    MEMBER_AVATAR,
                    MEMBER_SCORE);

    public static final Member MEMBER2 =
            new Member(
                    52L,
                    "lxxjn0@gmail.com",
                    MEMBER_PASSWORD,
                    MEMBER_NICKNAME,
                    MEMBER_AVATAR,
                    MEMBER_SCORE);
}
