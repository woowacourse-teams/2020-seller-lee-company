import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil/dist";
import { joinPasswordState, joinSubmitState } from "../../states/joinState";
import theme from "../../colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { isBlank, isValidPassword } from "../../joinValidator";

export default function JoinPasswordForm() {
  const [focusTextInputState, setFocusTextInputState] = useState(false);
  const [joinPassword, setJoinPassword] = useRecoilState(joinPasswordState);
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
    if (isBlank(joinPassword)) {
      return emptyPasswordMessage();
    }
    if (!isValidPassword(joinPassword)) {
      return invalidPasswordMessage();
    }
    return validPasswordMessage();
  };

  const validateMessageNotSubmit = () => {
    if (isBlank(joinPassword)) {
      return <></>;
    }
    if (!isValidPassword(joinPassword)) {
      return invalidPasswordMessage();
    }
    return validPasswordMessage();
  };

  const validateIconOnSubmit = () => {
    if (isBlank(joinPassword) || !isValidPassword(joinPassword)) {
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
    if (isBlank(joinPassword)) {
      return <></>;
    }
    if (!isValidPassword(joinPassword)) {
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
      <Text style={dynamicStyles.title}>비밀번호</Text>
      <View style={dynamicStyles.passwordFormContainer}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="lock-outline"
            size={20}
            color={focusTextInputState ? theme.secondary : "lightgrey"}
            style={styles.lockIcon}
          />
        </View>
        <TextInput
          onFocus={() => setFocusTextInputState(true)}
          onBlur={() => setFocusTextInputState(false)}
          onChangeText={setJoinPassword}
          style={styles.passwordForm}
          placeholder={"6자리 이상 입력해주세요."}
          secureTextEntry={true}
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
