import React, { useEffect } from "react";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { HeaderBackButton, StackNavigationProp } from "@react-navigation/stack";
import { RootStackParam } from "../types/types";
import { useNavigation } from "@react-navigation/native";
import { useRecoilValue } from "recoil";
import { memberProfileState } from "../states/memberState";
import OrganizationEnterButton from "../components/organization/OrganizationEnterButton";
import OrganizationCreateButton from "../components/organization/OrganizationCreateButton";
import { Feather } from "@expo/vector-icons";
import { noOrganizationState } from "../states/organizationState";

type OrganizationHomeScreenNavigationProp = StackNavigationProp<
  RootStackParam,
  "OrganizationHomeScreen"
>;

export default function OrganizationHomeScreen() {
  const navigation = useNavigation<OrganizationHomeScreenNavigationProp>();
  const { nickname } = useRecoilValue(memberProfileState);
  const noOrganization = useRecoilValue(noOrganizationState);

  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerShown: !noOrganization,
      headerTitle: "",
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
  }, [navigation, noOrganization]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{nickname}님 반갑습니다 🥳</Text>
        <Text style={styles.description}>
          거래를 시작할 조직을 추가해주세요.
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.groupEnterButtonContainer}>
          <OrganizationEnterButton />
        </View>
        <View style={styles.groupCreateButtonContainer}>
          <OrganizationCreateButton />
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
    justifyContent: "space-between",
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30,
    marginTop: 120,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginHorizontal: 30,
    marginBottom: 160,
    alignItems: "center",
    justifyContent: "space-between",
  },
  groupEnterButtonContainer: {
    width: "45%",
  },
  groupCreateButtonContainer: {
    width: "45%",
  },
});
