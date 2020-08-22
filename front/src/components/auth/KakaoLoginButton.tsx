import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DeviceStorage } from "../../auth/DeviceStorage";

export default function KakaoLoginButton() {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => DeviceStorage.getToken().then((data) => console.log(data))}
    >
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../assets/KakaoTalk_logo.png")}
          style={styles.image}
          resizeMode={"contain"}
        />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>카카오톡으로 시작하기</Text>
      </View>
      <View style={styles.imageContainer} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f4de12",
    aspectRatio: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 100,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  imageContainer: {
    aspectRatio: 1,
    padding: 15,
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
