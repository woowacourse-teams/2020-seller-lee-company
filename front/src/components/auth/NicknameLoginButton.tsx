import React, { useLayoutEffect } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import theme from "../../colors";
import { useNavigation } from "@react-navigation/native";
import { AuthScreenNavigationProp } from "../../types/types";
import { HeaderBackButton } from "@react-navigation/stack";
import { EvilIcons } from "@expo/vector-icons";

export default function NicknameLoginButton() {
  const navigation = useNavigation<AuthScreenNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerTransparent: true,
      headerLeft: () => (
        <HeaderBackButton
          labelVisible={false}
          onPress={navigation.goBack}
          backImage={() => (
            <EvilIcons name="chevron-left" size={24} color="black" />
          )}
        />
      ),
      headerLeftContainerStyle: { paddingLeft: 15 },
    });
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("LoginScreen")}
    >
      <Text style={styles.title}>닉네임으로 로그인하기</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    aspectRatio: 7,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  title: {
    fontSize: 12,
    color: theme.primary,
  },
});
