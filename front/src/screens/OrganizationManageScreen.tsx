import React, { useLayoutEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { HeaderBackButton, StackNavigationProp } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { HomeStackParam, RootStackParam } from "../types/types";
import OrganizationManageList from "../components/Profile/OrganizationManageList";
import OrganizationDeleteModal from "../components/Profile/OrganizationDeleteModal";

type OrganizationManageScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParam, "OrganizationManageScreen">,
  StackNavigationProp<RootStackParam, "HomeStack">
>;

export default function OrganizationManageScreen() {
  const navigation = useNavigation<OrganizationManageScreenNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "조직 목록",
      headerTitleAlign: "left",
      headerLeft: () => (
        <HeaderBackButton
          labelVisible={false}
          onPress={() => navigation.goBack()}
          backImage={() => (
            <Feather name="chevron-left" size={24} color="black" />
          )}
        />
      ),
      headerLeftContainerStyle: {
        alignItems: "center",
        justifyContents: "center",
        aspectRatio: 1,
      },
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <OrganizationDeleteModal />
      <OrganizationManageList />
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate("OrganizationHomeScreen")}
      >
        <Text style={styles.signOut}>조직 입장 / 생성 </Text>
        <Feather name="log-in" size={20} color="grey" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15,
  },
  iconContainer: {
    aspectRatio: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginBottom: 5,
  },
  signOut: {
    fontSize: 18,
    fontWeight: "bold",
    color: "grey",
  },
});
