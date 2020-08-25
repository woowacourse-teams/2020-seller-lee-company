import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../colors";
import { useRecoilValue } from "recoil/dist";
import { memberInfoAvatarState } from "../../states/memberState";

export default function MyInfoAvatar() {
  const avatar = useRecoilValue(memberInfoAvatarState);

  return (
    <View style={styles.container}>
      <Image style={styles.avatar} source={{ uri: avatar }} />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>사진 변경</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  button: {
    marginTop: 10,
  },
  text: {
    color: colors.primary,
  },
});
