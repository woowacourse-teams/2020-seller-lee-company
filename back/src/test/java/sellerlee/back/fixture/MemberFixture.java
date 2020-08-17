package sellerlee.back.fixture;

import sellerlee.back.member.application.LoginRequest;
import sellerlee.back.member.application.MemberRequest;
import sellerlee.back.member.domain.Member;

public class MemberFixture {
    private static final String MEMBER_NICKNAME = "seller lee";
    private static final String MEMBER_PASSWORD = "0000";
    private static final String MEMBER_AVATAR = "https://avatars1.githubusercontent.com/u/48052622?s=400&u=a6aefc01e1ed6d8407e868a66227716d1813182b&v=4";
    private static final double MEMBER_SCORE = 4.0;

    public static final MemberRequest MEMBER_CREATE_REQUEST =
            new MemberRequest(
                    MEMBER_NICKNAME,
                    MEMBER_PASSWORD,
                    MEMBER_AVATAR
            );

    public static final LoginRequest MEMBER_LOGIN_REQUEST =
            new LoginRequest(
                    MEMBER_NICKNAME,
                    MEMBER_PASSWORD
            );

    public static final LoginRequest INVALID_EMAIL_MEMBER_LOGIN_REQUEST =
            new LoginRequest(
                    "lxxjn0",
                    MEMBER_PASSWORD
            );

    public static final LoginRequest INVALID_PASSWORD_MEMBER_LOGIN_REQUEST =
            new LoginRequest(
                    MEMBER_NICKNAME,
                    "1234"
            );

    public static final Member MEMBER1 =
            new Member(
                    51L,
                    "lxxjn0",
                    "1234",
                    "https://avatars1.githubusercontent.com/u/48052622?s=400&u=a6aefc01e1ed6d8407e868a66227716d1813182b&v=4",
                    8.0);

    public static final Member MEMBER2 =
            new Member(
                    52L,
                    "begaonnuri",
                    "0000",
                    "https://avatars2.githubusercontent.com/u/39271364?s=400&u=be1f013910aa0af5338022bd65811e0204746f9a&v=4",
                    5.0);
}
