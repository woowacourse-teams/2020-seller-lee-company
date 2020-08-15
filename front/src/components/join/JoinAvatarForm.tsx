import React from "react";
import { StyleSheet, View } from "react-native";
import { useRecoilState } from "recoil/dist";
import { joinAvatarState } from "../../states/joinState";

export default function JoinAvatarForm() {
  const [joinAvatar, setJoinAvatar] = useRecoilState(joinAvatarState);

  return (
    <View style={styles.container}>
      <View />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
