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
        <Text style={styles.nickname}>{profile.nickname}님, 안녕하세요!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 30,
  },
  avatarContainer: { flex: 1 },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  infoContainer: {
    flex: 4,
    paddingTop: 10,
    paddingLeft: 15,
  },
  nickname: {
    fontSize: 30,
  },
});
