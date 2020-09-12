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
import GroupEntranceCode from "../components/group/GroupEntranceCode";
import GroupEnterSubmitButton from "../components/group/GroupEnterSubmitButton";
import { useResetRecoilState } from "recoil";
import { groupEntranceCodeState } from "../states/groupState";

type GroupEnterScreenNavigationProp = StackNavigationProp<
  RootStackParam,
  "GroupEnterScreen"
>;

export default function GroupEnterScreen() {
  const navigation = useNavigation<GroupEnterScreenNavigationProp>();
  const resetGroupEntranceCode = useResetRecoilState(groupEntranceCodeState);

  const onBack = () => {
    resetGroupEntranceCode();
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
              <GroupEntranceCode />
            </View>
          </View>
          <View style={styles.groupEnterSubmitButton}>
            <GroupEnterSubmitButton />
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
