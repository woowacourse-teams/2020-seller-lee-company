package sellerlee.back.fixture;

import sellerlee.back.member.application.LoginRequest;
import sellerlee.back.member.application.MemberRequest;
import sellerlee.back.member.application.ProfileRequest;
import sellerlee.back.member.domain.Member;
import sellerlee.back.member.domain.State;

public class MemberFixture {
    private static final String MEMBER_CHANGE_NICKNAME = "turtle";
    private static final String MEMBER_CHANGE_AVATAR = "https://avatars2.githubusercontent.com/u/39271364?s=460&u=be1f013910aa0af5338022bd65811e0204746f9a&v=4";

    public static final Member MEMBER1 =
            new Member(
                    51L,
                    "51L",
                    "lxxjn0",
                    "https://avatars1.githubusercontent.com/u/48052622?s=400&u=a6aefc01e1ed6d8407e868a66227716d1813182b&v=4",
                    null,
                    null,
                    State.JOIN,
                    8.0);

    public static final Member MEMBER2 =
            new Member(
                    52L,
                    "52L",
                    "begaonnuri",
                    "https://avatars2.githubusercontent.com/u/39271364?s=400&u=be1f013910aa0af5338022bd65811e0204746f9a&v=4",
                    null,
                    null,
                    State.JOIN,
                    5.0);

    public static final ProfileRequest PROFILE_REQUEST = new ProfileRequest(MEMBER_CHANGE_NICKNAME,
            MEMBER_CHANGE_AVATAR);
}
