package com.jikgorae.api.fixture;

import com.jikgorae.api.member.application.ProfileRequest;
import com.jikgorae.api.member.domain.Member;

public class MemberFixture {
    private static final String MEMBER_CHANGE_PASSWORD = "1111";
    private static final String MEMBER_CHANGE_AVATAR = "https://avatars2.githubusercontent.com/u/39271364?s=460&u=be1f013910aa0af5338022bd65811e0204746f9a&v=4";

    public static final Member MEMBER1 =
            new Member(
                    51L,
                    "51L",
                    "lxxjn0",
                    "https://avatars1.githubusercontent.com/u/48052622?s=400&u=a6aefc01e1ed6d8407e868a66227716d1813182b&v=4",
                    "ROLE_USER",
                    8.0,
                    "ExponentPushToken[1234567-12345678901234]"
            );

    public static final Member MEMBER2 =
            new Member(
                    52L,
                    "52L",
                    "begaonnuri",
                    "https://avatars2.githubusercontent.com/u/39271364?s=400&u=be1f013910aa0af5338022bd65811e0204746f9a&v=4",
                    "ROLE_USER",
                    5.0,
                    "ExponentPushToken[1234567-12345678901234]"
            );

    public static final ProfileRequest PROFILE_REQUEST = new ProfileRequest(MEMBER_CHANGE_PASSWORD,
            MEMBER_CHANGE_AVATAR);
}
