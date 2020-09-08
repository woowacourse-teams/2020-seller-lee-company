import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil/dist";
import {
  memberInfoAvatarState,
  memberProfileState,
} from "../../states/memberState";

export default function ProfileInfo() {
  const profile = useRecoilValue(memberProfileState);
  const [avatar, setAvatar] = useRecoilState(memberInfoAvatarState);

  useEffect(() => {
    setAvatar(profile.avatar);
  }, [profile]);

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: avatar }}
          style={styles.avatar}
          defaultSource={require("../../../assets/user.png")}
        />
      </View>
      <View style={styles.nicknameContainer}>
        <Text style={styles.nickname}>{profile.nickname}</Text>
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
