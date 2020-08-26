import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ProfileScreenNavigationProp } from "../types/types";
import ProfileInfo from "../components/Profile/ProfileInfo";
import SalesHistory from "../components/Profile/SalesHistory";
import PurchaseHistory from "../components/Profile/PurchaseHistory";
import MyInfoButton from "../components/Profile/MyInfoButton";
import { profileAPI } from "../api/api";
import { useSetRecoilState } from "recoil/dist";
import { memberProfileState } from "../states/memberState";
import MyFavoriteButton from "../components/Profile/MyFavoriteButton";
import LogoutButton from "../components/Profile/LogoutButton";

export default function ProfileScreen() {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const setProfile = useSetRecoilState(memberProfileState);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
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
        <MyFavoriteButton />
        <LogoutButton />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
