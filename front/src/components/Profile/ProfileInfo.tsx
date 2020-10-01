import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil/dist";
import {
  memberProfileState,
  memberAvatarState,
  memberNicknameState,
} from "../../states/memberState";

export default function ProfileInfo() {
  const profile = useRecoilValue(memberProfileState);
  const [avatar, setAvatar] = useRecoilState(memberAvatarState);
  const [nickname, setNickname] = useRecoilState(memberNicknameState);

  useEffect(() => {
    setAvatar(profile.avatar);
    setNickname(profile.nickname);
  }, [profile]);

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: profile.avatar ? profile.avatar : undefined }}
          style={styles.avatar}
          defaultSource={require("../../../assets/user.png")}
        />
      </View>
      <View style={styles.nicknameContainer}>
        <Text style={styles.nickname}>{nickname}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarContainer: {
    aspectRatio: 1,
    width: "60%",
    height: "60%",
    marginBottom: 15,
  },
  avatar: {
    aspectRatio: 1,
    resizeMode: "cover",
    borderRadius: 100,
  },
  nicknameContainer: {},
  nickname: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
