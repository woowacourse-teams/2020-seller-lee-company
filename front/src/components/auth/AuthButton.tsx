import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TeaserScreenNavigationProp } from "../../types/types";
import { Entypo } from "@expo/vector-icons";
import colors from "../../colors";
import { DeviceStorage } from "../../auth/DeviceStorage";

export default function AuthButton() {
  const navigation = useNavigation<TeaserScreenNavigationProp>();

  const onPressButton = async () => {
    const response = await DeviceStorage.getToken();

    if (response !== null) {
      navigation.navigate("BottomTabNavigation");
    } else {
      navigation.navigate("AuthScreen");
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPressButton}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>시작하기</Text>
        <Entypo name="controller-play" size={14} color={"white"} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 2.6,
    backgroundColor: colors.others,
    justifyContent: "center",
    borderRadius: 100,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginHorizontal: 5,
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
