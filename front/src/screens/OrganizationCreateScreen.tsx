import React, { useLayoutEffect } from "react";
import {
  Keyboard,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useResetRecoilState } from "recoil";
import {
  organizationCreationNameState,
  organizationNameExistState,
} from "../states/organizationState";
import { HeaderBackButton, StackNavigationProp } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";
import { RootStackParam } from "../types/types";
import OrganizationCreationName from "../components/organization/OrganizationCreationName";
import OrganizationCreateSubmitButton from "../components/organization/OrganizationCreateSubmitButton";

type OrganizationCreateScreenNavigationProp = StackNavigationProp<
  RootStackParam,
  "OrganizationCreateScreen"
>;

export default function OrganizationCreateScreen() {
  const navigation = useNavigation<OrganizationCreateScreenNavigationProp>();
  const resetOrganizationCreationName = useResetRecoilState(
    organizationCreationNameState,
  );
  const resetOrganizationNameExist = useResetRecoilState(
    organizationNameExistState,
  );

  const onBack = () => {
    resetOrganizationCreationName();
    resetOrganizationNameExist();
    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: "",
      headerLeft: () => (
        <HeaderBackButton
          labelVisible={false}
          onPress={onBack}
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
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
        <View style={styles.contentContainer}>
          <View style={styles.titleAndNameContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>조직 생성</Text>
              <Text style={styles.description}>
                생성할 조직의 이름을 입력해주세요.
              </Text>
            </View>
            <View style={styles.groupCreationNameContainer}>
              <OrganizationCreationName />
            </View>
          </View>
          <View style={styles.groupCreateSubmitButton}>
            <OrganizationCreateSubmitButton />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  titleAndNameContainer: {
    justifyContent: "center",
    marginHorizontal: 30,
    marginTop: 120,
  },
  titleContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
  },
  groupCreationNameContainer: {
    marginTop: 40,
  },
  groupCreateSubmitButton: {
    justifyContent: "center",
    marginHorizontal: 30,
    marginBottom: 40,
  },
});
