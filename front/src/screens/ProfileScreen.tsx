import React, { useLayoutEffect } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ProfileScreenNavigationProp } from "../types/types";
import ProfileInfo from "../components/Profile/ProfileInfo";
import SalesHistory from "../components/Profile/SalesHistory";
import PurchaseHistory from "../components/Profile/PurchaseHistory";
import MyFavorite from "../components/Profile/MyFavorite";

export default function ProfileScreen() {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.infoContainer}>
        <ProfileInfo />
      </View>
      <View style={styles.historyContainer}>
        <SalesHistory />
        <PurchaseHistory />
      </View>
      <View style={styles.favoriteContainer}>
        <MyFavorite />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoContainer: {
    flex: 1,
  },
  favoriteContainer: {
    flex: 5,
  },
  historyContainer: {
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
});
