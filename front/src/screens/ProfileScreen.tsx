import React, { useEffect, useLayoutEffect } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ProfileScreenNavigationProp } from "../types/types";
import ProfileInfo from "../components/Profile/ProfileInfo";
import SalesHistory from "../components/Profile/SalesHistory";
import PurchaseHistory from "../components/Profile/PurchaseHistory";
import MyFavorite from "../components/Profile/MyFavorite";
import MyInfoButton from "../components/Profile/MyInfoButton";
import { profileAPI } from "../api/api";
import { useSetRecoilState } from "recoil/dist";
import { memberProfileState } from "../states/memberState";

export default function ProfileScreen() {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const setProfile = useSetRecoilState(memberProfileState);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const { data } = await profileAPI.get();
    setProfile(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.infoContainer}>
        <ProfileInfo />
      </View>
      <View style={styles.historyContainer}>
        <SalesHistory />
        <PurchaseHistory />
      </View>
      <View style={styles.listContainer}>
        <MyInfoButton />
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
  listContainer: {
    flex: 5,
    paddingHorizontal: 30,
  },
  historyContainer: {
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
});
