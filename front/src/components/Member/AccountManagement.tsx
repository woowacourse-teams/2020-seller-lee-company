/**
 * @author lxxjn0
 */

import React from "react";
import { StyleSheet, View } from "react-native";
import MemberJoin from "./MemberJoin";
import FindPassword from "./FindPassword";
import theme from "../../colors";

export default function AccountManagement() {
  return (
    <View style={styles.container}>
      <View style={styles.memberJoinContainer}>
        <MemberJoin />
      </View>
      <View style={styles.findPasswordContainer}>
        <FindPassword />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 30,
    justifyContent: "center",
  },
  memberJoinContainer: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderRightColor: theme.border,
  },
  findPasswordContainer: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
