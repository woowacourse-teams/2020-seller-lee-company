/**
 * @author lxxjn0
 */

import React, { useLayoutEffect } from "react";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthScreenNavigationProp } from "../types/types";
import MemberLogin from "../components/Member/MemberLogin";
import MemberJoin from "../components/Member/MemberJoin";

export default function ProfileScreen() {
  const navigation = useNavigation<AuthScreenNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.memberLoginContainer}>
        <MemberLogin />
      </View>
      <View style={styles.memberJoinContainer}>
        <MemberJoin />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  memberLoginContainer: {
    flex: 1,
    backgroundColor: "red",
  },
  memberJoinContainer: {
    flex: 2,
    backgroundColor: "blue",
  },
});
