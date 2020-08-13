/**
 * @author lxxjn0
 */

import React from "react";
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import LoginEmailForm from "./LoginEmailForm";
import LoginPasswordForm from "./LoginPasswordForm";
import LoginSubmit from "./LoginSubmit";
import {
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil/dist";
import {
  memberEmailState,
  memberLoginVerifyState,
  memberPasswordState,
} from "../../states/loginState";
import LoginVerifyModal from "../Common/Modal/LoginVerifyModal";
import { memberAPI } from "../../api/api";
import AccountManagement from "../Member/AccountManagement";

export default function Login() {
  const setLoginVerifyState = useSetRecoilState(memberLoginVerifyState);

  const memberEmail = useRecoilValue(memberEmailState);
  const memberPassword = useRecoilValue(memberPasswordState);

  const resetMemberEmail = useResetRecoilState(memberEmailState);
  const resetMemberPassword = useResetRecoilState(memberPasswordState);

  const resetMemberLoginValue = () => {
    resetMemberEmail();
    resetMemberPassword();
  };

  const login = async () => {
    try {
      const response = await memberAPI.post({
        email: memberEmail,
        password: memberPassword,
      });

      if (response.status === 200) {
        setLoginVerifyState(true);
        resetMemberLoginValue();
      }
    } catch (error) {
      setLoginVerifyState(false);
    }
  };

  return (
    <View style={styles.container}>
      <LoginVerifyModal resetMemberLoginValue={resetMemberLoginValue} />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.title}> 셀러리에 로그인하기</Text>
          <TouchableWithoutFeedback
            accessible={false}
            onPress={Keyboard.dismiss}
          >
            <View style={styles.LoginFormContainer}>
              <View style={styles.LoginIdFormContainer}>
                <LoginEmailForm />
              </View>
              <View style={styles.LoginPasswordFormContainer}>
                <LoginPasswordForm />
              </View>
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.LoginSubmitContainer}>
            <LoginSubmit login={login} />
          </View>
          <View style={styles.accountManagementContainer}>
            <AccountManagement />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  scrollView: {
    flex: 1,
    paddingTop: 40,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: 40,
  },
  title: {
    marginVertical: 10,
    fontSize: 22,
  },
  LoginFormContainer: {
    justifyContent: "center",
    marginVertical: 20,
  },
  LoginIdFormContainer: {
    justifyContent: "center",
  },
  LoginPasswordFormContainer: {
    justifyContent: "center",
  },
  LoginSubmitContainer: {
    justifyContent: "center",
  },
  accountManagementContainer: {
    justifyContent: "center",
    marginVertical: 20,
  },
});
