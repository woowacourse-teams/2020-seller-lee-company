import React, { useLayoutEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HeaderBackButton } from "@react-navigation/stack";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import { MyInfoScreenNavigationProp } from "../types/types";
import colors from "../colors";
import MyInfoAvatar from "../components/Profile/MyInfoAvatar";
import MyInfoForm from "../components/Profile/MyInfoForm";

export default function MyInfoScreen() {
  const navigation = useNavigation<MyInfoScreenNavigationProp>();

  const onPressCompleteButton = () => {
    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "내 정보 수정",
      headerLeft: () => (
        <HeaderBackButton
          labelVisible={false}
          onPress={navigation.goBack}
          backImage={() => (
            <EvilIcons name="chevron-left" size={35} color={"grey"} />
          )}
        />
      ),
      headerLeftContainerStyle: { paddingLeft: 10 },
      headerRight: () => (
        <TouchableOpacity onPress={onPressCompleteButton}>
          <AntDesign name="check" size={24} color={colors.primary} />
        </TouchableOpacity>
      ),
      headerRightContainerStyle: { paddingRight: 20 },
    });
  }, []);

  return (
    <View>
      <MyInfoAvatar />
      <MyInfoForm />
    </View>
  );
}
