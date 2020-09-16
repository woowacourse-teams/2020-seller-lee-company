import React, { useEffect } from "react";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { HomeStackParam, RootStackParam } from "../types/types";
import ProfileInfo from "../components/Profile/ProfileInfo";
import SalesHistory from "../components/Profile/SalesHistory";
import PurchaseHistory from "../components/Profile/PurchaseHistory";
import { profileAPI } from "../api/api";
import { useSetRecoilState } from "recoil/dist";
import { memberProfileState } from "../states/memberState";
import MyFavoriteButton from "../components/Profile/MyFavoriteButton";
import theme from "../colors";
import ProfileMenu from "../components/Profile/ProfileMenu";
import { StackNavigationProp } from "@react-navigation/stack";

type ProfileScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParam, "ProfileScreen">,
  StackNavigationProp<RootStackParam, "HomeStack">
>;

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
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Profile</Text>
        {/*<Text style={styles.description}>*/}
        {/*  게시글과 개인 정보를 관리하는 곳입니다.*/}
        {/*</Text>*/}
        <ProfileMenu />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.infoContainer}>
          <ProfileInfo />
        </View>
        <View style={styles.listTitleContainer}>
          <Text style={styles.listTitle}>게시글 관리</Text>
        </View>
        <View style={styles.listContainer}>
          <View style={styles.salesHistoryContainer}>
            <SalesHistory />
          </View>
          <View style={styles.purchaseHistoryContainer}>
            <PurchaseHistory />
          </View>
          <View style={styles.myFavoriteButtonContainer}>
            <MyFavoriteButton />
          </View>
          <View style={styles.myFavoriteButtonContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("OrganizationHomeScreen")}
              style={{
                backgroundColor: "yellow",
                aspectRatio: 2,
              }}
            >
              <Text>조직 테스트</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.primary,
  },
  description: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.secondary,
  },
  contentContainer: {
    flex: 12,
  },
  infoContainer: {
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  listTitleContainer: {
    marginHorizontal: 30,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.primary,
  },
  listContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  salesHistoryContainer: {
    width: "50%",
    padding: 10,
  },
  purchaseHistoryContainer: {
    width: "50%",
    padding: 10,
  },
  myFavoriteButtonContainer: {
    width: "50%",
    padding: 10,
  },
});
