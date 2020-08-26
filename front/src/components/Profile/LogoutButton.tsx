import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ProfileScreenNavigationProp } from "../../types/types";
import { SimpleLineIcons } from "@expo/vector-icons";
import { DeviceStorage } from "../../auth/DeviceStorage";

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
      <SimpleLineIcons name="logout" size={24} color="black" />
      <TouchableOpacity onPress={onPressLogoutButton}>
        <Text style={styles.title}>로그아웃</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingLeft: 12,
    padding: 15,
  },
  title: {
    paddingLeft: 13,
    fontSize: 20,
  },
});
