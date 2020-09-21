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
import { HeaderBackButton, StackNavigationProp } from "@react-navigation/stack";
import { RootStackParam } from "../types/types";
import { Feather } from "@expo/vector-icons";
import OrganizationEntranceCode from "../components/organization/OrganizationEntranceCode";
import OrganizationEnterSubmitButton from "../components/organization/OrganizationEnterSubmitButton";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import {
  organizationAlreadyRegisteredState,
  organizationExistState,
  organizationState,
} from "../states/organizationState";

type OrganizationEnterScreenNavigationProp = StackNavigationProp<
  RootStackParam,
  "OrganizationEnterScreen"
>;

export default function OrganizationEnterScreen() {
  const navigation = useNavigation<OrganizationEnterScreenNavigationProp>();
  const resetOrganization = useResetRecoilState(organizationState);
  const resetOrganizationExist = useResetRecoilState(organizationExistState);
  const setOrganizationAlreadyRegistered = useSetRecoilState(
    organizationAlreadyRegisteredState,
  );

  const onBack = () => {
    resetOrganization();
    resetOrganizationExist();
    setOrganizationAlreadyRegistered(false);
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
          <View style={styles.titleAndCodeContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>조직 입장</Text>
              <Text style={styles.description}>
                입장할 조직의 코드를 입력해주세요.
              </Text>
            </View>
            <View style={styles.groupEntranceCodeContainer}>
              <OrganizationEntranceCode />
            </View>
          </View>
          <View style={styles.groupEnterSubmitButton}>
            <OrganizationEnterSubmitButton />
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
  titleAndCodeContainer: {
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
  groupEntranceCodeContainer: {
    marginTop: 40,
  },
  groupEnterSubmitButton: {
    justifyContent: "center",
    marginHorizontal: 30,
    marginBottom: 40,
  },
});
