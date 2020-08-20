import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import TeaserImageSlider from "../components/teaser/TeaserImageSlider";
import { useNavigation } from "@react-navigation/native";
import { TeaserScreenNavigationProp } from "../types/types";
import { DeviceStorage } from "../auth/DeviceStorage";

export default function TeaserScreen() {
  const navigation = useNavigation<TeaserScreenNavigationProp>();

  useEffect(() => {
    DeviceStorage.getToken().then((data) => {
      if (data !== null) {
        navigation.navigate("BottomTabNavigation");
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <TeaserImageSlider />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
