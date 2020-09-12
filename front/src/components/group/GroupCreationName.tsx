import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  groupCreationNameState,
  groupNameExistState,
} from "../../states/groupState";
import theme from "../../colors";
import { Feather } from "@expo/vector-icons";

export default function GroupCreationName() {
  const [groupCreationName, setGroupCreationName] = useRecoilState(
    groupCreationNameState,
  );
  const isGroupNameExist = useRecoilValue(groupNameExistState);

  const [isFocused, setIsFocused] = useState(false);

  const getCreationNameColor = () => {
    if (!isFocused && !isGroupNameExist) {
      return "lightgrey";
    }
    if (isGroupNameExist) {
      return theme.warning;
    }
    return theme.secondary;
  };

  const dynamicStyles = StyleSheet.create({
    entranceCodeContainer: {
      flexDirection: "row",
      paddingVertical: 10,
      borderWidth: 2,
      borderRadius: 100,
      borderColor: getCreationNameColor(),
    },
    title: {
      marginLeft: 15,
      marginVertical: 5,
      color: getCreationNameColor(),
      fontSize: 14,
      fontWeight: "bold",
    },
    warningMessage: {
      marginLeft: 15,
      marginVertical: 5,
      color: theme.warning,
      fontSize: 13,
      fontWeight: "bold",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={dynamicStyles.title}>조직 이름</Text>
      <View style={dynamicStyles.entranceCodeContainer}>
        <View style={styles.iconContainer}>
          <Feather
            name="users"
            size={16}
            color={getCreationNameColor()}
            style={styles.usersIcon}
          />
        </View>
        <TextInput
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={styles.textInput}
          placeholder={"15자리 이내의 이름을 입력해주세요"}
          keyboardType={"default"}
          onChangeText={(text) => setGroupCreationName(text)}
          maxLength={15}
          value={groupCreationName}
        />
      </View>
      {isGroupNameExist ? (
        <Text style={dynamicStyles.warningMessage}>
          이미 존재하는 그룹 명입니다.
        </Text>
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  iconContainer: {
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  usersIcon: {
    marginLeft: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    marginHorizontal: 5,
  },
});
