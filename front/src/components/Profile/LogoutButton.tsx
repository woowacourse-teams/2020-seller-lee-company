import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ProfileScreenNavigationProp } from "../../types/types";
import { DeviceStorage } from "../../auth/DeviceStorage";
import theme from "../../colors";

export default function LogoutButton() {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const onPressLogoutButton = async () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "TeaserScreen" }],
    });
    await DeviceStorage.clearToken();
    navigation.popToTop();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPressLogoutButton}>
        <Text style={styles.title}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "purple",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 30,
  },
  title: {
    fontSize: 18,
  },
});
