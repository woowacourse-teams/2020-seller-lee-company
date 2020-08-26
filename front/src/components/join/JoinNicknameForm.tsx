import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil/dist";
import { joinNicknameState, joinSubmitState } from "../../states/joinState";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { isBlank, isValidNickname } from "../../joinValidator";
import theme from "../../colors";

export default function JoinNicknameForm() {
  const [focusTextInputState, setFocusTextInputState] = useState(false);
  const [joinNickname, setJoinNickname] = useRecoilState(joinNicknameState);
  const joinSubmit = useRecoilValue(joinSubmitState);

  const dynamicStyles = StyleSheet.create({
    passwordFormContainer: {
      flexDirection: "row",
      paddingVertical: 10,
      borderWidth: 2,
      borderRadius: 100,
      borderColor: focusTextInputState ? theme.secondary : "lightgrey",
    },
    title: {
      marginLeft: 15,
      marginVertical: 5,
      color: focusTextInputState ? theme.secondary : "lightgrey",
      fontSize: 14,
      fontWeight: "bold",
    },
  });

  const invalidNicknameMessage = () => {
    return (
      <Text style={styles.warningMessage}>
        닉네임을 8글자 이내로 입력해주세요.
      </Text>
    );
  };

  const validPasswordMessage = () => {
    return <Text style={styles.validMessage}>사용 가능한 닉네임입니다.</Text>;
  };

  const validateMessageOnSubmit = () => {
    if (isBlank(joinNickname)) {
      return (
        <Text style={styles.warningMessage}>
          닉네임을 입력하지 않았습니다. 닉네임을 입력해주세요.
        </Text>
      );
    }
    return <></>;
  };

  const validateMessageNotSubmit = () => {
    if (isBlank(joinNickname)) {
      return <></>;
    }
    if (!isValidNickname(joinNickname)) {
      return invalidNicknameMessage();
    }
    return validPasswordMessage();
  };

  const validateIconOnSubmit = () => {
    if (isBlank(joinNickname)) {
      return (
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="alert-circle-outline"
            size={20}
            color={theme.warning}
            style={styles.validateIcon}
          />
        </View>
      );
    }
    return (
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name="check-circle-outline"
          size={20}
          color={theme.primary}
          style={styles.validateIcon}
        />
      </View>
    );
  };

  const validateIconNotSubmit = () => {
    if (isBlank(joinNickname)) {
      return <></>;
    }
    if (!isValidNickname(joinNickname)) {
      return (
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="alert-circle-outline"
            size={20}
            color={theme.warning}
            style={styles.validateIcon}
          />
        </View>
      );
    }

    return (
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name="check-circle-outline"
          size={20}
          color={theme.primary}
          style={styles.validateIcon}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={dynamicStyles.title}>닉네임</Text>
      <View style={dynamicStyles.passwordFormContainer}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="account-outline"
            size={20}
            color={focusTextInputState ? theme.secondary : "lightgrey"}
            style={styles.accountIcon}
          />
        </View>
        <TextInput
          onFocus={() => setFocusTextInputState(true)}
          onBlur={() => setFocusTextInputState(false)}
          onChangeText={setJoinNickname}
          style={styles.nicknameForm}
          placeholder={"사용할 닉네임을 입력해주세요."}
        />
        {joinSubmit ? validateIconOnSubmit() : validateIconNotSubmit()}
      </View>
      {joinSubmit ? validateMessageOnSubmit() : validateMessageNotSubmit()}
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
  accountIcon: {
    marginLeft: 10,
  },
  nicknameForm: {
    flex: 1,
    fontSize: 16,
    marginHorizontal: 15,
  },
  validateIcon: {
    marginRight: 10,
  },
  warningMessage: {
    marginLeft: 15,
    marginVertical: 5,
    color: theme.warning,
    fontSize: 13,
    fontWeight: "bold",
  },
  validMessage: {
    marginLeft: 15,
    marginVertical: 5,
    color: theme.primary,
    fontSize: 13,
    fontWeight: "bold",
  },
});
