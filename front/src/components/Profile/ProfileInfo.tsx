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
        <Image style={styles.avatar} source={{ uri: avatar }} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.nickname}>{profile.nickname}님,</Text>
        <Text style={styles.nickname}>안녕하세요!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 30,
    paddingHorizontal: 50,
  },
  avatarContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 100,
  },
  infoContainer: {
    flex: 4,
    paddingLeft: 30,
  },
  nickname: {
    fontSize: 22,
  },
});
