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
import GroupEnterSubmitButton from "../components/group/GroupEnterSubmitButton";
import { useRecoilValue } from "recoil";
import {
  groupCreationNameState,
  groupEntranceCodeState,
} from "../states/groupState";
import theme from "../colors";

type GroupCreateCompleteScreenNavigationProp = StackNavigationProp<
  RootStackParam,
  "GroupCreateCompleteScreen"
>;

export default function GroupCreateCompleteScreen() {
  const navigation = useNavigation<GroupCreateCompleteScreenNavigationProp>();

  const groupCreationName = useRecoilValue(groupCreationNameState);
  const groupEntranceCode = useRecoilValue(groupEntranceCodeState);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  const putBlankOnCenterEntranceCode = () => {
    return (
      groupEntranceCode.slice(0, 3) +
      " " +
      groupEntranceCode.slice(3, groupEntranceCode.length)
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
              <Text style={styles.groupDetailEdge}>{groupCreationName}</Text>
              <Text style={styles.groupDetail}>입장 코드는</Text>
              <Text style={styles.groupDetailEdge}>
                {putBlankOnCenterEntranceCode()}
              </Text>
              <Text style={styles.groupDetail}>입니다.</Text>
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
