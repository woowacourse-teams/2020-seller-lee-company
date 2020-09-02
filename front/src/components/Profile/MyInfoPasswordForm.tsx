import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";
import theme from "../../colors";
import { isBlank, isValidPassword } from "../../joinValidator";
import { Feather } from "@expo/vector-icons";
import {
  myInfoPasswordState,
  myInfoSubmitState,
} from "../../states/myInfoState";

export default function MyInfoPasswordForm() {
  const [focusTextInputState, setFocusTextInputState] = useState(false);
  const [myInfoPassword, setMyInfoPassword] = useRecoilState(
    myInfoPasswordState,
  );
  const myInfoSubmit = useRecoilValue(myInfoSubmitState);

  const passwordFormColor = () => {
    if (!focusTextInputState) {
      return "lightgrey";
    }
    if (isBlank(myInfoPassword) || !isValidPassword(myInfoPassword)) {
      return theme.warning;
    }
    return theme.secondary;
  };

  const dynamicStyles = StyleSheet.create({
    passwordFormContainer: {
      flexDirection: "row",
      paddingVertical: 10,
      borderWidth: 2,
      borderRadius: 100,
      borderColor: `${passwordFormColor()}`,
    },
    title: {
      marginLeft: 15,
      marginVertical: 5,
      color: `${passwordFormColor()}`,
      fontSize: 14,
      fontWeight: "bold",
    },
  });

  const invalidPasswordMessage = () => {
    return (
      <Text style={styles.warningMessage}>
        비밀번호를 6자리 이상 입력해주세요.
      </Text>
    );
  };

  const emptyPasswordMessage = () => {
    return (
      <Text style={styles.warningMessage}>
        비밀번호를 입력하지 않았습니다. 비밀번호를 입력해주세요.
      </Text>
    );
  };

  const validPasswordMessage = () => {
    return <Text style={styles.validMessage}>사용 가능한 비밀번호입니다.</Text>;
  };

  const validateMessageOnSubmit = () => {
    if (isBlank(myInfoPassword)) {
      return emptyPasswordMessage();
    }
    if (!isValidPassword(myInfoPassword)) {
      return invalidPasswordMessage();
    }
    return validPasswordMessage();
  };

  const validateMessageNotSubmit = () => {
    if (isBlank(myInfoPassword)) {
      return <></>;
    }
    if (!isValidPassword(myInfoPassword)) {
      return invalidPasswordMessage();
    }
    return validPasswordMessage();
  };

  const validateIconOnSubmit = () => {
    if (isBlank(myInfoPassword) || !isValidPassword(myInfoPassword)) {
      return (
        <View style={styles.iconContainer}>
          <Feather
            name="alert-circle"
            size={20}
            color={theme.warning}
            style={styles.validateIcon}
          />
        </View>
      );
    }
    return (
      <View style={styles.iconContainer}>
        <Feather
          name="check-circle"
          size={20}
          color={theme.primary}
          style={styles.validateIcon}
        />
      </View>
    );
  };

  const validateIconNotSubmit = () => {
    if (isBlank(myInfoPassword)) {
      return <></>;
    }
    if (!isValidPassword(myInfoPassword)) {
      return (
        <View style={styles.iconContainer}>
          <Feather
            name="alert-circle"
            size={20}
            color={theme.warning}
            style={styles.validateIcon}
          />
        </View>
      );
    }
    return (
      <View style={styles.iconContainer}>
        <Feather
          name="check-circle"
          size={20}
          color={theme.primary}
          style={styles.validateIcon}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={dynamicStyles.title}>비밀번호</Text>
      <View style={dynamicStyles.passwordFormContainer}>
        <View style={styles.iconContainer}>
          <Feather
            name="lock"
            size={20}
            color={passwordFormColor()}
            style={styles.lockIcon}
          />
        </View>
        <TextInput
          onFocus={() => setFocusTextInputState(true)}
          onBlur={() => setFocusTextInputState(false)}
          onChangeText={setMyInfoPassword}
          style={styles.passwordForm}
          placeholder={"6자리 이상 입력해주세요."}
          secureTextEntry={true}
        />
        {myInfoSubmit ? validateIconOnSubmit() : validateIconNotSubmit()}
      </View>
      {myInfoSubmit ? validateMessageOnSubmit() : validateMessageNotSubmit()}
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
  lockIcon: {
    marginLeft: 10,
  },
  passwordForm: {
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
