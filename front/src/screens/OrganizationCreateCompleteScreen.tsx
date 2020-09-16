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
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParam } from "../types/types";
import { useNavigation } from "@react-navigation/native";
import OrganizationEnterSubmitButton from "../components/group/OrganizationEnterSubmitButton";
import { useRecoilValue } from "recoil";
import {
  organizationCreationNameState,
  organizationEntranceCodeState,
} from "../states/organizationState";
import theme from "../colors";

type OrganizationCreateCompleteScreenNavigationProp = StackNavigationProp<
  RootStackParam,
  "OrganizationCreateCompleteScreen"
>;

export default function OrganizationCreateCompleteScreen() {
  const navigation = useNavigation<
    OrganizationCreateCompleteScreenNavigationProp
  >();

  const organizationCreationName = useRecoilValue(
    organizationCreationNameState,
  );
  const organizationEntranceCode = useRecoilValue(
    organizationEntranceCodeState,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  const putBlankOnCenterEntranceCode = () => {
    return (
      organizationEntranceCode.slice(0, 3) +
      " " +
      organizationEntranceCode.slice(3, organizationEntranceCode.length)
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
        <View style={styles.contentContainer}>
          <View style={styles.titleAndNameContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>조직 생성 완료!</Text>
              <Text style={styles.description}>
                새로운 조직을 생성하셨습니다 🤩
              </Text>
            </View>
            <View style={styles.groupDetailContainer}>
              <Text style={styles.groupDetail}>생성된 조직의 이름은</Text>
              <Text style={styles.groupDetailEdge}>
                {organizationCreationName}
              </Text>
              <Text style={styles.groupDetail}>입장 코드는</Text>
              <Text style={styles.groupDetailEdge}>
                {putBlankOnCenterEntranceCode()}
              </Text>
              <Text style={styles.groupDetail}>입니다.</Text>
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
  groupDetailContainer: {
    marginTop: 40,
  },
  groupDetail: {
    fontSize: 18,
    marginVertical: 10,
  },
  groupDetailEdge: {
    fontSize: 28,
    fontWeight: "bold",
    color: theme.primary,
    marginVertical: 15,
  },
  groupEnterSubmitButton: {
    justifyContent: "center",
    marginHorizontal: 30,
    marginBottom: 40,
  },
});
