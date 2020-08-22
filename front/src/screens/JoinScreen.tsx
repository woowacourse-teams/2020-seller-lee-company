import React, { useLayoutEffect } from "react";
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { JoinScreenNavigationProp } from "../types/types";
import { HeaderBackButton } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";
import Join from "../components/join/Join";
import { useResetRecoilState } from "recoil/dist";
import {
  joinAvatarState,
  joinNicknameState,
  joinPasswordState,
  joinSubmitState,
} from "../states/joinState";

export default function JoinScreen() {
  const navigation = useNavigation<JoinScreenNavigationProp>();

  const resetJoinNickname = useResetRecoilState(joinNicknameState);
  const resetJoinPassword = useResetRecoilState(joinPasswordState);
  const resetJoinAvatar = useResetRecoilState(joinAvatarState);
  const resetJoinSubmit = useResetRecoilState(joinSubmitState);

  const resetJoinValue = () => {
    resetJoinNickname();
    resetJoinPassword();
    resetJoinAvatar();
    resetJoinSubmit();
  };

  const onPressGoBack = () => {
    resetJoinValue();
    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: "",
      headerLeft: () => (
        <HeaderBackButton
          labelVisible={false}
          onPress={onPressGoBack}
          backImage={() => (
            <MaterialIcons name="arrow-back" size={24} color="black" />
          )}
        />
      ),
      headerLeftContainerStyle: {
        alignItems: "center",
        justifyContents: "center",
        aspectRatio: 1,
      },
    });
  });

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
        <View style={styles.contentContainer}>
          <Join resetJoinForm={resetJoinValue} />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    margin: 30,
  },
});
