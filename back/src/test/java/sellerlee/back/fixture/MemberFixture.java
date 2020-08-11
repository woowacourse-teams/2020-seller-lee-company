package sellerlee.back.fixture;

import sellerlee.back.member.application.LoginRequest;
import sellerlee.back.member.domain.Member;

public class MemberFixture {
    private static final String MEMBER_EMAIL = "lxxjn0@woowabro.com";
    private static final String MEMBER_PASSWORD = "1234";
    private static final String MEMBER_NICKNAME = "lxxjn0";
    private static final String MEMBER_AVATAR = "https://avatars1.githubusercontent.com/u/48052622?s=400&u=a6aefc01e1ed6d8407e868a66227716d1813182b&v=4";
    private static final double MEMBER_SCORE = 4.0;

    public static final LoginRequest INVALID_PASSWORD_MEMBER_LOGIN_REQUEST_FIXTURE =
            new LoginRequest(
                    MEMBER_EMAIL,
                    "0000"
            );

    public static final LoginRequest MEMBER_LOGIN_REQUEST_FIXTURE =
            new LoginRequest(
                    MEMBER_EMAIL,
                    MEMBER_PASSWORD
            );

    public static final LoginRequest INVALID_EMAIL_MEMBER_LOGIN_REQUEST_FIXTURE =
            new LoginRequest(
                    "sellerlee@hello.com",
                    MEMBER_PASSWORD
            );

    public static final Member MEMBER1 =
            new Member(
                    51L,
                    "lxxjn0@woowabro.com",
                    MEMBER_PASSWORD,
                    MEMBER_NICKNAME,
                    MEMBER_AVATAR,
                    MEMBER_SCORE);

    public static final Member MEMBER2 =
            new Member(
                    52L,
                    "begaonnuri@woowabro.com",
                    "0000",
                    "begaonnuri",
                    "https://avatars2.githubusercontent.com/u/39271364?s=400&u=be1f013910aa0af5338022bd65811e0204746f9a&v=4",
                    5.0);
}
